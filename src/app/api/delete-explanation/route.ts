import { auth } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import UserDataModel from "@/models/UserData";
import mongoose from "mongoose";
import { Session } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest) {
    const session: Session | null = await auth()

    if (!session || !session.user) {
        return NextResponse.json({
            success: false,
            message: "Not Authorized"
        }, { status: 401 })
    }

    const { id } = await request.json()

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
        return NextResponse.json({
            success: false,
            message: "Invalid id"
        }, { status: 400 })
    }

    await dbConnect()

    try {
        const response = UserDataModel.updateOne(
            { email: session.user.email },
            { $pull: { savedData: { _id: new mongoose.Types.ObjectId(id) } } }
        );
        if ((await response).modifiedCount === 0) {
            return NextResponse.json({
                success: false,
                message: 'Explanation not found or not deleted'
            }, { status: 404 })
        }

        return NextResponse.json({
            success: true,
            message: 'Explanation deleted'
        }, { status: 200 })

    } catch (error) {
        console.error('Error deleting explanation: ', error)
        return NextResponse.json({
            success: false,
            message: "Internal server error"
        }, { status: 500 })
    }
}