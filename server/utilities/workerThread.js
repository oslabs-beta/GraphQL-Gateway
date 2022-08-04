/* eslint-disable no-param-reassign */
import { workerData, parentPort, SHARE_ENV } from 'worker_threads';

import nodeFetch from 'node-fetch';
import * as RateLimiter from 'graphql-limiter';

// eslint-disable-next-line import/extensions
import RedisMock from './RedisMock.js';

const redis = new RedisMock();

// worker threads can share memory via transfer of Array Buffer instances

async function getProjectQueries(projectId) {
    const query = `query {project(id: "${projectId}") {
        queries {
            id
            projectID
            number
            complexity
            depth
            tokens
            success
            timestamp
            loggedOn
            latency
        }}}`;
    return nodeFetch(`http://localhost:${process.env.PORT}/gql/?query=${query}`).then((res) =>
        res.json()
    );
}

const { projectId, config } = workerData;

getProjectQueries(projectId).then(async (queries) => {
    const data = queries?.data?.project?.queries;
    if (!data) {
        // TODO: Send a 404 response
        throw new Error('No query data for this project');
    }

    data.sort((a, b) => a.timestamp - b.timestamp);
    const limiter = RateLimiter.rateLimiter(config, redis);

    for (let i = 0; i < data.length; i += 1) {
        const query = data[i];
        // FIXME: Use a for loop here since requests need to be handled sequentially by user
        // only the middleware is throttled in this way.
        // eslint-disable-next-line no-await-in-loop
        const response = await limiter.processRequest(
            query.id, // FIXME: This needs to be a user's uuid
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
