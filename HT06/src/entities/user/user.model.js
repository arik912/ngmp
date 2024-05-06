import { model, Schema } from 'mongoose';

const userSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, required: true, auto: true },
  name: { type: Schema.Types.String, required: false },
});

export const User = model('User', userSchema);
