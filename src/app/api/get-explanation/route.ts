import { auth } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import UserDataModel from "@/models/UserData";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest) {
    const session = await auth()

    if (!session || !session.user) {
        return NextResponse.json({
            success: false,
            message: "Not Authenticated"
        }, { status: 401 })
    }

    await dbConnect()

    try {
        const { searchParams } = new URL(req.url)

        const id = searchParams.get('id')
        if (!id) {
            return NextResponse.json({
                success: false,
                message: "Invalid id given"
            }, { status: 400 });
        }

        const _user = await UserDataModel.findOne(
            {
                email: session.user.email,
                "savedData._id": new mongoose.Types.ObjectId(id)
            },
            { "savedData.explanation": 1, "savedData._id": 1 }
        );

        if (!_user) {
            return NextResponse.json({
                success: false,
                message: "User not found"
            }, { status: 401 })
        }

        const explanation = _user.savedData.filter((data) => (
            data._id.toString() === id
        )).map((item) => ({ explanation: item.explanation }))

        return NextResponse.json({
            success: true,
            message: explanation[0]
        }, { status: 200 })

    } catch (error) {
        console.log("Error fetching explanation: ", error)
        return Response.json({
            success: false,
            message: "Error while getting explanation"
        }, { status: 500 })
    }
}