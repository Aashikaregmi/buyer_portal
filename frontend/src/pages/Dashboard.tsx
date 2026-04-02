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
  const { user, logout, isAuthenticated } = useAuth();
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

  const handleLogout = () => {
    logout();
    toast.success("Logged out");
    navigate("/login");
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div>
          <h1>Welcome, {user?.fullName}</h1>
          <span className="role-badge">{user?.role}</span>
        </div>
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </header>

      <section>
        <h2>My Favourites ({favourites.length})</h2>
        {favourites.length === 0 ? (
          <p className="empty-message">
            No favourites yet. Browse properties below and click the heart!
          </p>
        ) : (
          <div className="property-grid">
            {favourites.map((fav) => (
              <PropertyCard
                key={fav.id}
                id={fav.property_id}
                title={fav.property_name}
                image_url={fav.image_url}
                isFavourited={true}
                onToggleFavourite={() =>
                  toggleFavourite({
                    id: fav.property_id,
                    title: fav.property_name,
                    image_url: fav.image_url,
                    price: 0,
                    location: "",
                    bedrooms: 0,
                    bathrooms: 0,
                  })
                }
              />
            ))}
          </div>
        )}
      </section>

      <section>
        <h2>All Properties</h2>
        <div className="property-grid">
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
      </section>
    </div>
  );
}