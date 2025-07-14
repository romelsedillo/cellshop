"use client";

import { useEffect, useState } from "react";
import { Mail, Loader2 } from "lucide-react";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);
  return (
    <div className="py-16 flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full space-y-6 bg-white p-8 rounded shadow">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800">Forgot Password</h2>
          <p className="text-sm text-gray-600 mt-1">
            Enter your email to receive a password reset link.
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center border rounded px-3 py-2">
            <Mail className="h-4 w-4 text-pink-500 mr-2" />
            <input
              type="email"
              className="w-full outline-none"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button
            disabled={loading}
            className="w-full bg-pink-500 hover:bg-pink-600 text-white py-2 rounded flex items-center justify-center cursor-pointer"
          >
            {loading ? (
              <Loader2 className="animate-spin h-5 w-5" />
            ) : (
              "Send Reset Link"
            )}
          </button>
        </div>

        <div className="text-sm text-center text-gray-600">
          <Link href="/login" className="text-pink-500 hover:underline">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
