import mongoose, { Document, Schema } from 'mongoose';

export interface IVolunteer extends Document {
  // _id: mongoose.Types.ObjectId;
  id: number,
  name: string;
  city: string;
  email: string;
  phone: string;
}

const Volenteer: Schema = new Schema({
  // _id: { type: Schema.Types.ObjectId, auto: true },
  id: { type: Number, required: true, unique: true},
  name: { type: String, required: true },
  city: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
});

export default mongoose.model<IVolunteer>('volenteers', Volenteer);
