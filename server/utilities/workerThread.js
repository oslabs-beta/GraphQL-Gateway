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

// const { projectId, config } = workerData;
const { projectId } = workerData;

// TODO: Configure the rate limiter
getProjectQueries(projectId).then((queries) => {
    const data = queries?.data?.project?.queries;
    if (!data) {
        // TODO: Send a 404 response
        throw new Error('No query data for this project');
    }

    data.sort((a, b) => a.timestamp - b.timestamp);

    const limiter = RateLimiter.rateLimiter(
        {
            type: 'TOKEN_BUCKET',
            option: {
                refillRate: 10,
                capacity: 100,
            },
        },
        redis
    );
    data.forEach((query) => {
        // TODO: Uncomment these lines once limiter is imported
        const response = limiter.processRequest(query.timestamp, query.complexity);
        // mutate the original array for the sake of efficiency
        query.success = response.success;
        query.tokens = response.tokens;
        return query;
    });

    parentPort.postMessage(data);
    parentPort.postMessage('DONE');
});
