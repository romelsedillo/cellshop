"use client";

import { useState } from "react";
import { Mail, Lock, Loader2, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { FaGoogle, FaGithub } from "react-icons/fa";
import { toast } from "sonner";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "../ui/button";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw new Error(error.message);

      toast.success(
        "Registration success! Please check your email to confirm."
      );
      console.log("Signup data:", data);
    } catch (error: unknown) {
      const err = error as Error;
      console.error("Signup error!", err.message);
      toast.error("Error signing up! " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleRegister = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
      });

      if (error) throw new Error("Google login error");

      toast.success("Register success!");
    } catch (error: unknown) {
      const err = error as Error;
      console.error("Google login error:", err.message);
      toast.error("Google login failed. Please try again.");
    }
  };

  const handleGithubRegister = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "github",
      });

      if (error) throw new Error("GitHub login error");

      toast.success("Register success!");
    } catch (error: unknown) {
      const err = error as Error;
      console.error("GitHub login error:", err.message);
      toast.error("GitHub login failed. Please try again.");
    }
  };

  return (
    <div className="py-16 flex items-center justify-center bg-slate-100 px-4">
      <div className="max-w-md w-full space-y-6 bg-white p-8 rounded-md shadow-md  border border-slate-200">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-700">
            Create an Account
          </h2>
        </div>

        <form className="space-y-4" onSubmit={handleRegister}>
          {/* Email Field */}
          <div className="flex items-center border-slate-200 border rounded px-3 py-2 focus-within:border-pink-500">
            <Mail className="h-4 w-4 text-pink-500 mr-2" />
            <input
              type="email"
              className="w-full outline-none text-slate-800 placeholder:text-slate-400"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password Field */}
          <div className="relative flex items-center border-slate-200 border rounded px-3 py-2 focus-within:border-pink-500">
            <Lock className="h-4 w-4 text-pink-500 mr-2" />
            <input
              type={showPassword ? "text" : "password"}
              className="w-full outline-none pr-4 text-slate-800 placeholder:text-slate-400"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="absolute right-3 text-slate-500 cursor-pointer"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
            </button>
          </div>

          <Button
            type="submit"
            className={`w-full py-2 px-4 rounded font-medium flex items-center justify-center transition-all duration-200 ${
              !email || !password
                ? "bg-pink-300 text-white cursor-not-allowed hover:bg-pink-300"
                : "bg-pink-500 hover:bg-pink-600 text-white active:scale-[0.98] shadow-md"
            }`}
          >
            {loading ? (
              <Loader2 className="animate-spin h-5 w-5" />
            ) : (
              "Register"
            )}
          </Button>
        </form>

        <div className="flex items-center gap-2 my-4">
          <div className="flex-grow border-t border-slate-300" />
          <span className="text-sm text-slate-500">or continue with</span>
          <div className="flex-grow border-t border-slate-300" />
        </div>

        <div className="flex flex-col justify-evenly sm:flex-row gap-3">
          <button
            onClick={handleGoogleRegister}
            className="w-full bg-white text-slate-800 border rounded py-2 flex items-center justify-center text-sm hover:bg-slate-50 cursor-pointer transition-transform duration-150 ease-in-out active:scale-95"
          >
            <FaGoogle className="w-4 h-4 mr-2" />
            Google
          </button>

          <button
            onClick={handleGithubRegister}
            className="w-full bg-white text-slate-800 border rounded py-2 flex items-center justify-center text-sm hover:bg-slate-50 cursor-pointer transition-transform duration-150 ease-in-out active:scale-95"
          >
            <FaGithub className="w-4 h-4 mr-2" />
            GitHub
          </button>
        </div>

        <div className="text-sm font-semibold text-center text-slate-600">
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
