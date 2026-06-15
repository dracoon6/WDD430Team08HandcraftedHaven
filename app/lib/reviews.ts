import { query } from './db';

export interface Review {
  id: string;
  product_id: string;
  user_id: string;
  user_name: string | null;
  rating: number;
  review_text: string;
  created_at: string;
  updated_at: string;
}

export interface RatingSummary {
  average_rating: number;
  total_reviews: number;
  rating_breakdown: {
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
  };
}

// FETCH ALL REVIEWS FOR A PRODUCT (with username)
export async function getProductReviews(productId: string): Promise<Review[]> {
  try {
    const { rows } = await query<Review>(
      `SELECT 
         r.id,
         r.product_id,
         r.user_id,
         u.name as user_name,
         r.rating,
         r.review_text,
         r.created_at,
         r.updated_at
       FROM reviews r
       JOIN users u ON r.user_id = u.id
       WHERE r.product_id = $1
       ORDER BY r.created_at DESC`,
      [productId]
    );
    return rows;
  } catch (error) {
    console.error('Error fetching reviews:', error);
    throw new Error('Failed to load reviews');
  }
}

// FETCH AVG RATING + BREAKDOWN
export async function getProductRatingSummary(
  productId: string
): Promise<RatingSummary> {
  try {
    const { rows } = await query<{
      average_rating: string;
      total_reviews: number;
      rating_1: string;
      rating_2: string;
      rating_3: string;
      rating_4: string;
      rating_5: string;
    }>(
      `SELECT
         COALESCE(AVG(rating), 0)::numeric(3,2) as average_rating,
         COUNT(*)::int as total_reviews,
         COUNT(*) FILTER (WHERE rating = 1)::int as rating_1,
         COUNT(*) FILTER (WHERE rating = 2)::int as rating_2,
         COUNT(*) FILTER (WHERE rating = 3)::int as rating_3,
         COUNT(*) FILTER (WHERE rating = 4)::int as rating_4,
         COUNT(*) FILTER (WHERE rating = 5)::int as rating_5
       FROM reviews
       WHERE product_id = $1`,
      [productId]
    );

    const row = rows[0];
    return {
      average_rating: Number(row?.average_rating || 0),
      total_reviews: Number(row?.total_reviews || 0),
      rating_breakdown: {
        1: Number(row?.rating_1 || 0),
        2: Number(row?.rating_2 || 0),
        3: Number(row?.rating_3 || 0),
        4: Number(row?.rating_4 || 0),
        5: Number(row?.rating_5 || 0),
      },
    };
  } catch (error) {
    console.error('Error fetching rating summary:', error);
    return {
      average_rating: 0,
      total_reviews: 0,
      rating_breakdown: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
    };
  }
}

// UPSERT (ADD OR UPDATE) — handles both create + edit
export async function upsertReview(
  productId: string,
  userId: string,
  rating: number,
  reviewText: string
): Promise<Review> {
  const { rows } = await query<Review>(
    `INSERT INTO reviews (product_id, user_id, rating, review_text)
     VALUES ($1, $2, $3, $4)
     ON CONFLICT (product_id, user_id)
     DO UPDATE SET 
       rating = EXCLUDED.rating, 
       review_text = EXCLUDED.review_text
     RETURNING *`,
    [productId, userId, rating, reviewText]
  );
  return rows[0];
}

// DELETE (only if owned by user)
export async function deleteReview(
  reviewId: string,
  userId: string
): Promise<boolean> {
  const { rowCount } = await query(
    'DELETE FROM reviews WHERE id = $1 AND user_id = $2',
    [reviewId, userId]
  );
  return (rowCount ?? 0) > 0;
}