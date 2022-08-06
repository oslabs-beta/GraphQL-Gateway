const resolvers = {
    RateLimiterConfig: {
        options: (parent: RateLimiterConfig) => parent.options,
    },
    RateLimiterOptions: {
        // eslint-disable-next-line no-underscore-dangle
        __resolveType(data: RateLimiterConfig) {
            if (data.type in ['TOKEN_BUCKET', 'LEAKY_BUCKET']) {
                return 'BucketOptions';
            }
            return 'WindowOptions';
        },
    },
};

export default resolvers;
