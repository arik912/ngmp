const USER_ID_HEADER = 'x-user-id';

export function auth(req, res, next) {
  const userId = req.headers[USER_ID_HEADER];
  if (!userId || typeof userId !== 'string') {
    throw new Error('You must be authorized user')
  }
  const user = findUserById(userId);
  if (!user) {
    throw new Error('User is not authorized')
  }
  req.user = user;
  next();
}
