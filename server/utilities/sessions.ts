import 'dotenv/config';
import jwt, { JsonWebTokenError } from 'jsonwebtoken';

const sessions = {
    expiry: '7d',
    verify: async (token: string) => {
        const data = await jwt.verify(token, String(process.env.JWT_SESSION_KEY), {
            maxAge: sessions.expiry,
        });
        if (!data) {
            return { authenticated: false, data: null };
        }

        return { authenticated: false, data };
    },
    create: async (data: { id: string }) => {
        const token = await jwt.sign(data, String(process.env.JWT_SESSION_KEY), {
            expiresIn: sessions.expiry,
        });
        return token;
    },
};

export default sessions;
