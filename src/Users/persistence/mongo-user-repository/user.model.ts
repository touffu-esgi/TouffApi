import mongoose, { Schema, Document } from 'mongoose';

const userSchema = new Schema(
  {
    recipientReference: {
      type: Schema.Types.ObjectId,
      ref: 'recipient',
    },
    providerReference: {
      type: Schema.Types.ObjectId,
      ref: 'provider',
    },
    userType: {
      type: Schema.Types.String,
      required: true,
    },
    email: {
      type: Schema.Types.String,
      required: true,
    },
    password: {
      type: Schema.Types.String,
      required: true,
    },
  },
  {
    collection: 'Users',
    timestamps: true,
    versionKey: false,
  },
);

export interface UserProps {
  recipientReference?: string;
  providerReference?: string;
  userType: string;
  email: string;
  password: string;
}

export type UserDocument = UserProps & Document;

export const UserModel = mongoose.model<UserDocument>('Users', userSchema);
