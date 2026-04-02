import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/context/useAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { HomeIcon, Heart, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    toast.success("Logged out");
    navigate("/login");
  };

  const navLink = (to: string, label: string) => (
    <Link
      to={to}
      className={cn(
        "text-sm font-medium transition-colors hover:text-white",
        location.pathname === to ? "text-white" : "text-gray-400"
      )}
    >
      {label}
    </Link>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-slate-950/90 backdrop-blur-md">
      <nav className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2 text-white">
          <HomeIcon className="size-5" />
          <span className="text-lg font-bold">BuyerPortal</span>
        </Link>

        <div className="flex items-center gap-6">
          {navLink("/", "Home")}
          {isAuthenticated && (
            <>
              {navLink("/dashboard", "Properties")}
              <Link
                to="/favourites"
                className={cn(
                  "flex items-center gap-1 text-sm font-medium transition-colors hover:text-white",
                  location.pathname === "/favourites" ? "text-white" : "text-gray-400"
                )}
              >
                <Heart className="size-4" />
                Favourites
              </Link>
            </>
          )}
          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-400">{user?.fullName}</span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1 text-sm text-gray-400 transition-colors hover:text-white"
              >
                <LogOut className="size-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link to="/login" className="text-sm text-gray-300 hover:text-white transition-colors">
                Sign In
              </Link>
              <Link
                to="/register"
                className="bg-white text-black px-3 py-1.5 rounded-md text-sm font-medium hover:bg-gray-200 transition-colors"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
