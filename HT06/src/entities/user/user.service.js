import * as userRepository from './user';

export async function findUserById(userId){
  return userRepository.findUserById(userId);
}

export async function createUser() {
  const id = await userRepository.createUser();

  if (!id) {
    throw new Error({ message: 'User was not created' });
  }

  return id;
}
