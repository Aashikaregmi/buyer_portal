import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import axios from "axios";
import api from "../api/client";
import toast from "react-hot-toast";
import PropertyCard from "../components/PropertyCard";

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

export default function Favourites() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [favouriteProperties, setFavouriteProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    fetchData();
  }, [isAuthenticated, navigate]);

  const fetchData = async () => {
    try {
      const [favRes, propRes] = await Promise.all([
        api.get("/favourites"),
        api.get("/properties"),
      ]);

      const favourites: Favourite[] = favRes.data;
      const properties: Property[] = propRes.data;
      const favPropertyIds = new Set(favourites.map((f) => f.property_id));

      setFavouriteProperties(
        properties.filter((p) => favPropertyIds.has(p.id))
      );
    } catch (err) {
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data?.detail || "Failed to load favourites");
      }
    } finally {
      setLoading(false);
    }
  };

  const removeFavourite = async (property: Property) => {
    try {
      await api.delete(`/favourites/${property.id}`);
      setFavouriteProperties((prev) => prev.filter((p) => p.id !== property.id));
      toast.success("Removed from favourites");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data?.detail || "Something went wrong");
      }
    }
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-white mb-2">My Favourites</h1>
      <p className="text-gray-400 mb-8">{favouriteProperties.length} saved properties</p>

      {favouriteProperties.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-400 text-lg">No favourites yet.</p>
          <p className="text-gray-500 mt-2">Browse properties and click the heart to save them here.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {favouriteProperties.map((prop) => (
            <PropertyCard
              key={prop.id}
              id={prop.id}
              title={prop.title}
              image_url={prop.image_url}
              price={prop.price}
              location={prop.location}
              bedrooms={prop.bedrooms}
              bathrooms={prop.bathrooms}
              isFavourited={true}
              variant="favourite"
              onToggleFavourite={() => removeFavourite(prop)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
