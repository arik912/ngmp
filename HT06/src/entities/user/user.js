import { User } from './user.model';
export async function findUserById(userId){
  return User.findById(userId);
}

export async function createUser(){
  const user = new User();

  const saved = await user.save();

  if (!saved) {
    return null;
  }

  return saved._id.toString();
}
