export type Product = {
  id: string;
  name: string;
  image: string;
  description: string;
  brand: string;
  price: number;
  featured?: boolean;
  isNew?: boolean;
};
