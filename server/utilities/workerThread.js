/* eslint-disable no-param-reassign */
import { workerData, parentPort } from 'worker_threads';

import nodeFetch from 'node-fetch';
import * as RateLimiter from 'graphql-limiter';

// eslint-disable-next-line import/extensions
import RedisMock from './RedisMock.js';

const redis = new RedisMock();

// worker threads can share memory via transfer of Array Buffer instances
const { projectId, config, authorization } = workerData;

async function getProjectQueries(id) {
    const query = `query {project(id: "${id}") {
        queries {
            id
            userID
            projectID
            requestUuid
            number
            complexity
            depth
            tokens
            success
            timestamp
            loggedOn
            latency
        }}}`;
    return nodeFetch(`http://localhost:${process.env.PORT}/gql/?query=${query}`, {
        headers: {
            authorization,
        },
    }).then((res) => res.json());
}

getProjectQueries(projectId).then(async (queries) => {
    const data = queries?.data?.project?.queries;
    if (!data) {
        // TODO: Send a 404 response
        throw new Error('No query data for this project');
    }

    data.sort((a, b) => a.timestamp - b.timestamp);
    const limiter = RateLimiter.rateLimiter(
        {
            type: config.type,
            capacity: config.options.capacity,
            windowSize: config.options.windowSize,
            refillRate: config.options.refillRate,
        },
        redis
    );

    for (let i = 0; i < data.length; i += 1) {
        const query = data[i];
        // FIXME: Use a for loop here since requests need to be handled sequentially by user
        // only the middleware is throttled in this way.
        // eslint-disable-next-line no-await-in-loop
        const response = await limiter.processRequest(
            query.requestUuid,
            query.timestamp,
            query.complexity
        );
        // mutate the original array for the sake of efficiency
        query.success = response.success;
        query.tokens = response.tokens;
    }

    parentPort.postMessage(data);
    parentPort.postMessage('DONE');
});
