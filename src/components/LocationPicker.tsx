"use client";

import {
  MapContainer,
  Marker,
  TileLayer,
  useMapEvents,
} from "react-leaflet";

function LocationMarker({
  position,
  setPosition,
}: any) {

  useMapEvents({
    click(e) {
      setPosition([
        e.latlng.lat,
        e.latlng.lng,
      ]);
    },
  });

  return position ? (
    <Marker
      position={position}
    />
  ) : null;
}

export default function LocationPicker({
  position,
  setPosition,
}: any) {
  return (
    <MapContainer
      center={[31.5, 74.3]}
      zoom={7}
      style={{
        height: "300px",
      }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <LocationMarker
        position={position}
        setPosition={setPosition}
      />
    </MapContainer>
  );
}