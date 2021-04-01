import React from 'react';
import PropTypes from 'prop-types';
import Stars from './stars';
import { useState, useEffect } from 'react';
import makeRequest from './makeRequest';

const requestTypes = ['PUT', 'POST', 'PATCH', 'DELETE', 'GET'];

const RailsForm = ({ requestType, requestUrl, formContent, onSubmit, onError }) => {
  const [requestBody, setRequestBody] = useState({});
  const get = async () => {
    if (!requestBody) return;
    const res = await fetch(requestUrl);
    if (typeof onSubmit === 'function') onSubmit();
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!requestType) return;
    if (requestType === 'GET') {
      get();
      return;
    } else if (requestTypes.includes(requestType)) {
      makeRequest();
      return;
    }
  };
  const handleFormChange = (e) => {
    const copy = { ...requestBody };
    if (e.target.type === 'checkbox') {
      copy[e.target.name] = e.target.checked;
    } else {
      copy[e.target.name] = e.target.value;
    }
    setRequestBody(copy);
  };

  useEffect(() => {
    console.log(requestBody);
  }, [requestBody]);

  return (
    <form onSubmit={handleSubmit} onChange={handleFormChange} style={{ display: 'flex', flexDirection: 'column' }}>
      {formContent.map((formInput, index) => (
        <label key={index} htmlFor={formInput.id} style={{ display: 'flex', flexDirection: 'column' }}>
          {formInput.label ? formInput.label : ''}
          {formInput.inputType === 'stars' ? (
            <Stars name={formInput.name} onChange={handleFormChange} />
          ) : (
            <input
              type={formInput.inputType ? formInput.inputType : ''}
              name={formInput.name ? formInput.name : ''}
              id={formInput.id ? formInput.id : ''}
              autoFocus={formInput.autoFocus ? true : false}
              min={formInput.min || formInput.min === 0 ? formInput.min : ''}
              max={formInput.max || formInput.max === 0 ? formInput.max : ''}
            ></input>
          )}
          <br></br>
        </label>
      ))}
      <button type="submit">Submit</button>
    </form>
  );
};

RailsForm.propTypes = {
  requestType: PropTypes.oneOf(['POST', 'GET', 'PATCH', 'PUT', 'DELETE']),
  requestUrl: PropTypes.string,
  formContent: PropTypes.arrayOf(
    PropTypes.exact({
      inputType: PropTypes.oneOf([
        'checkbox',
        'color',
        'date',
        'datetime-local',
        'email',
        'file',
        'hidden',
        'image',
        'month',
        'number',
        'password',
        'radio',
        'range',
        'reset',
        'search',
        'submit',
        'tel',
        'text',
        'time',
        'url',
        'week',
        'stars'
      ]),
      name: PropTypes.string,
      id: PropTypes.string,
      label: PropTypes.string,
      autoFocus: PropTypes.bool,
      min: PropTypes.number,
      max: PropTypes.number
    })
  ),
  onSubmit: PropTypes.func,
  onError: PropTypes.func
};

export default RailsForm;
