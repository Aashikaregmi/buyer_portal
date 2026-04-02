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

export default function Dashboard() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [properties, setProperties] = useState<Property[]>([]);
  const [favourites, setFavourites] = useState<Favourite[]>([]);
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

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-white mb-2">All Properties</h1>
      <p className="text-gray-400 mb-8">{properties.length} listings available</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((prop) => (
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
    </div>
  );
}
