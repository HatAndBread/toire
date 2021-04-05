import React from 'react';
import mapboxgl from '!mapbox-gl';
import { useContext, useRef, useEffect } from 'react';
import { Context } from '../../pages/home';
import toiletIcon from '../../../../assets/images/toilet64.png';

const ToiletMarker = ({ mainMap, toilet }) => {
  const ref = useRef();
  const context = useContext(Context);

  useEffect(() => {
    const handleClick = () => {
      context.setCurrentToilet(toilet);
      context.setOpenModal('toilet-info');
    };
    const div = document.createElement('div');
    div.className = 'marker';
    div.style.backgroundImage = `url('${toiletIcon}')`;
    div.addEventListener('click', handleClick);
    new mapboxgl.Marker(div).setLngLat([toilet.longitude, toilet.latitude]).addTo(mainMap);

    return () => {
      div.removeEventListener('click', handleClick);
      div.remove();
    };
  }, [toilet]);
  return null;
};

export default ToiletMarker;
