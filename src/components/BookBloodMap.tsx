"use client";

import {
MapContainer,
TileLayer,
Marker,
Popup,
useMapEvents,
} from "react-leaflet";

// @ts-ignore: allow side-effect css import without type declarations
import "leaflet/dist/leaflet.css";

import L from "leaflet";

import {
GeoSearchControl,
OpenStreetMapProvider,
} from "leaflet-geosearch";

import {
useEffect,
} from "react";

delete (L.Icon.Default.prototype as any)
._getIconUrl;

L.Icon.Default.mergeOptions({
iconRetinaUrl:
"https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",

iconUrl:
"https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",

shadowUrl:
"https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

function SearchField() {
const map = useMapEvents({});

useEffect(() => {
const provider =
new OpenStreetMapProvider();


const searchControl =
  new (GeoSearchControl as any)({
    provider,

    style: "bar",

    autoClose: true,

    keepResult: true,
  });

map.addControl(
  searchControl
);

return () => {
  map.removeControl(
    searchControl
  );
};


}, [map]);

return null;
}

function LocationMarker({
setForm,
}: any) {
const map =
useMapEvents({
click(e) {
setForm(
(prev: any) => ({
...prev,


        latitude:
          e.latlng.lat.toString(),

        longitude:
          e.latlng.lng.toString(),
      })
    );

    map.flyTo(
      e.latlng,
      15
    );
  },
});


return null;
}

export default function BookBloodMap({
latitude,
longitude,
setForm,
}: any) {
const lat =
latitude
? Number(
latitude
)
: 31.5204;

const lng =
longitude
? Number(
longitude
)
: 74.3587;

return (
<MapContainer
center={[
lat,
lng,
]}
zoom={13}
style={{
height:
"400px",


    width:
      "100%",
  }}
>
  <TileLayer
    attribution='&copy; OpenStreetMap'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />

  <SearchField />

  <LocationMarker
    setForm={
      setForm
    }
  />

  <Marker
    position={[
      lat,
      lng,
    ]}
  >
    <Popup>
      Selected
      Location
    </Popup>
  </Marker>
</MapContainer>


);
}
