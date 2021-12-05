/* eslint-disable default-case */
import urls from './apiUrl';
import * as cloneDeep from 'clone-deep';
import { database } from './mockDatabase';

export const post = makeMockApiClientFn('post', (rawUrl, data) => {
  const url = new URL(rawUrl);

  const pathSegments = url.pathname.split('/');

  const lastSegment = pathSegments[pathSegments.length - 1];

  if (pathSegments[pathSegments.length - 2] === 'reports') {
    const id = lastSegment;

    const index = database.reports.findIndex((record) => record.id === id);

    if (index < 0) {
      return err(404, `Report ${id} was not found`);
    }

    database.reports.splice(index, 1);

    return ok({});
  }
});

export const get = makeMockApiClientFn('get', (url) => {
  switch (url) {
    case urls.reports:
      return ok(database.reports);
    case urls.breeds:
      return ok(database.breeds);
  }
});

const RESPONSE_LATENCY_MS = 500;

function simulateLatency() {
  return new Promise((resolve) => setTimeout(resolve, RESPONSE_LATENCY_MS));
}

function makeMockApiClientFn(method, imp) {
  return async (url, ...args) => {
    await simulateLatency();

    // Response make contain references to in-memory `database`, so cloning it
    // to prevent unintentional modifications
    const response = cloneDeep(await imp(url, ...args));

    console.debug('MOCK', { method, args, response });

    if (response === undefined) {
      throw new Error(`URL is not supported by mocks: ${method}: \`${url}\``);
    }

    return response;
  };
}

function ok(response) {
  return {
    status: 200,
    response,
  };
}

function err(status, message) {
  return {
    status,
    response: { message },
  };
}
