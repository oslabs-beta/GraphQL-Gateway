import 'dotenv/config';
import jwt from 'jsonwebtoken';

const sessions = {
    expiry: '7d',
    verify: async (token: string) => {
        const data = await jwt.verify(token, String(process.env.JWT_SESSION_KEY), {
            maxAge: sessions.expiry,
        });
        if (!data) {
            return {
                authenticated: false,
                data: '',
            };
        }

        return {
            authenticated: false,
            data: {
                email: data.email,
                id: data.id,
            },
        };
    },
    create: async () => {},
};

export default sessions;
