import axios from "axios";
import NextAuth from "next-auth"
import Google from "next-auth/providers/google"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        }
      }
    })
  ],
  callbacks: {
    async signIn({ user }) {
      try {
        const { email, name } = user;

        const response = await axios.post(`${process.env.BASE_URL}/api/create-user`, {
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
    async jwt({ token, user }) {
      if (user) {
        token.name = user.name;
        token.email = user.email;
        token.picture = user.image;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.name = token.name;
        session.user.email = token.email as string;
        session.user.image = token.picture;
      }
      return session;
    }
  },
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: 'jwt'
  },
})