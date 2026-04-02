import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import axios from "axios";
import api from "../api/client";
import toast from "react-hot-toast";
import PropertyCard from "../components/PropertyCard";
import { ChevronLeft, ChevronRight, Search, X } from "lucide-react";

interface Property {
  id: string;
  title: string;
  image_url: string;
  price: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
}

interface Favourite {
  id: string;
  property_id: string;
  property_name: string;
  image_url: string;
  added_at: string;
}

const ITEMS_PER_PAGE = 10;

export default function Dashboard() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [properties, setProperties] = useState<Property[]>([]);
  const [favourites, setFavourites] = useState<Favourite[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  // Filters
  const [search, setSearch] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [bedroomFilter, setBedroomFilter] = useState("");
  const [priceSort, setPriceSort] = useState("");

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    fetchData();
  }, [isAuthenticated, navigate]);

  const fetchData = async () => {
    try {
      const [propRes, favRes] = await Promise.all([
        api.get("/properties"),
        api.get("/favourites"),
      ]);
      setProperties(propRes.data);
      setFavourites(favRes.data);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data?.detail || "Failed to load data");
      }
    } finally {
      setLoading(false);
    }
  };

  // Unique locations for dropdown
  const locations = useMemo(() => {
    const locs = [...new Set(properties.map((p) => p.location))];
    return locs.sort();
  }, [properties]);

  // Unique bedroom counts for dropdown
  const bedroomOptions = useMemo(() => {
    const beds = [...new Set(properties.map((p) => p.bedrooms))];
    return beds.sort((a, b) => a - b);
  }, [properties]);

  // Filtered + sorted properties
  const filteredProperties = useMemo(() => {
    let result = properties;

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.location.toLowerCase().includes(q)
      );
    }

    if (locationFilter) {
      result = result.filter((p) => p.location === locationFilter);
    }

    if (bedroomFilter) {
      result = result.filter((p) => p.bedrooms === Number(bedroomFilter));
    }

    if (priceSort === "low") {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (priceSort === "high") {
      result = [...result].sort((a, b) => b.price - a.price);
    }

    return result;
  }, [properties, search, locationFilter, bedroomFilter, priceSort]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [search, locationFilter, bedroomFilter, priceSort]);

  const totalPages = Math.ceil(filteredProperties.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProperties = filteredProperties.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const hasActiveFilters = search || locationFilter || bedroomFilter || priceSort;

  const clearFilters = () => {
    setSearch("");
    setLocationFilter("");
    setBedroomFilter("");
    setPriceSort("");
  };

  const isFavourited = (propertyId: string) => {
    return favourites.some((fav) => fav.property_id === propertyId);
  };

  const toggleFavourite = async (property: Property) => {
    const alreadyFav = isFavourited(property.id);

    try {
      if (alreadyFav) {
        await api.delete(`/favourites/${property.id}`);
        setFavourites((prev) =>
          prev.filter((fav) => fav.property_id !== property.id)
        );
        toast.success("Removed from favourites");
      } else {
        const res = await api.post("/favourites", {
          property_id: property.id,
          property_name: property.title,
          image_url: property.image_url,
        });
        setFavourites((prev) => [...prev, res.data]);
        toast.success("Added to favourites!");
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data?.detail || "Something went wrong");
      }
    }
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-white mb-6">All Properties</h1>

      {/* Search & Filters */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search by name or location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-slate-800 border border-white/10 text-white text-sm placeholder:text-gray-500 focus:outline-none focus:border-white/30 transition-colors"
          />
        </div>

        <select
          value={locationFilter}
          onChange={(e) => setLocationFilter(e.target.value)}
          className="px-3 py-2 rounded-lg bg-slate-800 border border-white/10 text-sm text-gray-300 focus:outline-none focus:border-white/30 transition-colors"
        >
          <option value="">All Locations</option>
          {locations.map((loc) => (
            <option key={loc} value={loc}>{loc}</option>
          ))}
        </select>

        <select
          value={bedroomFilter}
          onChange={(e) => setBedroomFilter(e.target.value)}
          className="px-3 py-2 rounded-lg bg-slate-800 border border-white/10 text-sm text-gray-300 focus:outline-none focus:border-white/30 transition-colors"
        >
          <option value="">All Bedrooms</option>
          {bedroomOptions.map((bed) => (
            <option key={bed} value={bed}>{bed} {bed === 1 ? "Bed" : "Beds"}</option>
          ))}
        </select>

        <select
          value={priceSort}
          onChange={(e) => setPriceSort(e.target.value)}
          className="px-3 py-2 rounded-lg bg-slate-800 border border-white/10 text-sm text-gray-300 focus:outline-none focus:border-white/30 transition-colors"
        >
          <option value="">Sort by Price</option>
          <option value="low">Price: Low to High</option>
          <option value="high">Price: High to Low</option>
        </select>

        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm text-gray-400 hover:text-white border border-white/10 hover:border-white/20 transition-colors"
          >
            <X className="size-3" />
            Clear
          </button>
        )}
      </div>

      <p className="text-gray-400 text-sm mb-6">
        {filteredProperties.length === 0
          ? "No properties match your filters"
          : `Showing ${startIndex + 1}\u2013${Math.min(startIndex + ITEMS_PER_PAGE, filteredProperties.length)} of ${filteredProperties.length} listings`}
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {paginatedProperties.map((prop) => (
          <PropertyCard
            key={prop.id}
            id={prop.id}
            title={prop.title}
            image_url={prop.image_url}
            price={prop.price}
            location={prop.location}
            bedrooms={prop.bedrooms}
            bathrooms={prop.bathrooms}
            isFavourited={isFavourited(prop.id)}
            onToggleFavourite={() => toggleFavourite(prop)}
          />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-10">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 rounded-lg border border-white/10 text-gray-400 hover:text-white hover:border-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="size-5" />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => goToPage(page)}
              className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors ${
                currentPage === page
                  ? "bg-white text-black"
                  : "border border-white/10 text-gray-400 hover:text-white hover:border-white/20"
              }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-2 rounded-lg border border-white/10 text-gray-400 hover:text-white hover:border-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight className="size-5" />
          </button>
        </div>
      )}
    </div>
  );
}
