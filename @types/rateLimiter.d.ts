type BucketType = 'TOKEN_BUCKET' | 'LEAKY_BUCKET';

type WindowType = 'FIXED_WINDOW' | 'SLIDING_WINDOW_LOG' | 'SLIDING_WINDOW_COUNTER';

type BucketRateLimiter = {
    type: BucketType;
    options: {
        refillRate: number;
        capacity: number;
    };
};

type WindowRateLimiter = {
    type: WindowType;
    options: {
        windowSize: number;
        capacity: number;
    };
};

type RateLimiterConfig = WindowRateLimiter | BucketRateLImiter;

type RateLimiterUpdateArgs = {
    type: BucketType | WindowType;
    capacity: number;
    windowSize?: number;
    refillRate?: number;
};
