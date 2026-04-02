import { Link } from "react-router-dom";
import StickyScroll from "@/components/ui/sticky-scroll";

export default function Landing() {
  return (
    <div>
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 bg-slate-950/80 backdrop-blur-md border-b border-white/10">
        <h2 className="text-white text-xl font-semibold">BuyerPortal</h2>
        <div className="flex gap-4">
          <Link to="/login" className="text-gray-300 hover:text-white transition-colors">Login</Link>
          <Link to="/register" className="bg-white text-black px-4 py-1.5 rounded-md font-medium hover:bg-gray-200 transition-colors">Get Started</Link>
        </div>
      </nav>

      <StickyScroll />
    </div>
  );
}
