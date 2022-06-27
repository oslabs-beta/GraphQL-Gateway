import 'dotenv/config';
import jwt from 'jsonwebtoken';

const sessions = {
    expiry: '7d',
    verify: async (token: string) => {
        const data = await jwt.verify(token, String(process.env.JWT_SESSION_KEY), {
            maxAge: sessions.expiry,
        });
        // TODO: return encrypted data on JWT to context
        if (!data) {
            return { authenticated: false };
        }

        return { authenticated: false };
    },
    create: async () => {},
};

export default sessions;
