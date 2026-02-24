import { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { MapPin } from 'lucide-react';

// Fix default marker icon
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface MapPickerProps {
  latitude?: number;
  longitude?: number;
  onLocationSelect: (lat: number, lng: number) => void;
}

const LocationMarker = ({ onLocationSelect }: { onLocationSelect: (lat: number, lng: number) => void }) => {
  const [position, setPosition] = useState<[number, number] | null>(null);

  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      setPosition([lat, lng]);
      onLocationSelect(lat, lng);
    },
  });

  return position ? <Marker position={position} /> : null;
};

const MapPicker = ({ latitude, longitude, onLocationSelect }: MapPickerProps) => {
  const defaultCenter: [number, number] = [35.1681, -2.9333]; // Nador coordinates
  const center: [number, number] = latitude && longitude ? [latitude, longitude] : defaultCenter;

  return (
    <div className="relative">
      <MapContainer
        center={center}
        zoom={13}
        className="w-full h-64 rounded-xl"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; OpenStreetMap'
        />
        <LocationMarker onLocationSelect={onLocationSelect} />
        {latitude && longitude && <Marker position={[latitude, longitude]} />}
      </MapContainer>
      <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-white px-4 py-2 rounded-full shadow-md flex items-center gap-2 text-sm font-medium">
        <MapPin className="w-4 h-4 text-blue-600" />
        Set on Map
      </div>
    </div>
  );
};

export default MapPicker;
