("");
import { Badge } from "@/components/ui/badge";
import { stripe } from "@/lib/stripe";
import Image from "next/image";
import AddToWishList from "@/components/layout/AddToWishList";
import AddToCart from "@/components/layout/AddToCart";

const ProductsPage = async () => {
  const { data: products } = await stripe.products.list({
    expand: ["data.default_price"],
    limit: 20,
  });
  console.log(products);
  return (
    <section className="px-6 py-12 lg:px-20">
      <h1 className="text-4xl font-bold mb-8 text-gray-900">All Products</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map((product) => {
          const price = product.default_price as Stripe.Price;
          const unitAmount = price?.unit_amount ? price.unit_amount / 100 : 0;

          return (
            <div
              key={product.id}
              className="relative h-80 w-60 border border-slate-200 shadow rounded-lg overflow-hidden px-6 py-4"
            >
              <Badge
                variant="secondary"
                className="absolute bg-white text-pink-500 z-10 top-2 left-2 border border-pink-200"
              >
                New
              </Badge>
              <AddToWishList />
              <AddToCart />
              {/* Product Image */}
              {product.images?.[0] ? (
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  width={500}
                  height={500}
                  className="object-contain w-48 h-40 mx-auto mb-4"
                />
              ) : (
                <div className="w-full h-60 bg-gray-100 flex items-center justify-center text-gray-400 mb-4 rounded-lg">
                  No image
                </div>
              )}

              {/* Product Info */}
              <h2 className="text-lg font-bold">{product.name}</h2>
              <h2 className="text-sm text-gray-500">
                {product.metadata?.brand}
              </h2>

              {/* Product Price */}
              {unitAmount ? (
                <p className="text-lg font-bold text-pink-600 mb-2">
                  ₱{unitAmount.toFixed(2)}
                </p>
              ) : (
                <p className="text-gray-500 text-sm">Price not available</p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ProductsPage;
