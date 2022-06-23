import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import ReactDOM from 'react-dom/client';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { render } from 'react-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import { AuthProvider } from './auth/AuthProvider';
import RequireAuth from './components/RequireAuth';
import App from './App';

const client = new ApolloClient({
    uri: 'http://localhost:3000/gql',
    cache: new InMemoryCache(),
});

render(
    <ApolloProvider client={client}>
        <React.StrictMode>
            <BrowserRouter>
                <AuthProvider>
                    <Routes>
                        <Route path="/" element={<App />} />
                        <Route path="/about" element={<App />} />
                        <Route path="/team" element={<App />} />
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
    </ApolloProvider>,
    document.getElementById('root')
);
