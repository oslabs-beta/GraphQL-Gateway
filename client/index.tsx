import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
// import ReactDOM from 'react-dom/client';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { render } from 'react-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import { AuthProvider } from './auth/AuthProvider';
import Navbar from './components/Navbar';
import RequireAuth from './components/RequireAuth';
import App from './App';
import Footer from './components/Footer';

const httpLink = createHttpLink({
    uri: '/gql',
});
// todo: add apollo link to check auth status
const authLink = setContext((request, { headers }) => {
    // get the authentication token from local storage if it exists
    const token: string | null = localStorage.getItem('session-token');
    // return the headers to the context so httpLink can read them
    return {
        headers: {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            ...headers,
            authorization: token ? `Bearer ${token}` : '',
        },
    };
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});

render(
    <ApolloProvider client={client}>
        <AuthProvider>
            <React.StrictMode>
                <BrowserRouter>
                    <Navbar />
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
                    <Footer />
                </BrowserRouter>
            </React.StrictMode>
        </AuthProvider>
    </ApolloProvider>,
    document.getElementById('root')
);
