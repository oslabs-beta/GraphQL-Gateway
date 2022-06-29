import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import ReactDOM from 'react-dom/client';
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink } from '@apollo/client';
import { render } from 'react-dom';
import { setContext } from 'apollo-link-context';
import Signup from './components/Signup';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import { AuthProvider } from './auth/AuthProvider';
import RequireAuth from './components/RequireAuth';
import App from './App';

const httpLink = new HttpLink({ uri: '/gql' });
const authLink = setContext(async (req, { headers }) => {
    const token = localStorage.getItem('session-token');

    return {
        ...headers,
        headers: {
            Authorization: token ? `Bearer ${token}` : null,
        },
    };
});

const link = authLink.concat(httpLink as any);
const client = new ApolloClient({
    link: link as any,
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
