import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import axios from "axios";
import api from "../api/client";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { ImageSlider } from "@/components/ui/image-slider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const propertyImages = [
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=900&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=900&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=900&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=900&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=900&auto=format&fit=crop",
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 12,
    },
  },
};

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post("/auth/login", { email, password });

      login(res.data.access_token, res.data.user);
      toast.success("Welcome back!");
      navigate("/dashboard");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data?.detail || "Login failed");
      } else {
        toast.error("Login failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen min-h-[700px] flex items-center justify-center bg-slate-950 p-4">
      <motion.div
        className="w-full max-w-5xl h-[700px] grid grid-cols-1 lg:grid-cols-2 rounded-2xl overflow-hidden shadow-2xl border border-white/10"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {/* Left side: Image Slider */}
        <div className="hidden lg:block">
          <ImageSlider images={propertyImages} interval={4000} />
        </div>

        {/* Right side: Login Form */}
        <div className="w-full h-full bg-slate-900 text-white flex flex-col items-center justify-center p-8 md:p-12">
          <motion.div
            className="w-full max-w-sm"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h1 variants={itemVariants} className="text-3xl font-bold tracking-tight mb-2">
              Welcome Back
            </motion.h1>
            <motion.p variants={itemVariants} className="text-gray-400 mb-8">
              Enter your credentials to access your account.
            </motion.p>

            <motion.form variants={itemVariants} className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-300">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-slate-800 border-slate-700 text-white placeholder:text-gray-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-300">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-slate-800 border-slate-700 text-white placeholder:text-gray-500"
                />
              </div>
              <Button type="submit" className="w-full bg-white text-black hover:bg-gray-200" disabled={loading}>
                {loading ? "Logging in..." : "Log In"}
              </Button>
            </motion.form>

            <motion.p variants={itemVariants} className="text-center text-sm text-gray-400 mt-8">
              Don't have an account?{" "}
              <Link to="/register" className="font-medium text-white hover:underline">
                Sign up
              </Link>
            </motion.p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
