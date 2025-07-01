import mongoose, { Schema, Document, models } from "mongoose";


export interface IUser extends Document {
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
}

const userSchema = new Schema<IUser> ({ 
    email: {type: String, unique: true, required: true},
    password: { type: String, required: true},
    firstName: String,
    lastName: String,
});

export const User = models.User || mongoose.model<IUser>("User", userSchema);