import * as mocks from './mocks';

global.production = true;

async function postData(url = '', data = {}) {
  if (!global.production) {
    return mocks.post(url, data);
  }

  const userAuthToken = localStorage.getItem('userAuthToken');
  const token = sessionStorage.getItem('userAuthToken');

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userAuthToken || token}`,
    },
    body: JSON.stringify(data),
  });
  const dataRes = await response.json();
  return {
    status: response.status,
    response: dataRes,
  };
}

async function putData(url = '', data = {}) {
  // if (!global.production) {
  //   return mocks.post(url, data);
  // }

  const userAuthToken = localStorage.getItem('userAuthToken');
  const token = sessionStorage.getItem('userAuthToken');

  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userAuthToken || token}`,
    },
    body: JSON.stringify(data),
  });
  const dataRes = await response.json();
  return {
    status: response.status,
    response: dataRes,
  };
}

async function getData(url = '') {
  if (!global.production) {
    return mocks.get(url);
  }

  const userAuthToken = localStorage.getItem('userAuthToken');
  const token = sessionStorage.getItem('userAuthToken');

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${userAuthToken || token}`,
    },
  });

  const dataRes = await response.json();

  return {
    status: response.status,
    response: dataRes,
  };
}

async function deleteData(url = '') {
  if (!global.production) {
    return mocks.get(url);
  }

  const userAuthToken = localStorage.getItem('userAuthToken');
  const token = sessionStorage.getItem('userAuthToken');

  const response = await fetch(url, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${userAuthToken || token}`,
    },
  });

  const dataRes = await response.json();

  return {
    status: response.status,
    response: dataRes,
  };
}

export const api = {
  get: getData,
  post: postData,
  delete: deleteData,
  put: putData,
};

export default api;
