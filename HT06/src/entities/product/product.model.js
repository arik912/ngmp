import { model, Schema } from 'mongoose';

const productSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, required: true, auto: true },
  title: { type: Schema.Types.String, required: false },
  description: { type: Schema.Types.String, required: false },
  price: { type: Schema.Types.Number, required: false },
});

export const Product = model('Product', productSchema);
