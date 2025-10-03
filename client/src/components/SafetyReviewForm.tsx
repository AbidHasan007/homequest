import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Star, Shield, MapPin, AlertTriangle } from 'lucide-react';
import { useCreateSafetyReviewMutation } from '@/state/api';

interface SafetyReviewFormProps {
  locationId: number;
  locationAddress: string;
  onSubmit?: (success: boolean) => void;
}

const SafetyReviewForm: React.FC<SafetyReviewFormProps> = ({
  locationId,
  locationAddress,
  onSubmit
}) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  
  const [createSafetyReview, { isLoading: isSubmitting }] = useCreateSafetyReviewMutation();

  const handleStarClick = (starRating: number) => {
    setRating(starRating);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (rating === 0) {
      setError('Please provide a safety rating');
      return;
    }

    try {
      await createSafetyReview({
        locationId,
        rating,
        comment: comment.trim() || undefined
      }).unwrap();

      setSuccess(true);
      setRating(0);
      setComment('');
      onSubmit?.(true);
      
      // Auto-hide success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000);

    } catch (err: any) {
      setError(err.message || 'An error occurred while submitting your feedback');
      onSubmit?.(false);
    }
  };

  if (success) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardContent className="pt-6">
          <div className="flex items-center justify-center space-x-2 text-green-600">
            <Shield className="w-6 h-6" />
            <span className="text-lg font-medium">Safety Feedback Submitted!</span>
          </div>
          <p className="text-center text-gray-600 mt-2">
            Thank you for helping make our community safer.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Shield className="w-6 h-6 text-blue-600" />
          <span>Provide Safety Feedback</span>
        </CardTitle>
        <div className="flex items-center space-x-2 text-gray-600">
          <MapPin className="w-4 h-4" />
          <span className="text-sm">{locationAddress}</span>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Safety Rating */}
          <div className="space-y-2">
            <Label className="text-base font-medium">
              How safe do you feel in this area? *
            </Label>
            <div className="flex items-center space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => handleStarClick(star)}
                  className={`p-1 rounded transition-colors ${
                    star <= rating 
                      ? 'text-yellow-400 hover:text-yellow-500' 
                      : 'text-gray-300 hover:text-gray-400'
                  }`}
                >
                  <Star 
                    className="w-8 h-8" 
                    fill={star <= rating ? 'currentColor' : 'none'}
                  />
                </button>
              ))}
              <span className="ml-2 text-sm text-gray-600">
                {rating === 0 && 'Click to rate'}
                {rating === 1 && 'Very Unsafe'}
                {rating === 2 && 'Unsafe'}
                {rating === 3 && 'Neutral'}
                {rating === 4 && 'Safe'}
                {rating === 5 && 'Very Safe'}
              </span>
            </div>
          </div>

          {/* Safety Comments */}
          <div className="space-y-2">
            <Label htmlFor="comment" className="text-base font-medium">
              Share your safety experience (optional)
            </Label>
            <Textarea
              id="comment"
              placeholder="Describe your safety experience in this area... (e.g., well-lit streets, security presence, incidents, etc.)"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={4}
              maxLength={500}
            />
            <p className="text-xs text-gray-500">
              {comment.length}/500 characters
            </p>
          </div>

          {/* Important Notice */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start space-x-2">
              <AlertTriangle className="w-5 h-5 text-blue-600 mt-0.5" />
              <div className="text-sm text-blue-800">
                <p className="font-medium mb-1">Important:</p>
                <ul className="space-y-1 text-xs">
                  <li>• Only tenants who have lived in this area can provide safety feedback</li>
                  <li>• Your feedback helps other renters make informed decisions</li>
                  <li>• You can only submit one safety review per location</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          {/* Submit Button */}
          <Button 
            type="submit" 
            className="w-full"
            disabled={isSubmitting || rating === 0}
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Submitting...
              </>
            ) : (
              <>
                <Shield className="w-4 h-4 mr-2" />
                Submit Safety Feedback
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default SafetyReviewForm;