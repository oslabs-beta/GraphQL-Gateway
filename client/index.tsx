import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import Signup from './components/Signup';
import Login from './components/Login';
import HomePage from './components/HomePage';
import Dashboard from './components/Dashboard';
import { AuthProvider } from './auth/AuthProvider';
import RequireAuth from './components/RequireAuth';

const client = new ApolloClient({
    uri: 'http://localhost:3000/gql',
    cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
    <ApolloProvider client={client}>
        <React.StrictMode>
            <BrowserRouter>
                <AuthProvider>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/about" element={<HomePage />} />
                        <Route path="/team" element={<HomePage />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route
                            path="/dashboard"
                            element={
                                <RequireAuth>
                                    <Dashboard />
                                </RequireAuth>
                            }
                        >
                            {/* <Route path="/dashboard" element={<Dashboard />} /> */}
                        </Route>
                        {/* <Route path="/dashboard" element={<RequireAuth />} /> */}
                    </Routes>
                </AuthProvider>
            </BrowserRouter>
        </React.StrictMode>
    </ApolloProvider>
);
