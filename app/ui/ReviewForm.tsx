'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import StarRating from './StarRating';
import { submitReview } from '@/app/actions';

interface ReviewFormProps {
  productId: string;
  existingRating?: number;
  existingText?: string;
}

export default function ReviewForm({
  productId,
  existingRating = 0,
  existingText = '',
}: ReviewFormProps) {
  const [rating, setRating] = useState(existingRating);
  const [reviewText, setReviewText] = useState(existingText);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const isEditing = existingRating > 0;
  const charCount = reviewText.length;
  const minChars = 5;
  const maxChars = 2000;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (rating === 0) {
      setError('Please select a star rating');
      return;
    }
    if (reviewText.trim().length < minChars) {
      setError(`Review must be at least ${minChars} characters`);
      return;
    }

    setSubmitting(true);
    const result = await submitReview(productId, rating, reviewText);
    setSubmitting(false);

    if (result.error) {
      setError(result.error);
    } else {
      setSuccess(true);
      router.refresh();
      if (!isEditing) {
        setTimeout(() => {
          setRating(0);
          setReviewText('');
          setSuccess(false);
        }, 2000);
      }
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-stone-900/40 p-6 rounded-xl border border-stone-800 space-y-4"
      aria-labelledby="review-form-heading"
      noValidate
    >
      <h3
        id="review-form-heading"
        className="text-lg font-semibold text-stone-100"
      >
        {isEditing ? 'Edit Your Review' : 'Write a Review'}
      </h3>

      <div>
        <label className="block text-sm text-stone-300 mb-2">
          Your Rating{' '}
          <span className="text-rose-400" aria-label="required">
            *
          </span>
        </label>
        <StarRating
          rating={rating}
          onChange={setRating}
          size="lg"
          label="Select your rating"
        />
      </div>

      <div>
        <label
          htmlFor="reviewText"
          className="block text-sm text-stone-300 mb-2"
        >
          Your Review{' '}
          <span className="text-rose-400" aria-label="required">
            *
          </span>
          <span className="text-xs text-stone-500 ml-2">
            (minimum {minChars} characters)
          </span>
        </label>
        <textarea
          id="reviewText"
          name="reviewText"
          rows={4}
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          maxLength={maxChars}
          required
          minLength={minChars}
          aria-required="true"
          aria-invalid={!!error}
          aria-describedby="char-count review-error"
          placeholder="Share your thoughts on this product..."
          className="w-full p-3 rounded-md bg-stone-800 text-stone-100 border border-stone-700 focus:outline-2 focus:outline-amber-500 focus:border-amber-500"
        />
        <div
          id="char-count"
          className={`text-xs mt-1 ${
            charCount < minChars ? 'text-stone-500' : 'text-stone-400'
          }`}
          aria-live="polite"
        >
          {charCount}/{maxChars} characters
        </div>
      </div>

      {error && (
        <p
          id="review-error"
          role="alert"
          className="text-rose-400 text-sm bg-rose-900/20 p-3 rounded border border-rose-800"
        >
          {error}
        </p>
      )}

      {success && (
        <p
          role="status"
          className="text-emerald-400 text-sm bg-emerald-900/20 p-3 rounded border border-emerald-800"
        >
          ✓ Review submitted successfully!
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="px-6 py-2.5 bg-amber-600 hover:bg-amber-500 text-stone-950 rounded-xl font-bold uppercase text-xs tracking-wide disabled:opacity-50 disabled:cursor-not-allowed transition focus:outline-2 focus:outline-amber-300 focus:outline-offset-2"
      >
        {submitting
          ? 'Submitting...'
          : isEditing
            ? 'Update Review'
            : 'Submit Review'}
      </button>
    </form>
  );
}