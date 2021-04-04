import React from 'react';
import { useRef, useEffect, useContext, useState } from 'react';
import { Context } from '../../pages/home';
import mapboxgl from '!mapbox-gl';
import manekiNeko from '../../../../assets/images/maneki-neko.png';
import toiletIcon from '../../../../assets/images/toilet64.png';
import '../../../../assets/stylesheets/components/map.css';
import makeRequest from '../form/makeRequest';

const Map = () => {
  const mapContainer = useRef();
  const userMarkerRef = useRef();
  const context = useContext(Context);
  const userLatitude = context.userLatitude;
  const userLongitude = context.userLongitude;
  const localToilets = context.localToilets;
  const [mainMap, setMainMap] = useState(null);
  const toiletMarkerRefs = localToilets ? localToilets.toilets.map(() => React.createRef()) : null;

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
        console.log(e.lngLat.lng, e.lngLat.lat);
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

    return () => map.remove();
  }, [context.setUserLatitude, context.setUserLongitude, context.setLocalToilets, setMainMap]);

  useEffect(() => {
    let userMarker;
    let refsArray;
    if (userLatitude && userLongitude && mainMap && localToilets) {
      mainMap.flyTo({
        center: [userLongitude, userLatitude],
        zoom: 15,
        essential: true
      });
      userMarker = new mapboxgl.Marker(userMarkerRef.current).setLngLat([userLongitude, userLatitude]).addTo(mainMap);

      toiletMarkerRefs.forEach((ref, index) => {
        new mapboxgl.Marker(ref.current)
          .setLngLat([localToilets.toilets[index].longitude, localToilets.toilets[index].latitude])
          .addTo(mainMap);
      });
    }
  }, [
    userLatitude,
    userLongitude,
    localToilets,
    userMarkerRef,
    mainMap,
    context.setCurrentToilet,
    context.setOpenModal,
    toiletMarkerRefs
  ]);

  return (
    <div>
      <div className="marker" ref={userMarkerRef} style={{ backgroundImage: `url('${manekiNeko}')` }} />
      <div className="map-container" ref={mapContainer} id="map" />
      {toiletMarkerRefs &&
        toiletMarkerRefs.map((ref, index) => {
          const handleClick = (e) => {
            context.setCurrentToilet(localToilets[parseInt(e.target.dataset.toilet)]);
            context.setOpenModal('toilet-info');
          };
          return (
            <div
              className="marker"
              ref={ref}
              key={index}
              onClick={handleClick}
              data-toilet={index}
              style={{ backgroundImage: `url('${toiletIcon}')` }}
            />
          );
        })}
    </div>
  );
};

export default Map;
