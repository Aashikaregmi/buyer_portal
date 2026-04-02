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
  "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=900&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=900&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=900&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=900&auto=format&fit=crop",
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

export default function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post("/auth/register", {
        firstName,
        lastName,
        email,
        password,
      });

      login(res.data.access_token, res.data.user);
      toast.success("Account created successfully!");
      navigate("/dashboard");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data?.detail || "Registration failed");
      } else {
        toast.error("Registration failed");
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

        {/* Right side: Register Form */}
        <div className="w-full h-full bg-slate-900 text-white flex flex-col items-center justify-center p-8 md:p-12">
          <motion.div
            className="w-full max-w-sm"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h1 variants={itemVariants} className="text-3xl font-bold tracking-tight mb-2">
              Create Account
            </motion.h1>
            <motion.p variants={itemVariants} className="text-gray-400 mb-8">
              Sign up to start browsing properties.
            </motion.p>

            <motion.form variants={itemVariants} className="space-y-5" onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-gray-300">First Name</Label>
                  <Input
                    id="firstName"
                    type="text"
                    placeholder="John"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    className="bg-slate-800 border-slate-700 text-white placeholder:text-gray-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-gray-300">Last Name</Label>
                  <Input
                    id="lastName"
                    type="text"
                    placeholder="Doe"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    className="bg-slate-800 border-slate-700 text-white placeholder:text-gray-500"
                  />
                </div>
              </div>
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
                  placeholder="Min 8 chars, 1 number, 1 special"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-slate-800 border-slate-700 text-white placeholder:text-gray-500"
                />
              </div>
              <Button type="submit" className="w-full bg-white text-black hover:bg-gray-200" disabled={loading}>
                {loading ? "Creating..." : "Create Account"}
              </Button>
            </motion.form>

            <motion.p variants={itemVariants} className="text-center text-sm text-gray-400 mt-8">
              Already have an account?{" "}
              <Link to="/login" className="font-medium text-white hover:underline">
                Sign in
              </Link>
            </motion.p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
