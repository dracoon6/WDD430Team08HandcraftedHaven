'use client';

import { useRouter } from 'next/navigation';
import StarRating from './StarRating';
import { deleteReviewAction } from '@/app/actions';
import type { Review, RatingSummary } from '@/app/lib/reviews';

interface ReviewListProps {
  reviews: Review[];
  summary: RatingSummary;
  currentUserId?: string;
}

export default function ReviewList({
  reviews,
  summary,
  currentUserId,
}: ReviewListProps) {
  const router = useRouter();

  async function handleDelete(reviewId: string, productId: string) {
    if (!confirm('Are you sure you want to delete this review?')) return;

    const result = await deleteReviewAction(reviewId, productId);
    if (result.error) {
      alert(result.error);
    } else {
      router.refresh();
    }
  }

  return (
    <div className="space-y-6">
      {/* RATING BREAKDOWN */}
      {summary.total_reviews > 0 && (
        <div className="bg-stone-900/40 p-6 rounded-xl border border-stone-800">
          <div className="flex items-center gap-4 mb-4">
            <div>
              <p className="text-3xl font-bold text-amber-400">
                {summary.average_rating.toFixed(1)}
              </p>
              <p className="text-xs text-stone-400">out of 5</p>
            </div>
            <div>
              <StarRating
                rating={Math.round(summary.average_rating)}
                readOnly
                size="md"
              />
              <p className="text-sm text-stone-400 mt-1">
                Based on {summary.total_reviews} review
                {summary.total_reviews !== 1 ? 's' : ''}
              </p>
            </div>
          </div>

          {/* RATING DISTRIBUTION BARS */}
          <div className="space-y-1.5">
            {[5, 4, 3, 2, 1].map((star) => {
              const count =
                summary.rating_breakdown[star as 1 | 2 | 3 | 4 | 5];
              const percent =
                summary.total_reviews > 0
                  ? (count / summary.total_reviews) * 100
                  : 0;
              return (
                <div key={star} className="flex items-center gap-2 text-xs">
                  <span className="w-4 text-stone-400">{star}★</span>
                  <div
                    className="flex-1 h-2 bg-stone-800 rounded-full overflow-hidden"
                    role="progressbar"
                    aria-valuenow={count}
                    aria-valuemin={0}
                    aria-valuemax={summary.total_reviews}
                    aria-label={`${count} ${star}-star reviews`}
                  >
                    <div
                      className="h-full bg-amber-500"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                  <span className="w-8 text-stone-400 text-right">{count}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* REVIEWS LIST */}
      {reviews.length === 0 ? (
        <p className="text-stone-400 italic text-center py-8">
          No reviews yet. Be the first to review this product!
        </p>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <article
              key={review.id}
              className="bg-stone-900/40 p-5 rounded-xl border border-stone-800"
              aria-label={`Review by ${review.user_name || 'Anonymous'}`}
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="text-stone-100 font-semibold">
                    {review.user_name || 'Anonymous'}
                  </p>
                  <time
                    dateTime={review.created_at}
                    className="text-xs text-stone-400"
                  >
                    {new Date(review.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                    {review.created_at !== review.updated_at && (
                      <span className="ml-2 italic">(edited)</span>
                    )}
                  </time>
                </div>
                <StarRating rating={review.rating} readOnly size="sm" />
              </div>
              <p className="text-stone-200 mt-2 whitespace-pre-wrap">
                {review.review_text}
              </p>

              {currentUserId === review.user_id && (
                <button
                  onClick={() => handleDelete(review.id, review.product_id)}
                  className="mt-3 text-xs text-rose-400 hover:underline focus:outline-2 focus:outline-rose-500 rounded"
                  aria-label="Delete your review"
                >
                  Delete Review
                </button>
              )}
            </article>
          ))}
        </div>
      )}
    </div>
  );
}