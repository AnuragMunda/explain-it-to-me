import axios from "axios";
import NextAuth from "next-auth"
import Google from "next-auth/providers/google"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  callbacks: {
    async signIn({ user }) {
      try {
        const { email, name } = user;

        const response = await axios.post('http://localhost:3000/api/create-user', {
          username: name,
          email,
        })

        if (!response.data.success) return false
        else return true
      } catch (error) {
        console.log("Error while creating user: ", error)
        return false
      }
    },
  },
})