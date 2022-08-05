export default class RedisMock {
    constructor() {
        // this.client = new ioredis();
        this.store = {};
    }

    get(key) {
        return this.store[key] || '[]';
    }

    setex(key, value) {
        this.store[key] = value;
    }
}
