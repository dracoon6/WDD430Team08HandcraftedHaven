import { query } from './db';

export interface DBCategory {
  id: number;
  name: string;
  slug: string;
}

export async function getAllCategories(): Promise<DBCategory[]> {
  try {
    const { rows } = await query('SELECT id, name, slug FROM categories');
    return rows as DBCategory[];
  } catch (error) {
    console.error('Database error while fetching categories:', error);
    throw new Error('Failed to fetch categories.');
  }
}
