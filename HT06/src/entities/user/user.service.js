import * as userRepository from './user.repository';

export function findUserById(userId) {
  return userRepository.findUserById(userId);
}
