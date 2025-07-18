import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import axios from "axios";
import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const MapComponent = ({ location }) => {
  const [coords, setCoords] = useState(null);

  useEffect(() => {
    const fetchCoords = async () => {
      try {
        const res = await axios.get(`https://nominatim.openstreetmap.org/search`, {
          params: {
            q: location,
            format: "json",
          },
        });

        if (res.data.length > 0) {
          const { lat, lon } = res.data[0];
          setCoords({ lat: parseFloat(lat), lng: parseFloat(lon) });
        }
      } catch (err) {
        console.error("Failed to fetch geolocation:", err);
      }
    };

    if (location) fetchCoords();
  }, [location]);

  if (!coords) return <p className="text-sm text-gray-500">Loading map...</p>;

  return (
    <MapContainer
      center={[coords.lat, coords.lng]}
      zoom={13}
      style={{ height: "200px", width: "100%", borderRadius: "8px", marginTop: "10px" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[coords.lat, coords.lng]}>
        <Popup>{location}</Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapComponent;
