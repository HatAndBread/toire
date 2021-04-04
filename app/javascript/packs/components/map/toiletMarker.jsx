import React from 'react';
import mapboxgl from '!mapbox-gl';
import { useContext, useRef, useEffect } from 'react';
import { Context } from '../../pages/home';
import toiletIcon from '../../../../assets/images/toilet64.png';

const ToiletMarker = ({ mainMap, toilet }) => {
  const ref = useRef();
  const context = useContext(Context);

  useEffect(() => {
    new mapboxgl.Marker(ref.current).setLngLat([toilet.longitude, toilet.latitude]).addTo(mainMap);
  }, [toilet]);
  const handleClick = () => {
    context.setCurrentToilet(toilet);
    context.setOpenModal('toilet-info');
  };
  return <div className="marker" ref={ref} onClick={handleClick} style={{ backgroundImage: `url('${toiletIcon}')` }} />;
};

export default ToiletMarker;
