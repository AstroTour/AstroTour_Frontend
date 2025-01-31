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
            // API hívás a bejelentkezéshez
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ email: credentials?.email, password: credentials?.password }),
            });
  
            // Ellenőrizzük, hogy a válasz JSON típusú-e
            const contentType = res.headers.get("content-type");
            if (!contentType || !contentType.includes("application/json")) {
              throw new Error("Nem megfelelő szerver válasz!");
            }
  
            // Ellenőrizzük, hogy a bejelentkezés sikeres volt-e
            if (!res.ok) {
              throw new Error("Hibás bejelentkezési adatok!");
            }
  
            // JSON válasz feldolgozása
            const data = await res.json();
  
            return data.user
              ? {
                  id: data.user.id,
                  email: data.user.email,
                  name: data.user.username,
                  accessToken: data.accessToken, // Hozzáadott access token ha az API visszaadja
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
            accessToken: token.accessToken,
          };
        }
        return session;
      },
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: { signIn: "/signin" }, // Egyéni bejelentkezési oldal megadása
    debug: process.env.NODE_ENV === "development",
  };
