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
  const mapRef = useRef();
  const userMarkerRef = useRef();
  const context = useContext(Context);
  const userLatitude = context.userLatitude;
  const userLongitude = context.userLongitude;
  const localToilets = context.localToilets;
  const toiletMarkers = context.toiletMarkers;
  const setToiletMarkers = context.setToiletMarkers;
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

      refsArray = [];
      localToilets.toilets.forEach((toilet, index) => {
        const myRef = React.createRef();
        const handleClick = (e) => {
          context.setCurrentToilet(JSON.parse(e.target.dataset.toilet));
          context.setOpenModal('toilet-info');
        };
        refsArray.push(
          <div
            className="marker"
            ref={myRef}
            key={index}
            onClick={handleClick}
            data-toilet={JSON.stringify(toilet)}
            style={{ backgroundImage: `url('${toiletIcon}')` }}
          />
        );
      });
      setToiletMarkers(refsArray);
    }
  }, [
    userLatitude,
    userLongitude,
    localToilets,
    userMarkerRef,
    mainMap,
    context.setCurrentToilet,
    context.setOpenModal,
    setToiletMarkers
  ]);

  useEffect(() => {
    console.log(toiletMarkers);
    const toiletGarbage = [];
    if (mainMap) {
      toiletMarkers.forEach((toiletMarker) => {
        if (toiletMarker.ref.current) {
          const toiletData = JSON.parse(toiletMarker.ref.current.dataset.toilet);
          const individualToilet = new mapboxgl.Marker(toiletMarker.ref.current)
            .setLngLat([toiletData.longitude, toiletData.latitude])
            .addTo(mainMap);
          toiletGarbage.push(individualToilet);
        }
      });
    }

    // return () => {
    //   toiletGarbage.forEach((gomi) => {
    //     console.log(gomi);
    //     gomi.remove();
    //   });
    // };
  }, [toiletMarkers, mainMap]);

  return (
    <div>
      <div className="marker" ref={userMarkerRef} style={{ backgroundImage: `url('${manekiNeko}')` }} />
      <div className="map-container" ref={mapContainer} id="map" />
      {toiletMarkers.map((toiletMarker) => toiletMarker)}
    </div>
  );
};

export default Map;
