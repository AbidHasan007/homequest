import Tesseract from 'tesseract.js';

async function testOCR() {
  try {
    console.log('Testing Tesseract.js...');
    
    // Test with a simple recognition
    const { data: { text } } = await Tesseract.recognize(
      'https://tesseract.projectnaptha.com/img/eng_bw.png',
      'eng',
      {
        logger: m => console.log(m)
      }
    );
    
    console.log('OCR Result:', text);
    console.log('Tesseract test successful!');
    
  } catch (error) {
    console.error('Tesseract test failed:', error);
  }
}

testOCR();