"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { FaGoogle, FaGithub } from "react-icons/fa";
import Link from "next/link";
import { toast } from "sonner";
import { supabase } from "@/lib/supabaseClient";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberedEmail");
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const isAuthenticated =
      email === "test1@gmail.com" && password === "test123";
    if (isAuthenticated) {
      toast.success("Login success.");
      if (rememberMe) {
        localStorage.setItem("rememberedEmail", email);
      }
      router.push("/");
    } else {
      toast.error("Wrong email and password combination!");
    }
    setLoading(false);
  };

  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });

    if (error) {
      toast.error("Google login error!");
      console.error("Google login error:", error.message);
    } else {
      toast.success("Google login success.");
    }
  };
  const handleGithubLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "github",
    });

    if (error) {
      toast.error("Github login error!");
      console.error("Github login error:", error.message);
    } else {
      toast.success("Github login success.");
    }
  };

  return (
    <div className="py-12 flex items-center justify-center bg-gray-100 px-4 ">
      <div className="max-w-md w-full space-y-6 bg-white p-8 rounded shadow">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800">
            Login to Your Account
          </h2>
        </div>
        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email Field */}
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
          {/* Password Field */}
          <div className="relative flex items-center border rounded px-3 py-2 focus-within:border-pink-500">
            <Lock className="h-4 w-4 text-pink-500 mr-2" />
            <input
              type={showPassword ? "text" : "password"}
              className="w-full outline-none pr-8"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 text-gray-500"
            >
              {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
            </button>
          </div>
          {/* Login button */}
          <button
            disabled={loading || !email || !password}
            type="submit"
            className="w-full bg-pink-500 hover:bg-pink-600 text-white py-2 rounded flex items-center justify-center cursor-pointer"
          >
            {loading ? <Loader2 className="animate-spin h-5 w-5" /> : "Login"}
          </button>
        </form>
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              name=""
              id="remember"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
              className="accent-pink-500"
            />
            <label htmlFor="remember" className="text-pink-500">
              Remember me.
            </label>
          </div>
          <Link
            href="/forgot-password"
            className="text-pink-500 hover:underline"
          >
            Forgot password?
          </Link>
        </div>
        <div className="text-center text-sm text-gray-500">
          Or continue with
        </div>
        <div className="flex gap-4">
          {/* ---------------GOOGLE BUTTON---------------- */}
          <button
            onClick={handleGoogleLogin}
            className="w-full border rounded py-2 flex items-center justify-center text-sm cursor-pointer hover:bg-gray-50"
          >
            <FaGoogle className="h-4 w-4 mr-2" /> Google
          </button>

          {/* ---------------GITHUB BUTTON---------------- */}
          <button
            onClick={handleGithubLogin}
            className="w-full border rounded py-2 flex items-center justify-center text-sm cursor-pointer hover:bg-gray-50"
          >
            <FaGithub className="h-4 w-4 mr-2" /> GitHub
          </button>
        </div>
        <div className="text-sm text-center text-gray-600">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-pink-500 hover:underline">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
