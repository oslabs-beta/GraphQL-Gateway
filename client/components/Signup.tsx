import React, { useState } from 'react';

export interface ISState {
    user: {
        email: string;
        password: string;
    };
}

function Signup() {
    const [user, setUser] = useState<ISState['user']>({
        email: '',
        password: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        });
    };

    const handleClick = () => {
        console.log(user);
    };

    return (
        <div className="App">
            <h1>Signup</h1>
            <div className="login-box">
                <div>
                    <input
                        type="text"
                        onChange={handleChange}
                        name="email"
                        value={user.email}
                        placeholder="enter email"
                    />
                    <input
                        type="password"
                        onChange={handleChange}
                        name="password"
                        value={user.password}
                        placeholder="enter password"
                    />
                    <button type="submit" onClick={handleClick}>
                        Signup
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Signup;
