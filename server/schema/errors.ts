import { createError } from 'apollo-errors';

const WrongCredentialsError = createError('WrongCredentialsError', {
    message: 'The provided username or password is invalid.',
});

const UserTakenError = createError('UserTakenError', {
    message: 'The provided email already exists with an account',
});

export { WrongCredentialsError, UserTakenError };
