/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
import { Router, RouterRouteHandler } from '../../../../../../server/lib/create_router';

interface ReqPayload {
  indices: string[];
}

const handler: RouterRouteHandler = async (request, callWithRequest, h) => {
  const payload = request.payload as ReqPayload;
  const { indices = [] } = payload;

  const params = {
    expandWildcards: 'none',
    format: 'json',
    index: indices,
  };

  await callWithRequest('indices.clearCache', params);
  return h.response();
};

export function registerClearCacheRoute(router: Router) {
  router.post('indices/clear_cache', handler);
}
