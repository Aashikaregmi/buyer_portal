interface PropertyCardProps {
  id: string;
  title: string;
  image_url: string;
  price?: number;
  location?: string;
  bedrooms?: number;
  bathrooms?: number;
  isFavourited: boolean;
  onToggleFavourite: () => void;
}

export default function PropertyCard({
  title,
  image_url,
  price,
  location,
  bedrooms,
  bathrooms,
  isFavourited,
  onToggleFavourite,
}: PropertyCardProps) {
  return (
    <div className="property-card">
      <div className="card-image-container">
        <img src={image_url} alt={title} className="card-image" />
        <button
          onClick={onToggleFavourite}
          className={`fav-btn ${isFavourited ? "fav-active" : ""}`}
        >
          {isFavourited ? "♥" : "♡"}
        </button>
      </div>
      <div className="card-content">
        <h3>{title}</h3>
        {price !== undefined && (
          <p className="price">${price.toLocaleString()}</p>
        )}
        {location && <p className="location">{location}</p>}
        {bedrooms !== undefined && bathrooms !== undefined && (
          <p className="details">
            {bedrooms} bed · {bathrooms} bath
          </p>
        )}
      </div>
    </div>
  );
}