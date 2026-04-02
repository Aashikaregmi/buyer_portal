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
    <div className="group rounded-xl border border-white/10 bg-slate-900 overflow-hidden transition-all hover:border-white/20 hover:shadow-lg hover:shadow-black/20">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={image_url}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <button
          onClick={onToggleFavourite}
          className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center text-lg transition-all ${
            isFavourited
              ? "bg-red-500 text-white"
              : "bg-black/40 text-white/80 hover:bg-black/60 hover:text-white backdrop-blur-sm"
          }`}
        >
          {isFavourited ? "♥" : "♡"}
        </button>
      </div>
      <div className="p-4 space-y-2">
        <h3 className="text-white font-semibold text-lg leading-tight">{title}</h3>
        {price !== undefined && (
          <p className="text-emerald-400 font-bold text-xl">${price.toLocaleString()}</p>
        )}
        {location && (
          <p className="text-gray-400 text-sm">{location}</p>
        )}
        {bedrooms !== undefined && bathrooms !== undefined && (
          <div className="flex items-center gap-3 pt-2 border-t border-white/10 text-gray-400 text-sm">
            <span>{bedrooms} {bedrooms === 1 ? "bed" : "beds"}</span>
            <span className="text-white/20">|</span>
            <span>{bathrooms} {bathrooms === 1 ? "bath" : "baths"}</span>
          </div>
        )}
      </div>
    </div>
  );
}
