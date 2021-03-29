import React from 'react';
import { useRef, useEffect } from 'react';
// @ts-ignore
import mapboxgl from '!mapbox-gl';
import '../../../../assets/stylesheets/components/map.css';

interface Props {
  token: string;
}

const Map: React.FC<Props> = ({ token }) => {
  const mapRef = useRef();
  useEffect(() => {
    if (mapRef.current) {
      mapboxgl.accessToken = process.env.MAPBOX_KEY;
      const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [139.6503, 35.6762],
        zoom: 9
      });
    }
  }, [mapRef]);

  return (
    <div>
      <div id="map" className="map" ref={mapRef}></div>
    </div>
  );
};

export default Map;
