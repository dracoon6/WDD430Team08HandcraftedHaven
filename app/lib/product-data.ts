export interface Product {
  id: number;
  title: string;
  text: string;
  h: string;
  price?: string;
  category?: string;
  seller?: string;
  image?: string;
}

export const products: Product[] = [
  { id: 1,  title: "Product 1",  text: "Short description.", h: "h-48" },
  { id: 2,  title: "Product 2",  text: "Short description.", h: "h-32" },
  { id: 3,  title: "Product 3",  text: "Short description.", h: "h-56" },
  { id: 4,  title: "Product 4",  text: "Short description.", h: "h-32" },
  { id: 5,  title: "Product 5",  text: "Short description.", h: "h-56" },
  { id: 6,  title: "Product 6",  text: "Short description.", h: "h-40" },
  { id: 7,  title: "Product 7",  text: "Short description.", h: "h-56" },
  { id: 8,  title: "Product 8",  text: "Short description.", h: "h-32" },
  { id: 9,  title: "Product 9",  text: "Short description.", h: "h-48" },
  { id: 10, title: "Product 10", text: "Short description.", h: "h-40" },
  { id: 11, title: "Product 11", text: "Short description.", h: "h-56" },
  { id: 12, title: "Product 12", text: "Short description.", h: "h-32" },
];