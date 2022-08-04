import 'dotenv/config';
import jwt from 'jsonwebtoken';

const sessions = {
    expiry: '7 days',
    verify: (token: string) => {
        try {
            const data = jwt.verify(token, String(process.env.JWT_SESSION_KEY));
            return { authenticated: true, data };
        } catch {
            // token invalid
            return { authenticated: false, data: null };
        }
    },
    create: (data: { id: string }) => {
        const token = jwt.sign(data, String(process.env.JWT_SESSION_KEY), {
            expiresIn: sessions.expiry,
        });
        return token;
    },
};

export default sessions;
