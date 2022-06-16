const api = {
  getToken() {
    const myHeaders = new Headers();
    myHeaders.append('content-type', 'application/x-www-form-urlencoded');

    const urlencoded = new URLSearchParams();
    urlencoded.append('grant_type', 'client_credentials');
    urlencoded.append('client_id', process.env.REACT_APP_TDX_CLIENT_ID);
    urlencoded.append('client_secret', process.env.REACT_APP_TDX_CLIENT_SECRET);

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: urlencoded,
      redirect: 'follow',
    };

    return fetch('https://tdx.transportdata.tw/auth/realms/TDXConnect/protocol/openid-connect/token', requestOptions)
      .then((response) => response.json())
      .then((result) => result.access_token)
      .catch((error) => console.log('error', error));
  },
  getShpae(city, token) {
    const myHeaders = new Headers();
    myHeaders.append('accept', 'application/json');
    myHeaders.append('Authorization', `Bearer ${token}`);

    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    return fetch(`https://tdx.transportdata.tw/api/basic/v2/Bus/Shape/City/${city}?%24top=30&%24format=JSON`, requestOptions)
      .then((response) => response.json())
      .then((result) => result)
      .catch((error) => console.log('error', error));
  },
  getRealTimeByFrequency(city, token) {
    const myHeaders = new Headers();
    myHeaders.append('accept', 'application/json');
    myHeaders.append('Authorization', `Bearer ${token}`);

    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    return fetch(`https://tdx.transportdata.tw/api/basic/v2/Bus/RealTimeByFrequency/City/${city}?%24top=30&%24format=JSON`, requestOptions)
      .then((response) => response.json())
      .then((result) => result)
      .catch((error) => console.log('error', error));
  },
  getStation(city, token) {
    const myHeaders = new Headers();
    myHeaders.append('accept', 'application/json');
    myHeaders.append('Authorization', `Bearer ${token}`);

    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    return fetch(`https://tdx.transportdata.tw/api/basic/v2/Bus/RealTimeByFrequency/City/${city}?%24top=30&%24format=JSON`, requestOptions)
      .then((response) => response.json())
      .then((result) => result)
      .catch((error) => console.log('error', error));
  },
};

export default api;
