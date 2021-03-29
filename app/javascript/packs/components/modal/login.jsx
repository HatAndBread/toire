import React from 'react';
import RailsForm from '../form/railsForm';

const formContent = [
  { inputType: 'text', name: 'email', id: 'email', label: 'Email: ' },
  { inputType: 'password', name: 'password', id: 'password', label: 'Password: ' }
];

const LogIn = (
  <div className="">
    <div className="">Log In!</div>
    <RailsForm
      formContent={formContent}
      requestUrl={'/users/sign_in'}
      requestType={'POST'}
      onError={(error) => {
        alert(error);
      }}
    />
  </div>
);

export default LogIn;
