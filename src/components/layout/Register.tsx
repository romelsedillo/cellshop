"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Lock, Loader2, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { FaGoogle, FaGithub } from "react-icons/fa";
import { toast } from "sonner";
import { supabase } from "@/lib/supabaseClient";

const Register = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    toast.success("Register success!");
    setLoading(false);
  };

  const handleGoogleRegister = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });

    if (error) {
      toast.error("Google login error");
      console.error("Google login error:", error.message);
    } else {
      toast.success("Register success!");
    }
  };

  const handleGithubRegister = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "github",
    });
    if (error) {
      toast.error("Github login error");
      console.log("Github login error:", error.message);
    } else {
      toast.success("Register success!");
    }
  };
  return (
    <div className="py-16 flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full space-y-6 bg-white p-8 rounded shadow">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800">
            Create an Account
          </h2>
        </div>

        <form className="space-y-4" onSubmit={handleRegister}>
          {/* ----------------Email Field------------- */}

          <div className="flex items-center border rounded px-3 py-2 focus-within:border-pink-500">
            <Mail className="h-4 w-4 text-pink-500 mr-2" />
            <input
              type="email"
              className="w-full outline-none"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* ----------------Password Field------------- */}
          <div className="relative flex items-center border rounded px-3 py-2 focus-within:border-pink-500">
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

          {/* ----------------Button------------- */}
          <button
            disabled={loading || !email || !password}
            type="submit"
            className="w-full bg-pink-500 hover:bg-pink-600 text-white py-2 rounded flex items-center justify-center cursor-pointer"
          >
            {loading ? (
              <Loader2 className="animate-spin h-5 w-5" />
            ) : (
              "Register"
            )}
          </button>
        </form>

        <div className="flex items-center gap-2 my-4">
          <div className="flex-grow border-t border-gray-300" />
          <span className="text-sm text-gray-500">or continue with</span>
          <div className="flex-grow border-t border-gray-300" />
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          {/* ---------------GOOGLE BUTTON---------------- */}
          <button
            onClick={handleGoogleRegister}
            className="w-full border rounded py-2 flex items-center justify-center text-sm cursor-pointer hover:bg-gray-50"
          >
            <FaGoogle className="w-4 h-4 mr-2" />
            Google
          </button>

          {/* ---------------GITHUB BUTTON---------------- */}
          <button
            onClick={handleGithubRegister}
            className="w-full border rounded py-2 flex items-center justify-center text-sm cursor-pointer hover:bg-gray-50"
          >
            <FaGithub className="w-4 h-4 mr-2" />
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
