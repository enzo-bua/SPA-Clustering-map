import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { getAirports } from '../../services/getAirports';
import { getAllAirports } from '../../services/getAllAirports';
import { Aiport } from '../Aiport';
import { Link } from 'react-router-dom';
import { useFilters } from '../../useHook/useFilters';

export const Map = () => {
  const santoriniCoordinates = [36.3932, 25.4615];

  const [airports, setAirports] = useState([]);
  const [airportVisible, setAirportVisible] = useState(false);

  
  useEffect(() => {
    getAllAirports().then(res => {
      setAirports(res);
    });
  }, []);

  
  const { filterProducts } = useFilters();
  const filteredMarkers = filterProducts(airports);
  return (
    <div className="relative z-[0]">
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
        {filteredMarkers.map((marker, index) => (
          <Marker key={index} position={{ lat: marker.lat, lng: marker.lng }}>
            <Popup>
              <Link to={`/${marker.id}`}>
                <h3 className='text-black/100 font-medium grid justify-center mb-4'>{marker.name}</h3>
                <button
                  onClick={() => setAirportVisible(true)}
                  className='bg-black text-white w-[100px] h-[25px] rounded-sm shadow-md hover:bg-black/75 transition'
                >
                  Ver detalles
                </button>
              </Link>
              {airportVisible && <Aiport />}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};