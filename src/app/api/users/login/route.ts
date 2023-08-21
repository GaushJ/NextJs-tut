import { connect } from '@/dbConfig'
import User from '@/models/userModel'
import { NextRequest, NextResponse } from 'next/server'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const { email, password } = reqBody
        const user = await User.findOne({ email });
        if (user) {
            const isPasswordCorrect = await bcryptjs.compare(password, user.password)
            if (isPasswordCorrect) {

                //const login token
                const tokenData = {
                    id: user._id,
                    username: user.username,
                    email: user.email
                }
                const token = await jwt.sign(tokenData, process.env.JWT_SECRET_KEY!, { expiresIn: "1hr" })

                const response = NextResponse.json({
                    message: "Login Successfull",
                    success: true,
                    user
                })
                response.cookies.set("token", token, { httpOnly: true });
                return response

            }



        } else {
            return NextResponse.json({
                message: "user does not exists",
                status: 400,


            })
        }


    } catch (error: any) {
        return NextResponse.json(
            { error: "something went wrong on api" },
            { status: 500 })
    }
}