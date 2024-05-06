import * as userService from './user.service';

export async function createUser(req, res, next) {
  try {
    const id = await userService.createUser();

    return res.json();
  } catch (error) {
    next(error);
  }
}
