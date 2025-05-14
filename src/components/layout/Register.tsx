"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Lock, Loader2, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { FaGoogle, FaGithub } from "react-icons/fa";

const Register = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <div className="py-16 flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full space-y-6 bg-white p-8 rounded shadow">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800">
            Create an Account
          </h2>
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
          <div className="relative flex items-center border rounded px-3 py-2">
            <Lock className="h-4 w-4 text-pink-500 mr-2" />
            <input
              type={showPassword ? "text" : "password"}
              className="w-full outline-none pr-4"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="absolute right-3 text-gray-500 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
            </button>
          </div>

          <button
            disabled={loading}
            className="w-full bg-pink-500 hover:bg-pink-600 text-white py-2 rounded flex items-center justify-center cursor-pointer"
          >
            {loading ? (
              <Loader2 className="animate-spin h-5 w-5" />
            ) : (
              "Register"
            )}
          </button>
        </div>

        <div className="flex items-center gap-2 my-4">
          <div className="flex-grow border-t border-gray-300" />
          <span className="text-sm text-gray-500">or continue with</span>
          <div className="flex-grow border-t border-gray-300" />
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button className="flex-1 flex items-center justify-center gap-2 border rounded px-4 py-2 hover:bg-gray-100">
            <FaGoogle className="w-4 h-4" />
            Google
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 border rounded px-4 py-2 hover:bg-gray-100">
            <FaGithub className="w-4 h-4" />
            GitHub
          </button>
        </div>

        <div className="text-sm text-center text-gray-600">
          Already have an account?{" "}
          <Link href="/login" className="text-pink-500 hover:underline">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
