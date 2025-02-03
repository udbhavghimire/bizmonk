"use client";
import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useState } from "react";

// Fix for the default marker icon
const icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const Map = ({ main_data }) => {
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [state, setState] = useState({
    lat: 43.6532, // Default to Toronto coordinates
    lon: -79.3832,
  });

  const ACCESS_TOKEN =
    "pk.eyJ1IjoiZG9scGh5bWFwYm94IiwiYSI6ImNscTYwcXR5YTBqcG4yam51NDFtbTZkbjcifQ.BXRuDHFFdtNdKyhduH3icA";

  async function getLatLongForMap(listDetail) {
    try {
      const { Street, StreetAbbreviation, StreetName, Area, Province } = listDetail;
      const fullAddressForMap = encodeURIComponent(
        `${StreetName} ${StreetAbbreviation}, ${Area}, ${Province}, Canada`
      );
      const url = `https://api.mapbox.com/search/geocode/v6/forward?country=canada&place=${fullAddressForMap}&access_token=${ACCESS_TOKEN}`;
      const res = await fetch(url);
      const data = await res.json();
      return data;
    } catch (error) {
      console.error("Error fetching coordinates:", error);
      return null;
    }
  }

  useEffect(() => {
    const commonFunctionCall = async () => {
      try {
        const result = await getLatLongForMap(main_data);
        if (result?.features?.length > 0) {
          for (const feature of result.features) {
            if (
              feature?.geometry?.coordinates[0] != undefined &&
              feature?.geometry?.coordinates[1] != undefined
            ) {
              setState({
                lat: feature.geometry.coordinates[1],
                lon: feature.geometry.coordinates[0],
              });
              break;
            }
          }
        }
      } catch (error) {
        console.error("Error setting coordinates:", error);
      } finally {
        setIsLoading(false);
        setMounted(true);
      }
    };
    commonFunctionCall();
  }, [main_data]);

  if (!mounted || isLoading) {
    return (
      <div className="h-[400px] w-full rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
        <p>Loading map...</p>
      </div>
    );
  }

  const position = [state.lat, state.lon];

  return (
    <div className="h-[400px] w-full rounded-lg overflow-hidden">
      <MapContainer
        center={position}
        zoom={13}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position} icon={icon}>
          <Popup>
            {main_data?.Street} {main_data?.StreetName} {main_data?.StreetAbbreviation}
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default Map;
