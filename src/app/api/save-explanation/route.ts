import { auth } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import UserDataModel, { Explanation } from "@/models/UserData";
import { Types } from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const session = await auth()

    if (!session || !session.user) {
        return NextResponse.json({
            success: false,
            message: "Not Authenticated"
        }, { status: 401 })
    }

    await dbConnect();

    const { email, query, explanation } = await request.json();
    try {
        const user = await UserDataModel.findOne({ email })
        if (!user) {
            return NextResponse.json({
                success: false,
                message: "User not found"
            }, { status: 404 })
        }

        // If user has signed in
        const newExplanation = { _id: new Types.ObjectId(), query, explanation, createdAt: new Date() }
        user.savedData.push(newExplanation as unknown as Explanation)
        await user.save()

        return NextResponse.json({
            success: true,
            message: "Explanation saved successfully",
            id: newExplanation._id.toString()
        }, { status: 200 })
    } catch (error) {
        console.log("Error adding messages", error)
        return Response.json({
            success: false,
            message: "Internal server error"
        }, { status: 500 })
    }

}