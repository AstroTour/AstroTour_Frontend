// app/lib/authOptions.ts
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
          // Küldjük el a hitelesítési adatokat a backend-nek
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
          });
  
          // Ellenőrizzük a válasz típusát
          const contentType = res.headers.get("content-type");
          if (!contentType || !contentType.includes("application/json")) {
            throw new Error("Nem megfelelő szerver válasz!");
          }
  
          if (!res.ok) {
            throw new Error("Hibás bejelentkezési adatok!");
          }
  
          // Válasz feldolgozása
          const data = await res.json();
  
          return data.user
            ? {
                id: data.user.id,
                email: data.user.email,
                name: data.user.username,
                role: data.user.role, // itt kapjuk meg a role-t
                accessToken: data.accessToken, // opcionális, ha az API visszaadja
              }
            : null;
        } catch (error) {
          console.error("Bejelentkezési hiba:", error);
          throw new Error("Bejelentkezési hiba!");
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
        token.role = user.role; // átemeljük a role-t a tokenbe
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
          role: token.role, // a session.user.role itt lesz elérhető
          accessToken: token.accessToken,
        };
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: { signIn: "/signin" }, // Egyéni bejelentkezési oldal
  debug: process.env.NODE_ENV === "development",
};
