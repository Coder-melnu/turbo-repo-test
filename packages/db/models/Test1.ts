import { model, models, Schema, Model, Types } from "mongoose";
export interface TUser {
  _id: Types.ObjectId;
  firstName: string;
  lastName?: string;
  email: string;
}

const userSchema = new Schema<TUser>({
  firstName: { required: true, type: String },
  lastName: { required: false, type: String },
  email: { required: true, type: String },
});

export const TUserModel =
  (models.User as Model<TUser> | undefined) ??
  model<TUser>("TUser", userSchema);
