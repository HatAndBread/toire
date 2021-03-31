import React from 'react';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

const requestTypes = ['PUT', 'POST', 'PATCH', 'DELETE', 'GET'];

const RailsForm = ({ requestType, requestUrl, formContent, onSubmit, onError }) => {
  const [requestBody, setRequestBody] = useState({});
  const makeRequest = async () => {
    if (!Object.keys(requestBody).length) return;
    const res = await fetch(requestUrl, {
      method: requestType,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'X-CSRF-Token': document.getElementsByName('csrf-token')[0].content
      },
      credentials: 'same-origin',
      body: JSON.stringify(requestBody)
    });
    const data = await res.json();
    console.log(data);
    if (!data || data.errors || data.error) {
      if (typeof onError === 'function') {
        onError(data.errors ? data.errors : 'Something went wrong');
        return;
      } else {
        return console.error('Error in ReactForm Component. No error callback given.');
      }
    }
    if (typeof onSubmit === 'function') onSubmit();
  };
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
    copy[e.target.name] = e.target.value;
    setRequestBody(copy);
  };

  useEffect(() => {
    console.log(requestBody);
  }, [requestBody]);

  return (
    <form onSubmit={handleSubmit} onChange={handleFormChange} style={{ display: 'flex', flexDirection: 'column' }}>
      {formContent.map((formInput, index) => (
        <label key={index} htmlFor={formInput.id} style={{ display: 'flex', flexDirection: 'column' }}>
          {formInput.label}
          <input
            type={formInput.inputType}
            name={formInput.name}
            id={formInput.id}
            autoFocus={formInput.autoFocus ? true : false}
          ></input>
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
        'week'
      ]),
      name: PropTypes.string,
      id: PropTypes.string,
      label: PropTypes.string,
      autoFocus: PropTypes.bool
    })
  ),
  onSubmit: PropTypes.func,
  onError: PropTypes.func
};

export default RailsForm;
