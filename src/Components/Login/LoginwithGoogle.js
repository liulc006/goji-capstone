import React, { useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { loginwithGoogle } from '../../store';
import { useNavigate } from 'react-router-dom';


const LoginwithGoogle = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleCallbackResponse = (response) => {
    const info = jwtDecode(response.credential);
    const userinfo = {
      email: info.email,
      firstname: info.given_name,
      lastname: info.family_name,
      password: info.sub,
    };
    dispatch(loginwithGoogle(userinfo, navigate));
  };

  useEffect(() => {
    /* golabal google */
    google.accounts.id.initialize({
      client_id: '130142692712-dk8nq3p24qsmn72o457ncve4s12fjsd5.apps.googleusercontent.com',
      callback: handleCallbackResponse,
    });

    google.accounts.id.renderButton(document.getElementById('signInDiv'), {
      theme: 'outline',
      size: 'large',
    });
  }, []);
  return <div id="signInDiv"></div>;
};

export default LoginwithGoogle;

