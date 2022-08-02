import path from 'path';
import { Worker, isMainThread, parentPort } from 'worker_threads';
import { Request, Response, NextFunction } from 'express';
import { fileURLToPath } from 'url';
// import types as well
// TODO: Recalcualte data for current projects.
// import rate limiter
// connect to mock redis store
// configure the selected rate limiter
// feed all of the data into the rate limiter
// update quey data in the view

/**
 * A Rate Limiter class that can be used to re-analyze query data with updated rate limiter settings
 *
 * constructor - creates a new webworkder and exposes the "messaging" api
 *
 * processRequests - takes a query array and outputs an updated query array with updated rate limiter data
 */

// More on workers https://stackoverflow.com/questions/19152772/how-to-pass-large-data-to-web-workers

class RateLimiterWorker {
    private worker: Worker;

    constructor(projectId: string, config: RateLimiterConfig) {
        // TODO: Validate the config

        const filename = fileURLToPath(import.meta.url);

        // FIXME: Establish a worker pool. Spawning a worker is expensive
        this.worker = new Worker(`${path.dirname(filename)}/workerThread.cjs`, {
            workerData: {
                projectId,
                config,
            },
        });
    }

    // The only message the worker sends is the updatedQuery array
    onmessage(callback: (value: any) => void) {
        this.worker.on('message', callback);
    }
}

async function rateLimiterAnalysis(req: Request, res: Response, next: NextFunction) {
    if (!req.params.projectId) return res.status(400).send('Bad Request: missing projectID');
    // Obtain a new worker
    const worker = new RateLimiterWorker(req.params.projectId, req.body.config);

    const workerIsDone = new Promise((resolve, reject) => {
        worker.onmessage((data: any) => {
            // Wait for "DONE"
            if (data === 'DONE') {
                resolve(true);
            } else {
                // add received data to res.locals
                res.locals.queries = data;
            }
        });
    });
    // Wait for a DATA message
    // add query data to res.locals
    // call next

    try {
        await workerIsDone;
    } catch (err) {
        return next(err);
    }

    return next();
}

export default rateLimiterAnalysis;
