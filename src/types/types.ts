export type Order = {
  id: string;
  email: string;
  cart: string; // still a string from DB
  created_at: string;
};
export type CartItem = {
  id: string;
  name: string;
  quantity: number;
  price: number;
};
