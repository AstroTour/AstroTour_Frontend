import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Bejelentkezés",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Jelszó", type: "password" },
      },
      async authorize(credentials) {
        try {
          console.log("Bejelentkezési API hívás:", `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`);

          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
            method: "POST",
            headers: { 
              "Content-Type": "application/json", 
              "Accept": "application/json" 
            },
            credentials: "include",
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
          });

          const data = await res.json();

          if (!res.ok) {
            console.error("Bejelentkezési hiba:", data);
            throw new Error(data.message || "Hibás bejelentkezési adatok!");
          }

          if (!data.access_token) {
            throw new Error("Hiányzó access token a válaszból!");
          }

          console.log("Sikeres bejelentkezés! Token:", data.access_token);

          return {
            id: data.user.id,
            email: data.user.email,
            name: data.user.name,
            role: data.user.role,
            accessToken: data.access_token,
          };
        } catch (error) {
          console.error("NextAuth authorize() hiba:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.role = user.role;
        token.accessToken = user.accessToken;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          id: token.id,
          email: token.email,
          name: token.name,
          role: token.role,
          accessToken: token.accessToken,
        };
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: { signIn: "/signin" },
  debug: process.env.NODE_ENV === "development",
};
