import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import ReactDOM from 'react-dom/client';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { render } from 'react-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import { AuthProvider } from './auth/AuthProvider';
import RequireAuth from './components/RequireAuth';
import App from './App';

const httpLink = createHttpLink({
    uri: '/gql',
    credentials: 'same-origin',
});

// const authLink = setContext((request, { headers }) => ({
//     headers: {
//         // eslint-disable-next-line @typescript-eslint/no-unused-vars
//         ...headers,
//     },
// }));

const client = new ApolloClient({
    // link: authLink.concat(httpLink),
    // uri: '/gql',
    link: httpLink,
    cache: new InMemoryCache(),
});

render(
    <ApolloProvider client={client}>
        <AuthProvider>
            <React.StrictMode>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<App />} />
                        <Route path="/about" element={<App />} />
                        <Route path="/demo" element={<App />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route
                            path="/dashboard"
                            element={
                                <RequireAuth>
                                    <Dashboard />
                                </RequireAuth>
                            }
                        />
                    </Routes>
                </BrowserRouter>
            </React.StrictMode>
        </AuthProvider>
    </ApolloProvider>,
    document.getElementById('root')
);
