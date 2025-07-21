import dbConnect from "@/lib/dbConnect";
import UserDataModel, { Explanation } from "@/models/UserData";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
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
        const newExplanation = { query, explanation, createdAt: new Date() }
        user.savedData.push(newExplanation as Explanation)
        await user.save()

        return NextResponse.json({
            success: true,
            message: "Explanation saved successfully"
        }, { status: 200 })
    } catch (error) {
        console.log("Error adding messages", error)
        return Response.json({
            success: false,
            message: "Internal server error"
        }, { status: 500 })
    }

}