import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import './findhelp.css';

const FindHelp = () => {
  const [helpCenters, setHelpCenters] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [mapCenter, setMapCenter] = useState([51.505, -0.09]);
  const [zoomLevel, setZoomLevel] = useState(13);
  const [noResults, setNoResults] = useState(false);
  const [radius, setRadius] = useState(5); // Default radius to 5 miles
  const mapRef = useRef();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = [position.coords.latitude, position.coords.longitude];
          setMapCenter(coords);
          setZoomLevel(12);
          console.log(`User's location: ${coords}`);
        },
        (error) => {
          console.error('Error getting geolocation:', error);
        }
      );
    } else {
      console.error('Geolocation not supported by this browser.');
    }
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleRadiusChange = (e) => {
    setRadius(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          searchHelpCentersByQueryAndLocation(searchQuery, latitude, longitude);
        },
        (error) => {
          console.error('Error getting geolocation:', error);
        }
      );
    } else {
      console.error('Geolocation not supported by this browser.');
    }
  };

  const searchHelpCentersByQueryAndLocation = async (query, lat, lon) => {
    const boundingBox = getBoundingBox(lat, lon, radius * 1.60934); // Convert miles to kilometers
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&q=${query}&addressdetails=1&extratags=1&limit=10&bounded=1&viewbox=${boundingBox}`
      );
      console.log('Response from Nominatim (search):', response.data);
      if (response.data.length > 0) {
        setHelpCenters(response.data);
        setNoResults(false);
      } else {
        setHelpCenters([]);
        setNoResults(true);
      }
    } catch (error) {
      console.error('Error fetching help centers:', error);
    }
  };

  const getBoundingBox = (lat, lon, radiusInKm) => {
    const latChange = radiusInKm / 110.574;
    const lonChange = Math.abs(radiusInKm / (111.320 * Math.cos(lat * (Math.PI / 180))));
    return `${lon - lonChange},${lat - latChange},${lon + lonChange},${lat + latChange}`;
  };

  const moveMapToLocation = (lat, lon) => {
    if (mapRef.current) {
      mapRef.current.setView([lat, lon], 12);
    }
  };

  const handleResultClick = (lat, lon) => {
    moveMapToLocation(lat, lon);
  };

  return (
    <div className="find-help-container">
      <h2>Find a Help Center</h2>
      <form onSubmit={handleSearchSubmit} className="search-form">
        <input
          type="text"
          placeholder="Search anything..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="search-input"
        />
        <select value={radius} onChange={handleRadiusChange} className="radius-select">
          <option value="5">5 miles</option>
          <option value="10">10 miles</option>
          <option value="25">25 miles</option>
          <option value="100">100 miles</option>
          <option value="500">500 miles</option>
          <option value="1000">1000 miles</option>
        </select>
        <button type="submit" className="search-button">Search</button>
      </form>
      <div className="map-container">
        <MapContainer center={mapCenter} zoom={zoomLevel} style={{ height: '400px', width: '100%' }} ref={mapRef}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {helpCenters.map((center, idx) => (
            <Marker key={idx} position={[parseFloat(center.lat), parseFloat(center.lon)]}>
              <Popup>
                <strong>{center.display_name}</strong>
                <br />
                Address: {center.address?.road}, {center.address?.city}, {center.address?.state}, {center.address?.postcode}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
      <div className="help-centers-list">
        <h3>Nearby Help Centers</h3>
        {noResults ? (
          <p>No nearby centers found within {radius} miles.</p>
        ) : (
          <div className="results-container">
            {helpCenters.map((center, idx) => (
              <div key={idx} className="result-item" onClick={() => handleResultClick(center.lat, center.lon)}>
                <p><strong>{center.display_name}</strong></p>
                <p>Address: {center.address?.road}, {center.address?.city}, {center.address?.state}, {center.address?.postcode}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FindHelp;

