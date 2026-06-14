import { query } from './db';

export interface DBProduct {
  id: string;
  creator_id: string;
  category_id: number;
  title: string;
  description: string;
  short_description: string;
  price: number;
  currency: string;
  stock_quantity: number;
  is_available: boolean;
  image_url: string | null;
  image_urls: string[] | null;
  tags: string[] | null;
  materials: string[] | null;
  dimensions: string | null;
  weight: number | null;
  created_at: Date;
  updated_at: Date;
}

// FETCH ALL PRODUCTS
export async function getAllProducts(): Promise<DBProduct[]> {
  try {
    const { rows } = await query(
      'SELECT * FROM products WHERE is_available = true ORDER BY created_at DESC',
    );
    return rows as DBProduct[];
  } catch (error) {
    console.error('Database error while fetching all products:', error);
    throw new Error('Failed to fetch product catalog data.');
  }
}

// FETCH A SINGLE PRODUCT
export async function getProductById(id: string): Promise<DBProduct | null> {
  try {
    const { rows } = await query('SELECT * FROM products WHERE id = $1', [id]);

    if (!rows || rows.length === 0) {
      return null;
    }

    return rows[0] as DBProduct;
  } catch (error) {
    console.error(`Database error while fetching product ${id}:`, error);
    throw new Error('Failed to retrieve single product specifications.');
  }
}
