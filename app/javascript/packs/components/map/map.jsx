import React from 'react';
import { useRef, useEffect, useContext, useState } from 'react';
import { Context } from '../../pages/home';
import mapboxgl from '!mapbox-gl';
import manekiNeko from '../../../../assets/images/maneki-neko.png';
import '../../../../assets/stylesheets/components/map.css';
import makeRequest from '../form/makeRequest';
import ToiletMarker from './toiletMarker';
import Nav from '../nav/nav';

const Map = () => {
  const mapContainer = useRef();
  const userMarkerRef = useRef();
  const context = useContext(Context);
  const userLatitude = context.userLatitude;
  const userLongitude = context.userLongitude;
  const localToilets = context.localToilets;
  const [mainMap, setMainMap] = useState(null);
  const [userMarkerHidden, setUserMarkerHidden] = useState(true);
  const [showHintOne, setShowHintOne] = useState(true);
  const [showHintTwo, setShowHintTwo] = useState(false);

  useEffect(() => {
    !showHintOne && setShowHintTwo(true);
  }, [showHintOne, setShowHintTwo]);

  useEffect(() => {
    mapboxgl.accessToken = process.env.MAPBOX_KEY;
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [139.7528, 35.6852],
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
      setShowHintOne(false);
      mapContainer.current.scrollIntoView();
      userMarkerHidden && setUserMarkerHidden(false);
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
    context.setOpenModal,
    setUserMarkerHidden
  ]);

  return (
    <div className="map-wrapper">
      <div className="find-me-container">
        {showHintOne && <p>Hint: Click anywhere in Tokyo to find the closest toilets ✨</p>}
        {showHintTwo && <p>Hint: Click on a toilet to see its reviews ✨</p>}
        <Nav />
      </div>
      <div className="map-container" ref={mapContainer} id="map"></div>
      {localToilets &&
        localToilets.toilets.map((toilet, index) => (
          <ToiletMarker toilet={toilet} mainMap={mainMap} key={index} setShowHintTwo={setShowHintTwo} />
        ))}
      <div
        className="marker"
        ref={userMarkerRef}
        style={{ backgroundImage: `url('${manekiNeko}')` }}
        hidden={userMarkerHidden}
      />
    </div>
  );
};

export default Map;
