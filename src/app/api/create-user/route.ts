import dbConnect from "@/lib/dbConnect";
import UserDataModel from "@/models/UserData";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    await dbConnect();

    const { username, email } = await request.json();
    try {
        const exisitingUser = await UserDataModel.findOne({ email })

        // first time login - add in database
        if (!exisitingUser) {
            const newUser = new UserDataModel({
                username,
                email
            })
            await newUser.save()

            return NextResponse.json({
                success: true,
                message: "New user created"
            }, { status: 200 })
        }

        return NextResponse.json({
            success: true,
            message: "Sign in successful"
        }, { status: 200 })

    } catch (error) {
        console.log("Error registering user", error)
        return Response.json({
            success: false,
            message: "Error registering user"
        }, { status: 500 })
    }
}