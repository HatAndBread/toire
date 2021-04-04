import React from 'react';
import { useRef, useEffect, useContext, useState } from 'react';
import { Context } from '../../pages/home';
import mapboxgl from '!mapbox-gl';
import manekiNeko from '../../../../assets/images/maneki-neko.png';
import toiletIcon from '../../../../assets/images/toilet64.png';
import '../../../../assets/stylesheets/components/map.css';
import makeRequest from '../form/makeRequest';

const Map = ({ token }) => {
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
    if (mapRef.current && userMarkerRef.current) {
      mapboxgl.accessToken = process.env.MAPBOX_KEY;
      const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [userLongitude ? userLongitude : 139.6503, userLatitude ? userLatitude : 35.6762],
        zoom: userLatitude && userLongitude ? 15 : 10
      });
      setMainMap(map);
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
      if (userLatitude && userLongitude) {
        new mapboxgl.Marker(userMarkerRef.current).setLngLat([userLongitude, userLatitude]).addTo(map);
        if (localToilets) {
          const refsArray = [];
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
      }
    }
  }, [mapRef, userLatitude, userLongitude, localToilets, userMarkerRef, setToiletMarkers]);

  useEffect(() => {
    console.log(toiletMarkers);
    toiletMarkers.forEach((toiletMarker) => {
      if (toiletMarker.ref.current) {
        const toiletData = JSON.parse(toiletMarker.ref.current.dataset.toilet);
        new mapboxgl.Marker(toiletMarker.ref.current)
          .setLngLat([toiletData.longitude, toiletData.latitude])
          .addTo(mainMap);
      }
    });
  }, [toiletMarkers]);

  return (
    <div>
      <div className="marker" ref={userMarkerRef} style={{ backgroundImage: `url('${manekiNeko}')` }} />
      {toiletMarkers.map((toiletMarker) => toiletMarker)}
      <div id="map" className="map" ref={mapRef}></div>
    </div>
  );
};

export default Map;
