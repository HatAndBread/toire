import React from 'react';
import { useRef, useEffect, useContext } from 'react';
import { Context } from '../../pages/home';
import mapboxgl from '!mapbox-gl';
import manekiNeko from '../../../../assets/images/maneki-neko.png';
import toiletIcon from '../../../../assets/images/toilet64.png';
import '../../../../assets/stylesheets/components/map.css';

const Map = ({ token }) => {
  const mapRef = useRef();
  const context = useContext(Context);
  const userLatitude = context.userLatitude;
  const userLongitude = context.userLongitude;
  const localToilets = context.localToilets;

  useEffect(() => {
    const toiletMarkers = [];
    const userMarker = document.createElement('div');
    userMarker.className = 'marker';
    userMarker.style.backgroundImage = `url('${manekiNeko}')`;
    if (mapRef.current) {
      mapboxgl.accessToken = process.env.MAPBOX_KEY;
      const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [userLongitude ? userLongitude : 139.6503, userLatitude ? userLatitude : 35.6762],
        zoom: userLatitude && userLongitude ? 15 : 10
      });
      if (userLatitude && userLongitude) {
        new mapboxgl.Marker(userMarker).setLngLat([userLongitude, userLatitude]).addTo(map);
        if (localToilets) {
          localToilets.toilets.forEach((toilet) => {
            const toiletMarker = document.createElement('div');
            toiletMarker.className = 'marker';
            toiletMarker.style.backgroundImage = `url('${toiletIcon}')`;
            toiletMarkers.push(toiletMarker);
            new mapboxgl.Marker(toiletMarker).setLngLat([toilet.longitude, toilet.latitude]).addTo(map);
          });
        }
      }
    }
    return () => {
      userMarker.remove();
      toiletMarkers.forEach((toilet) => {
        toilet.remove();
      });
    };
  }, [mapRef, userLatitude, userLongitude, localToilets]);

  return (
    <div>
      <div id="map" className="map" ref={mapRef}></div>
    </div>
  );
};

export default Map;
