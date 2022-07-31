const resolvers = {
    RateLimiterConfig: {
        options: (parent: RateLimiterConfig) => parent.options,
    },
    RateLimiterOptions: {
        // eslint-disable-next-line no-underscore-dangle
        __resolveType(data: any) {
            if (data.refillRate) {
                return 'BucketOptions';
            }
            return 'WindowOptions';
        },
    },
};

export default resolvers;
