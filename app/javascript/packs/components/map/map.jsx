import React from 'react';
import { useRef, useEffect, useContext, useState } from 'react';
import { Context } from '../../pages/home';
import mapboxgl from '!mapbox-gl';
import manekiNeko from '../../../../assets/images/maneki-neko.png';
import '../../../../assets/stylesheets/components/map.css';
import makeRequest from '../form/makeRequest';
import ToiletMarker from './toiletMarker';

const Map = () => {
  const mapContainer = useRef();
  const userMarkerRef = useRef();
  const context = useContext(Context);
  const userLatitude = context.userLatitude;
  const userLongitude = context.userLongitude;
  const localToilets = context.localToilets;
  const [mainMap, setMainMap] = useState(null);

  useEffect(() => {
    mapboxgl.accessToken = process.env.MAPBOX_KEY;
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [139.6503, 35.6762],
      zoom: 10
    });

    map.on('click', (e) => {
      if (e.originalEvent.target.className === 'mapboxgl-canvas') {
        context.setUserLatitude(e.lngLat.lat);
        context.setUserLongitude(e.lngLat.lng);
        makeRequest(
          { latitude: e.lngLat.lat, longitude: e.lngLat.lng },
          '/toilets_near_me',
          'POST',
          (error) => {
            console.log(error);
          },
          (data) => {
            console.log(data);
            context.setLocalToilets(data);
          }
        );
      }
    });

    setMainMap(map);
  }, [context.setUserLatitude, context.setUserLongitude, context.setLocalToilets, setMainMap]);

  useEffect(() => {
    if (userLatitude && userLongitude && mainMap && localToilets) {
      mainMap.flyTo({
        center: [userLongitude, userLatitude],
        zoom: 15,
        essential: true
      });
      new mapboxgl.Marker(userMarkerRef.current).setLngLat([userLongitude, userLatitude]).addTo(mainMap);
    }
  }, [
    userLatitude,
    userLongitude,
    localToilets,
    userMarkerRef,
    mainMap,
    context.setCurrentToilet,
    context.setOpenModal
  ]);

  return (
    <div>
      <div className="marker" ref={userMarkerRef} style={{ backgroundImage: `url('${manekiNeko}')` }} />
      <div className="map-container" ref={mapContainer} id="map" />
      {localToilets &&
        localToilets.toilets.map((toilet, index) => <ToiletMarker toilet={toilet} mainMap={mainMap} key={index} />)}
    </div>
  );
};

export default Map;
