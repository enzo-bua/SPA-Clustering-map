import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { getAirports } from '../../services/getAirports';
import { getAllAirports } from '../../services/getAllAirports';
import { Aiport } from '../Aiport';

export const Map = () => {
  const santoriniCoordinates = [36.3932, 25.4615];

  const [airports, setAirports] = useState([]);

  useEffect(() => {
    getAllAirports().then(res => {
      setAirports(res);
    });
  }, []);

  return (
    <div className="relative z-[-1]">
      <MapContainer
        center={santoriniCoordinates}
        zoom={13}
        className="h-screen w-screen mb-20"
        style={{ position: 'relative', zIndex: '0' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors"
        />
        {airports.map((marker, index) => (
          <Marker key={index} position={marker.position}>
            <Popup>
              <Aiport />
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

