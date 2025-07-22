import { auth } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import UserDataModel from "@/models/UserData";
import { User } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
    const session = await auth()

    if (!session || !session.user) {
        return NextResponse.json({
            success: false,
            message: "Not Authenticated"
        }, { status: 401 })
    }

    await dbConnect()

    const user: User | undefined = session.user

    try {
        const _user = await UserDataModel.findOne(
            { email: user?.email },
            { "savedData.query": 1, "savedData._id": 1, _id: 0 }
        );

        if (!_user) {
            return NextResponse.json({
                success: false,
                message: "User not found"
            }, { status: 401 })
        }

        const queries = _user.savedData.map((item) => ({
            id: item._id.toString(),  // convert MongoDB ObjectId to string
            query: item.query,
        }));
        return NextResponse.json({
            success: true,
            message: queries
        }, { status: 200 })
    } catch (error) {
        console.log("Error fetching queries: ", error)
        return Response.json({
            success: false,
            message: "Error while getting queries"
        }, { status: 500 })
    }
}