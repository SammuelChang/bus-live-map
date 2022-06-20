const api = {
  host: 'https://tdx.transportdata.tw',
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

    return fetch(`${this.host}/auth/realms/TDXConnect/protocol/openid-connect/token`, requestOptions)
      .then((response) => response.json())
      .then((result) => result.access_token)
      .catch((error) => console.log('error', error));
  },
  getAllShpae(city, token, bus = '') {
    const busCode = bus ? `/${bus}` : '';
    const myHeaders = new Headers();
    myHeaders.append('accept', 'application/json');
    myHeaders.append('Authorization', `Bearer ${token}`);

    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    return fetch(`${this.host}/api/basic/v2/Bus/Shape/City/${city}${busCode}?%24orderby=RouteID&%24top=100&%24format=JSON`, requestOptions)
      .then((response) => response.json())
      .then((result) => result)
      .catch((error) => console.log('error', error));
  },

  getAllRealTimeByFrequency(city, token, bus = '') {
    const busCode = bus ? `/${bus}` : '';
    const myHeaders = new Headers();
    myHeaders.append('accept', 'application/json');
    myHeaders.append('Authorization', `Bearer ${token}`);

    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };
    return fetch(`${this.host}/api/basic/v2/Bus/RealTimeByFrequency/City/${city}${busCode}?%24orderby=RouteID&%24top=100&%24format=JSON`, requestOptions)
      .then((response) => response.json())
      .then((result) => result)
      .catch((error) => console.log('error', error));
  },

  getAllStation(city, token) {
    const myHeaders = new Headers();
    myHeaders.append('accept', 'application/json');
    myHeaders.append('Authorization', `Bearer ${token}`);

    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    return fetch(`${this.host}/api/basic/v2/Bus/Station/City/${city}?%24orderby=StationID&%24top=100&%24format=JSON`, requestOptions)
      .then((response) => response.json())
      .then((result) => result)
      .catch((error) => console.log('error', error));
  },

  getAllStationEstimatedTimeOfArrival(city, token, bus = '') {
    const busCode = bus ? `/${bus}` : '';
    const myHeaders = new Headers();
    myHeaders.append('accept', 'application/json');
    myHeaders.append('Authorization', `Bearer ${token}`);

    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    return fetch(`${this.host}/api/basic/v2/Bus/EstimatedTimeOfArrival/City/${city}${busCode}?%24top=100&%24format=JSON`, requestOptions)
      .then((response) => response.json())
      .then((result) => result)
      .catch((error) => console.log('error', error));
  },
  getAllStationStopOfRoute(city, token, bus = '') {
    const busCode = bus ? `/${bus}` : '';
    const myHeaders = new Headers();
    myHeaders.append('accept', 'application/json');
    myHeaders.append('Authorization', `Bearer ${token}`);

    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    return fetch(`${this.host}/api/basic/v2/Bus/StopOfRoute/City/${city}${busCode}?%24top=100&%24format=JSON`, requestOptions)
      .then((response) => response.json())
      .then((result) => result)
      .catch((error) => console.log('error', error));
  },
};

export default api;
