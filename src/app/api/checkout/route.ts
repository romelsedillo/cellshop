// pages/api/checkout.ts or app/api/checkout/route.ts (Next.js 13+)
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-06-30.basil",
});

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // must be service role
);

export async function POST(req: Request) {
  try {
    const { cart, email, user_id } = await req.json();

    if (!cart || cart.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    // Save the cart temporarily in DB and get its ID
    const { data: orderDraft, error } = await supabase
      .from("order_drafts")
      .insert([{ user_id, email, cart }]) // cart column is jsonb
      .select()
      .single();

    if (error) throw error;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: cart.map(
        (item: { name: string; price: number; quantity: number }) => ({
          price_data: {
            currency: "usd",
            product_data: { name: item.name },
            unit_amount: item.price * 100,
          },
          quantity: item.quantity,
        })
      ),
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/cart`,
      metadata: {
        draft_id: orderDraft.id.toString(), // only pass small ID
        user_id: user_id || "",
        email: email || "",
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    // Use 'unknown' and then safely narrow the type
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    console.error("Checkout error:", errorMessage);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

// import { NextResponse } from "next/server";
// import Stripe from "stripe";

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
//   apiVersion: "2025-06-30.basil",
// });

// type CartItem = {
//   name: string;
//   image: string;
//   price: number;
//   quantity: number;
// };

// export async function POST(req: Request) {
//   try {
//     const {
//       cartItems,
//       user,
//     }: { cartItems: CartItem[]; user: { id: string; email: string } } =
//       await req.json();

//     // console.log("✅ cartItems:", cartItems);
//     // console.log("✅ STRIPE_SECRET_KEY:", process.env.STRIPE_SECRET_KEY);
//     // console.log("✅ NEXT_PUBLIC_BASE_URL:", process.env.NEXT_PUBLIC_BASE_URL);

//     if (!cartItems || cartItems.length === 0) {
//       return NextResponse.json(
//         { error: "No cart items provided" },
//         { status: 400 }
//       );
//     }

//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ["card"],
//       mode: "payment",
//       // success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
//       // cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout`,
//       success_url: `https://pickcellshop.vercel.app/success`,
//       cancel_url: `https://pickcellshop.vercel.app/checkout`,
//       line_items: cartItems.map((item) => ({
//         price_data: {
//           currency: "php",
//           product_data: {
//             name: item.name || "Unnamed Product",
//             images: item.image?.startsWith("http") ? [item.image] : [],
//           },
//           unit_amount: item.price ? Math.round(item.price * 100) : 1000,
//         },
//         quantity: item.quantity || 1,
//       })),
//       metadata: {
//         user_id: user?.id || "guest",
//         email: user?.email || "no-email",
//         cart: JSON.stringify(cartItems),
//       },
//     });

//     return NextResponse.json({ id: session.id });
//   } catch (err) {
//     console.error("🔥 Stripe session error:", err);
//     return NextResponse.json(
//       { error: "Failed to create checkout session" },
//       { status: 500 }
//     );
//   }
// }
