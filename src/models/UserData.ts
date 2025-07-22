import mongoose, { ObjectId, Schema } from "mongoose";

export interface Explanation extends Document {
    _id: ObjectId;
    query: string;
    explanation: string;
    createdAt: Date;
}

const ExplanationSchema: Schema<Explanation> = new Schema({
    query: {
        type: String,
        trim: true,
    },
    explanation: {
        type: String,
        trim: true,
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

export interface UserData extends Document {
    username: string;
    email: string;
    savedData: Explanation[];
}

const UserDataSchema: Schema<UserData> = new Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+\@.+\..+/, "Please use a valid email address"]
    },
    savedData: [ExplanationSchema]
})

const UserDataModel = (mongoose.models.UserData as mongoose.Model<UserData>) || mongoose.model<UserData>("UserData", UserDataSchema)

export default UserDataModel;