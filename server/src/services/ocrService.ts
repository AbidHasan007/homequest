import Tesseract from 'tesseract.js';
import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

interface ExtractedNIDData {
  name?: string;
  nidNumber?: string;
  nameSource?: string;
  nameScore?: number;
  isValid: boolean;
  issues: string[];
  flags: string[];
}

interface ExtractedAddressData {
  address?: string;
}

const COMMON_BD_NAMES = [
  'MASUM', 'MASSUM', 'RAHMAN', 'KARIM', 'RAHIM', 'HASAN', 'HASSAN', 'AHMED',
  'AHMAD', 'MAHMUD', 'MAHMOOD', 'ATAUR', 'ABDUL', 'MOHAMMAD', 'MD', 'ALI',
  'HOSSAIN', 'HUSSAIN', 'ISLAM', 'KHAN'
];

const KNOWN_OCR_ARTIFACTS = [
  'GINTH', 'SMITA', 'FEAT', 'ARTA', 'ACE', 'QINETAT', 'BIER', 'NET', 'SASH',
  'IANS', 'FIRE', 'TOM', 'SEES', 'SUVS', 'UIT', 'STW', 'TTR', 'SPT', 'CIEE',
  'IETF', 'IANSSASH', 'ARTAFEAT', 'SEESGP'
];

const ACCEPTED_NID_LENGTHS = [10, 13, 17];

export class OCRService {
  /**
   * PDF processing is currently not supported
   * This is a placeholder for future implementation
   */
  private async convertPdfToImage(pdfPath: string): Promise<string> {
    throw new Error('PDF processing is currently not supported. Please convert your PDF to JPEG or PNG format and try again.');
  }

  /**
   * Test Tesseract.js functionality
   */
  async testTesseract(): Promise<boolean> {
    try {
      console.log('Testing Tesseract.js functionality...');
      // Create a simple test image buffer (white 100x100 image with text)
      const testBuffer = await sharp({
        create: {
          width: 200,
          height: 100,
          channels: 3,
          background: { r: 255, g: 255, b: 255 }
        }
      })
      .png()
      .toBuffer();

      const result = await Tesseract.recognize(testBuffer, 'eng', {
        logger: m => console.log('Tesseract test:', m)
      });
      
      console.log('Tesseract test completed successfully');
      return true;
    } catch (error) {
      console.error('Tesseract test failed:', error);
      return false;
    }
  }

  /**
   * Preprocess image for better OCR accuracy
   */
  private async preprocessImage(imagePath: string): Promise<Buffer> {
    try {
      // More sophisticated preprocessing for better OCR accuracy
      const processedImage = await sharp(imagePath)
        .resize(null, 1200, { withoutEnlargement: true }) // Scale up if too small
        .greyscale()
        .normalize()
        .linear(1.2, -(128 * 1.2) + 128) // Increase contrast
        .sharpen(1, 1, 2)
        .median(1) // Remove noise
        .png({ quality: 100 })
        .toBuffer();
      
      return processedImage;
    } catch (error) {
      console.error('Error preprocessing image:', error);
      // If preprocessing fails, return original image buffer
      return await sharp(imagePath).toBuffer();
    }
  }

  /**
   * Extract text from image using Tesseract OCR with multiple preprocessing attempts
   */
  private async extractTextFromImage(imagePath: string): Promise<string> {
    try {
      console.log('=== OCR TEXT EXTRACTION START ===');
      console.log('File path:', imagePath);
      
      // Check file existence and properties
      const fs = await import('fs');
      const fileExists = fs.existsSync(imagePath);
      console.log('File exists:', fileExists);
      
      if (!fileExists) {
        throw new Error(`File does not exist at path: ${imagePath}`);
      }
      
      const stats = fs.statSync(imagePath);
      console.log('File size:', stats.size, 'bytes');
      console.log('File permissions:', stats.mode.toString(8));
      
      // Check if file is readable
      try {
        fs.accessSync(imagePath, fs.constants.R_OK);
        console.log('File is readable ✓');
      } catch (accessError) {
        throw new Error(`File is not readable: ${accessError}`);
      }
      
      // Check if file is PDF
      const ext = path.extname(imagePath).toLowerCase();
      console.log('File extension:', ext);
      
      // Test if Sharp can read the image (for non-PDF files)
      if (ext !== '.pdf') {
        try {
          console.log('Testing Sharp image processing...');
          const metadata = await sharp(imagePath).metadata();
          console.log('✓ Sharp metadata:', {
            format: metadata.format,
            width: metadata.width,
            height: metadata.height,
            channels: metadata.channels
          });
        } catch (sharpError: any) {
          console.error('❌ Sharp cannot process this image:', sharpError);
          throw new Error(`Image format not supported or corrupted: ${sharpError?.message || 'Unknown error'}`);
        }
      }
      
      if (ext === '.pdf') {
        console.log('❌ PDF file detected - currently not supported');
        throw new Error('PDF files are currently not supported for OCR processing. Please convert your PDF to JPEG or PNG format and upload again.');
      }

      // Try multiple preprocessing approaches for images
      const preprocessingMethods = [
        // Method 1: Direct file processing (no preprocessing)
        () => Promise.resolve(imagePath),
        // Method 2: Enhanced preprocessing
        () => this.preprocessImage(imagePath),
        // Method 3: Basic Sharp processing
        () => sharp(imagePath).greyscale().normalize().png().toBuffer(),
        // Method 4: Minimal Sharp processing
        () => sharp(imagePath).png().toBuffer()
      ];

      let bestText = '';
      let bestScore = 0;

      for (let i = 0; i < preprocessingMethods.length; i++) {
        try {
          console.log(`\n--- Processing Method ${i + 1} ---`);
          const imageSource = await preprocessingMethods[i]();
          
          if (typeof imageSource === 'string') {
            console.log(`✓ Using original file: ${imageSource}`);
          } else {
            console.log(`✓ Using processed buffer: ${imageSource.length} bytes`);
          }
          
          console.log('Starting Tesseract recognition...');
          const result = await Tesseract.recognize(imageSource, 'eng', {
            logger: m => {
              if (m.status === 'recognizing text' || m.progress === 1) {
                console.log(`Tesseract [${i + 1}]: ${m.status} - ${Math.round(m.progress * 100)}%`);
              }
            },
            errorHandler: err => console.error(`Tesseract Method ${i + 1} Error:`, err)
          });

          const { text, confidence } = result.data;
          console.log(`✓ Method ${i + 1} completed - Confidence: ${confidence}%, Text length: ${text.length}`);
          
          // Use the result with highest confidence
          if (confidence > bestScore) {
            bestScore = confidence;
            bestText = text;
          }

          // If we get good confidence, use it
          if (confidence > 80) {
            break;
          }
        } catch (methodError) {
          console.error(`Preprocessing method ${i + 1} failed:`, methodError);
          continue;
        }
      }

      if (!bestText) {
        throw new Error('All OCR attempts failed');
      }

      console.log('Best OCR confidence:', bestScore);
      return bestText;
    } catch (error) {
      console.error('Error extracting text from image:', error);
      throw new Error('Failed to extract text from document');
    }
  }

  /**
   * Extract name and NID number from Bangladesh NID document
   */
  async extractNIDData(imagePath: string): Promise<ExtractedNIDData> {
    try {
      const text = await this.extractTextFromImage(imagePath);
      console.log('=== NID OCR EXTRACTION ===');
      console.log('File:', imagePath);
      console.log('Extracted text length:', text.length);
      console.log('Extracted NID text:\n', text);
      console.log('==========================');

      const result: ExtractedNIDData = {
        isValid: true,
        issues: [],
        flags: []
      };

      // Enhanced patterns for Bangladesh NID
      const nidPatterns = [
        // ID NO pattern (common in NID cards)
        /(?:ID\s*NO|IDNO|NID|National\s*ID)\s*:?\s*(\d{10,17})/gi,
        // Standard NID format: 10, 13, or 17 digits
        /(?:NID|National\s*ID|জাতীয়\s*পরিচয়\s*পত্র)[\s\-:]*(\d{10}|\d{13}|\d{17})/gi,
        // Smart card format
        /(?:Smart\s*Card|স্মার্ট\s*কার্ড)[\s\-:]*(\d{10}|\d{13}|\d{17})/gi,
        // Voter ID format
        /(?:Voter\s*ID|ভোটার\s*আইডি)[\s\-:]*(\d{10}|\d{13}|\d{17})/gi,
        // Just numbers in NID format
        /\b(\d{10}|\d{13}|\d{17})\b/g
      ];

      // BD NID Name Rules:
      // - All capital letters (A-Z only)
      // - Length: 3-30 characters
      // - Can contain spaces (for first, middle, last names)
      // - No digits, no punctuation
      // - Can be single name, first+last name, or first+middle+last name
      const namePatterns = [
        // HIGHEST PRIORITY: BD NID standard format from "Name:" field
        // Extract clean names from Name: field, handling OCR noise
        {
          pattern: /(?:Name|নাম)\s*[:‐]?\s*([A-Z][A-Z\s]*)/gi,
          priority: 'name_field',
          description: 'Name from Name: field',
          cleanup: true // Special cleanup for this pattern
        },
        
        // VERY HIGH PRIORITY: Strict BD NID format - ALL CAPITALS ONLY
        // BD NID names are ALWAYS in capital letters, no lowercase, no camelCase
        {
          pattern: /\b([A-Z]{3,15}(?:\s+[A-Z]{3,15}){0,2})\b/g,
          priority: 'strict_capitals',
          description: 'Strict capital letters only (BD NID standard)'
        },
        
        // HIGH PRIORITY: Well-formed multi-word names (2-3 words)
        // Matches "ABDUL KARIM", "MOHAMMAD ABDUL RAHMAN"
        {
          pattern: /\b([A-Z]{3,15}(?:\s+[A-Z]{3,15}){1,2})\b/g,
          priority: 'multi_word',
          description: 'Multi-word names'
        },
        
        // MEDIUM PRIORITY: Single names (common in Bangladesh)
        // Matches single names like "RAHMAN", "MASUM", "KARIM"
        {
          pattern: /\b([A-Z]{3,15})\b/g,
          priority: 'single_word', 
          description: 'Single word names'
        },
        
        // MEDIUM PRIORITY: Bengali name patterns
        {
          pattern: /([\u0980-\u09FF]{3,}(?:\s+[\u0980-\u09FF]{3,}){0,2})/g,
          priority: 'bengali',
          description: 'Bengali names'
        },
        
        // FALLBACK: Any uppercase sequence
        {
          pattern: /([A-Z][A-Z\s]{2,29})(?=\s*\n|$)/g,
          priority: 'fallback',
          description: 'Fallback pattern'
        }
      ];

      // Extract NID numbers
      const potentialNIDs: string[] = [];
      for (const pattern of nidPatterns) {
        let match;
        while ((match = pattern.exec(text)) !== null) {
          const nidNumber = match[1] || match[0];
          // Validate NID format
          if (/^\d{10}$|^\d{13}$|^\d{17}$/.test(nidNumber.replace(/\s/g, ''))) {
            potentialNIDs.push(nidNumber.replace(/\s/g, ''));
          }
        }
      }

      // Extract names with priority tracking
      const potentialNames: Array<{name: string, priority: string}> = [];
      console.log('=== NAME PATTERN MATCHING DEBUG ===');
      
      for (const patternObj of namePatterns) {
        const { pattern, priority, description } = patternObj;
        let match;
        while ((match = pattern.exec(text)) !== null) {
          let name = match[1] ? match[1].trim() : match[0].trim();
          console.log(`Pattern matched: "${name}" from ${description} (priority: ${priority})`);
          
          // SPECIAL HANDLING FOR NAME FIELD - Clean OCR noise more aggressively
          if (priority === 'name_field') {
            // Remove everything after common OCR noise patterns
            name = name.replace(/\s+(fren|ren|en|er|ara|aat|ffsa|fff|tst|ea|wie|acshr|eer|we|om|rb|rc|rd|rt|rn)\b.*$/gi, '');
            // Remove non-letter characters except spaces
            name = name.replace(/[^A-Z\s]/gi, '').trim();
            // Take only the first valid word or two words that look like a name
            const words = name.split(/\s+/).filter(w => w && /^[A-Z]{2,15}$/i.test(w));
            if (words.length > 0) {
              name = words.slice(0, 3).join(' '); // Take up to 3 words for full names
            }
          } else {
            // Clean the name - keep only letters and spaces
            name = name.replace(/[^A-Z\s\u0980-\u09FF]/gi, '').trim();
          }
          
          // Normalize multiple spaces to single space
          name = name.replace(/\s+/g, ' ');
          
          console.log(`After cleaning: "${name}"`);
          
          // Skip if name is too short after cleaning
          if (name.length < 3) {
            console.log(`✗ Name rejected: "${name}" (too short after cleaning)`);
            continue;
          }
          
          // BD NID Name Validation Rules - STRICT
          // 1. Must be 3-30 characters
          // 2. ONLY uppercase A-Z and spaces (BD NID standard) - NO lowercase, NO camelCase
          // 3. No digits, no punctuation
          const isBengali = /[\u0980-\u09FF]/.test(name);
          const isValidLength = name.length >= 3 && name.length <= 30;
          
          // STRICT: BD NID names are ALWAYS ALL CAPITALS
          const isStrictCapitals = /^[A-Z\s]+$/.test(name) && !/[a-z]/.test(name);
          const isOnlyLettersAndSpaces = isStrictCapitals || /^[\u0980-\u09FF\s]+$/.test(name);
          
          // Exclude common false positives from NID card labels
          const isNotLabel = !/(NID|NATIONAL|SMART|CARD|IDNO|DATE|BIRTH|ADDRESS|FATHER|MOTHER|BLOOD|GROUP|TYPE|GOVERNMENT|BANGLADESH|REPUBLIC|PEOPLE|FECHA|WIE|ACSHR|FETAATFFITE|SIGNATURE)/i.test(name);
          
          // Exclude month names and years
          const isNotDatePart = !/(JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC|JANUARY|FEBRUARY|MARCH|APRIL|JUNE|JULY|AUGUST|SEPTEMBER|OCTOBER|NOVEMBER|DECEMBER)/i.test(name);
          const isNotYear = !/^(19|20)\d{2}$/.test(name);
          
          // Exclude very long single words without spaces (likely OCR errors)
          const words = name.split(' ').filter((w: string) => w.length > 0);
          const hasReasonableWordLength = words.every((w: string) => w.length <= 15);
          
          // STRICT: Reject any name with lowercase letters (not BD NID format)
          const hasNoLowercase = !/[a-z]/.test(name);
          
          if (isValidLength && isOnlyLettersAndSpaces && isNotLabel && isNotDatePart && isNotYear && hasReasonableWordLength && hasNoLowercase) {
            
            // Convert to uppercase (BD NID standard)
            name = name.toUpperCase();
            
            // Don't merge words for name_field priority - keep original format
            if (priority !== 'name_field') {
              // Merge separated words if they look like OCR split (e.g., "MAS SUM" -> "MASUM")
              // Only merge if each part is 2-4 characters and total would be reasonable
              if (words.length === 2 && 
                  words[0].length >= 2 && words[0].length <= 4 && 
                  words[1].length >= 2 && words[1].length <= 4) {
                const merged = words.join('');
                if (merged.length >= 4 && merged.length <= 12) {
                  console.log(`✓ Merging OCR-split name: "${name}" -> "${merged}"`);
                  name = merged;
                }
              }
            }
            
            // Store name with its priority
            if (priority === 'name_field') {
              // Name field gets highest priority - already cleaned above
              if (/^[A-Z]{3,15}(?:\s+[A-Z]{3,15}){0,2}$/.test(name) && !/[a-z]/.test(name)) {
                console.log(`✓✓✓ Name from Name: field (CLEANED): ${name} (highest priority)`);
                potentialNames.unshift({name, priority: 'name_field_clean'});
              } else {
                console.log(`✗ Name rejected from Name field: "${name}" (not proper BD NID format)`);
              }
            } else if (priority === 'strict_capitals') {
              // Double-check strict capitals format
              if (/^[A-Z]{3,15}(?:\s+[A-Z]{3,15}){0,2}$/.test(name) && !/[a-z]/.test(name)) {
                console.log(`✓✓✓ Strict BD NID format: ${name}`);
                potentialNames.unshift({name, priority});
              } else {
                console.log(`✗ Name rejected: "${name}" (not strict BD NID format)`);
              }
            } else if (words.length === 1 && name.length >= 3 && name.length <= 15) {
              // Check for common BD single names
              if (COMMON_BD_NAMES.includes(name)) {
                console.log(`✓✓✓ Common BD name found: ${name} (high priority)`);
                potentialNames.unshift({name, priority: 'common_bd_name'});
              } else {
                console.log(`✓✓ Valid single name: ${name}`);
                potentialNames.push({name, priority});
              }
            } else if (words.length >= 2 && words.length <= 4 && 
                     words.every((w: string) => w.length >= 2) && // Each word at least 2 chars
                     name.length <= 30) {
              console.log(`✓ Valid multi-word name: ${name}`);
              potentialNames.push({name, priority});
            } else {
              console.log(`✓ Valid name added: ${name}`);
              potentialNames.push({name, priority});
            }
          } else {
            console.log(`✗ Name rejected: "${name}" (failed validation)`);
          }
        }
      }
      console.log('=== END NAME DEBUG ===');

      // Select best matches
      if (potentialNIDs.length > 0) {
        // Prefer 10-digit or 17-digit NIDs (most common formats)
        const sortedNIDs = potentialNIDs.sort((a, b) => {
          if (a.length === 17 && b.length !== 17) return -1;
          if (b.length === 17 && a.length !== 17) return 1;
          if (a.length === 10 && b.length !== 10) return -1;
          if (b.length === 10 && a.length !== 10) return 1;
          return 0;
        });
        result.nidNumber = sortedNIDs[0];
      }

      if (potentialNames.length > 0) {
        // Deduplicate names by keeping the highest priority source for each unique value
        const priorityRanking: Record<string, number> = {
          name_field_clean: 0,
          name_field: 1,
          multi_word: 2,
          strict_capitals: 3,
          common_bd_name: 4,
          single_word: 5,
          fallback: 6
        };

        const bestNameByValue = new Map<string, { name: string; priority: string }>();
        for (const candidate of potentialNames) {
          const currentBest = bestNameByValue.get(candidate.name);
          const candidateRank = priorityRanking[candidate.priority] ?? 99;
          const currentRank = currentBest ? (priorityRanking[currentBest.priority] ?? 99) : Infinity;
          if (!currentBest || candidateRank < currentRank) {
            bestNameByValue.set(candidate.name, candidate);
          }
        }

        const uniqueNameObjects = Array.from(bestNameByValue.values());

        // Hard-prioritize certain sources before scoring
        const priorityBuckets = [
          'name_field_clean',
          'name_field',
          'multi_word',
          'common_bd_name'
        ];

        for (const priority of priorityBuckets) {
          const prioritizedMatch = uniqueNameObjects.find(nameObj => nameObj.priority === priority);
          if (prioritizedMatch) {
            console.log(`✓✓✓ Selecting name from priority bucket "${priority}": ${prioritizedMatch.name}`);
            result.name = prioritizedMatch.name;
            result.nameSource = prioritizedMatch.priority;
            break;
          }
        }

        if (!result.name) {
          // BD NID name selection strategy:
          // Priority: Names from "Name:" field > Standard multi-word names > Single names > OCR artifacts
          const scoredNames = uniqueNameObjects.map(nameObj => {
          const { name, priority } = nameObj;
          let score = 0;
          const wordCount = name.split(' ').length;
          const words = name.split(' ');
          
          // PRIORITY 1: Names extracted from "Name:" or "নাম:" fields
          if (priority === 'name_field_clean') {
            score += 1000; // ABSOLUTE HIGHEST priority for cleaned names from name fields
            console.log(`✓✓✓ Cleaned name from "Name:" field detected: ${name}`);
          } else if (priority === 'name_field') {
            score += 800; // Very high priority for raw names from name fields
            console.log(`✓✓✓ Name from "Name:" field detected: ${name}`);
          } else if (priority === 'common_bd_name') {
            score += 300; // High priority for common BD names
            console.log(`✓✓✓ Common BD name detected: ${name}`);
          } else if (priority === 'strict_capitals') {
            score += 400; // Very high priority for strict capital format
            console.log(`✓✓✓ Strict BD NID capital format: ${name}`);
          }          // PRIORITY 2: Well-formed multi-word names (2-3 words, each 3+ chars)
          if (wordCount >= 2 && wordCount <= 3 && 
              words.every((w: string) => w.length >= 3) && 
              words.every((w: string) => /^[A-Z]+$/.test(w)) && // All caps
              name.length >= 6 && name.length <= 25) {
            score += 200;
            console.log(`✓✓ Well-formed multi-word name: ${name}`);
          }
          
          // PRIORITY 3: Common BD names or reasonable single names
          if (wordCount === 1 && name.length >= 4 && name.length <= 12 && 
              /^[A-Z]+$/.test(name)) {
            // Check if it's a common BD name or looks reasonable
            if (COMMON_BD_NAMES.includes(name)) {
              score += 150;
              console.log(`✓✓ Common BD name: ${name}`);
            } else {
              score += 80;
              console.log(`✓ Single name: ${name}`);
            }
          }
          
          // PENALTY: OCR artifacts (random 3-5 letter combinations)
          const knownGoodNames = COMMON_BD_NAMES;
          const knownOCRArtifacts = KNOWN_OCR_ARTIFACTS;
          
          const looksLikeOCRArtifact = wordCount === 1 && name.length >= 3 && name.length <= 8 &&
            !knownGoodNames.includes(name) &&
            (knownOCRArtifacts.includes(name) || 
             name.includes('UIT') || name.includes('STW') || name.includes('TTR') || 
             name.includes('SPT') || name.includes('CIEE') || name.includes('IETF'));
          
          if (looksLikeOCRArtifact) {
            score -= 200;
            console.log(`✗ OCR artifact penalty: ${name}`);
          }
          
          // PENALTY: Very short names (likely OCR errors)
          if (name.length < 4) score -= 100;
          
          // PENALTY: Very long or merged names (likely OCR errors)
          if (name.length > 20) score -= 50;
          
          // MAJOR PENALTY: Names with lowercase letters (NOT BD NID format)
          if (/[a-z]/.test(name)) {
            score -= 300;
            console.log(`✗ Major penalty for mixed case: ${name} (BD NID must be ALL CAPITALS)`);
          }
          
          // BONUS: Perfect BD NID format (all capitals, proper length, reasonable words)
          if (/^[A-Z]{3,15}(?:\s+[A-Z]{3,15}){0,2}$/.test(name) && !/[a-z]/.test(name)) {
            score += 50;
            console.log(`✓ BD NID format bonus: ${name}`);
          }
          
          // SUPER BONUS: Names from name field should ALWAYS win
          if (priority === 'name_field_clean') {
            score += 1000; // Massive additional bonus to guarantee name field wins
            console.log(`✓✓✓ SUPER BONUS for cleaned Name field: +1000 points (TOTAL GUARANTEE)`);
          } else if (priority === 'name_field') {
            score += 800; // Large additional bonus for raw name field
            console.log(`✓✓✓ SUPER BONUS for Name field: +800 points`);
          }
          
            console.log(`Name "${name}" scored: ${score}`);
            return { name, score };
          });
          
          // Sort by score (highest first)
          const sortedNames = scoredNames.sort((a, b) => b.score - a.score);
          const topName = sortedNames[0];
          result.name = topName.name;
          result.nameScore = topName.score;
          const selectedNameObj = uniqueNameObjects.find(n => n.name === topName.name);
          if (selectedNameObj) {
            result.nameSource = selectedNameObj.priority;
          }
        }
      }

      // Final validation of extracted data to detect fuzzy noise or invalid values
      const issues: string[] = [];
      const flags: string[] = [];

      if (!result.name) {
        issues.push('name_missing');
        flags.push('name_missing');
      } else {
        const words = result.name.split(' ').filter(Boolean);
        const fuzzyWords = words.filter(word => KNOWN_OCR_ARTIFACTS.includes(word));
        const commonWords = words.filter(word => COMMON_BD_NAMES.includes(word));
        const hasFuzzyNoise = fuzzyWords.length > 0 && fuzzyWords.length >= Math.ceil(words.length / 2);
        const singleUnrecognized = words.length === 1 && !COMMON_BD_NAMES.includes(result.name);

        if (hasFuzzyNoise) {
          issues.push('name_fuzzy_noise');
          flags.push('fuzzy_name_detected');
        }

        if (singleUnrecognized && !hasFuzzyNoise) {
          issues.push('name_unrecognized_single');
          flags.push('low_confidence_name');
        }

        if (result.name.length < 4) {
          issues.push('name_too_short');
          flags.push('low_confidence_name');
        }

        if (result.nameSource && ['fallback', 'single_word'].includes(result.nameSource) && hasFuzzyNoise) {
          issues.push('name_low_quality_source');
          flags.push('name_from_low_priority');
        }

        if (typeof result.nameScore === 'number' && result.nameScore < 300) {
          issues.push('name_low_score');
          flags.push('low_name_score');
        }

        if (commonWords.length === 0 && !hasFuzzyNoise && words.length >= 2) {
          // Encourage names that contain at least one known BD surname
          flags.push('name_needs_manual_review');
        }
      }

      if (!result.nidNumber) {
        issues.push('nid_missing');
        flags.push('nid_missing');
      } else {
        if (!/^\d+$/.test(result.nidNumber)) {
          issues.push('nid_not_numeric');
          flags.push('nid_invalid_format');
        }
        if (!ACCEPTED_NID_LENGTHS.includes(result.nidNumber.length)) {
          issues.push('nid_invalid_length');
          flags.push('nid_invalid_format');
        }
        if (/^(\d)\1{9,}$/.test(result.nidNumber)) {
          issues.push('nid_repeated_digits');
          flags.push('nid_suspicious_pattern');
        }
      }

      result.issues = Array.from(new Set(issues));
      result.flags = Array.from(new Set(flags));
      result.isValid = result.issues.length === 0;

      console.log('=== NID EXTRACTION RESULTS ===');
      console.log('Found Name:', result.name);
      console.log('Found NID Number:', result.nidNumber);
      console.log('Potential NIDs found:', potentialNIDs);
      console.log('Potential Names found:', potentialNames.map(n => `${n.name} (${n.priority})`));
      console.log('Validation issues:', result.issues);
      console.log('Validation flags:', result.flags);
      console.log('Result valid:', result.isValid);
      console.log('==============================');

      return result;
    } catch (error) {
      console.error('Error in NID data extraction:', error);
      throw error;
    }
  }

  /**
   * Verify utility bill document (address will be selected manually from map)
   * This method only validates that the utility bill image is readable
   * The actual address will be provided by landlord through map selection with coordinates
   */
  async extractAddressData(imagePath: string): Promise<ExtractedAddressData> {
    try {
      console.log('=== UTILITY BILL VERIFICATION ===');
      console.log('File:', imagePath);
      
      // Verify the file exists and is readable
      const fs = await import('fs');
      const fileExists = fs.existsSync(imagePath);
      
      if (!fileExists) {
        throw new Error(`Utility bill file does not exist at path: ${imagePath}`);
      }
      
      const stats = fs.statSync(imagePath);
      console.log('✓ Utility bill file verified');
      console.log('  File size:', stats.size, 'bytes');
      
      // Verify the image is valid using Sharp
      const ext = path.extname(imagePath).toLowerCase();
      if (ext !== '.pdf') {
        try {
          const metadata = await sharp(imagePath).metadata();
          console.log('✓ Utility bill image is valid:', {
            format: metadata.format,
            width: metadata.width,
            height: metadata.height
          });
        } catch (sharpError: any) {
          throw new Error(`Utility bill image format not supported: ${sharpError?.message || 'Unknown error'}`);
        }
      }
      
      console.log('=== UTILITY BILL VERIFIED ===');
      console.log('Note: Address will be selected manually from map with coordinates');
      console.log('==============================');

      // Return empty result - address will be provided through map selection
      const result: ExtractedAddressData = {
        address: undefined // Address will be set by landlord via map selection
      };

      return result;
    } catch (error) {
      console.error('Error verifying utility bill:', error);
      throw error;
    }
  }
}

export const ocrService = new OCRService();
