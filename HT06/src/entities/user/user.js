const users = {
  admin: { id: 'admin' },
  customer: { id: 'customer' },
};

export function findUserById(userId) {
  return users[userId] || null;
}
