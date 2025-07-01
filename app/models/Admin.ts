import mongoose, { Schema, Document, models } from "mongoose";


export interface IAdmin extends Document {
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
}

const adminSchema = new Schema<IAdmin> ({ 
    email: {type: String, unique: true, required: true},
    password: { type: String, required: true},
    firstName: String,
    lastName: String,
});

export const User = models.User || mongoose.model<IAdmin>("Admin", adminSchema);