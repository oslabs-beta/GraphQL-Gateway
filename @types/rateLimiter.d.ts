type BucketType = 'TOKEN_BUCKET' | 'LEAKY_BUCKET';

type WindowType = 'FIXED_WINDOW' | 'SLIDING_WINDOW_LOG' | 'SLIDING_WINDOW_COUNTER';

type RateLimiterType = BucketType | WindowType;

// interface Options {
//     capacity: number;
// }

// interface WindowOptions extends Options {
//     windowSize: number;
// }

// interface BucketOptions extends Options {
//     refillRate: number;
// }

// type BucketRateLimiter = {
//     type: BucketType;
//     options: BucketOptions;
// };

// type WindowRateLimiter = {
//     type: WindowType;
//     options: WindowOptions;
// };

// type RateLimiterConfig = WindowRateLimiter | BucketRateLimiter;

type RateLimiterConfig = {
    type: RateLimiterType;
    options: {
        capacity: number;
        windowSize?: number;
        refillRate?: number;
    };
};
