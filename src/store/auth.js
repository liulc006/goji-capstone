import axios from 'axios';
const auth = (state = { }, action)=> {
  if(action.type === 'SET_AUTH'){
    return action.auth;
  }
  return state;
};

export const logout = ()=> {
  window.localStorage.removeItem('token');
  return { type: 'SET_AUTH', auth: {} };
};


export const loginWithToken = ()=> { //use toke to login
  return async(dispatch)=> {
    const token = window.localStorage.getItem('token'); //first get the token from localStorage
    if(token){                                          //if ther is token
      const response = await axios.get('/api/auth', {   //get the user from server with token
        headers: {
          authorization: token
        }
      });
      dispatch({ type: 'SET_AUTH', auth: response.data }); //set the user to the store with name 'auth'
    }
  };
};

export const updateAuth = (auth)=> {
  return async(dispatch)=> {
    const token = window.localStorage.getItem('token');
    const response = await axios.put('/api/auth', auth, {
      headers: {
        authorization: token
      }
    });
    dispatch({ type: 'SET_AUTH', auth: response.data });
  };
};


export const attemptLogin = (credentials)=> {
  return async(dispatch)=> {
    const response = await axios.post('/api/auth', credentials); //try to get the data (token) from ther server
    window.localStorage.setItem('token', response.data); //after get the token, store it in localStorage
    dispatch(loginWithToken()); //then use this token to login 
  };
};

export const register = (credentials)=> {
  return async(dispatch)=> {
    const response = await axios.post('/api/auth/register', credentials);
    window.localStorage.setItem('token', response.data);
    dispatch(loginWithToken());
  };
};

export default auth;
