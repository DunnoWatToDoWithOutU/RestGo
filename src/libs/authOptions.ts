import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { login } from "./login";


export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
          name: "credentials",
          credentials: {
            email: { label: "Email", type: "email", placeholder: "email" },
            password: { label: "Password", type: "password" }
          },
          async authorize(credentials, req) {
            if(!credentials)   return null;
            try{
                const user = await login(credentials.email, credentials.password);
                return user
            } catch(err){
                console.error(err);
                return null;
            }
          }
        })
      ],
    session:{strategy:"jwt"},
    callbacks:{
        async jwt({token, user}){
            return {...token, ...user};
        },
        async session({session, token, user}){
            session.user = token as any;
            return session;
        }
    
    },
    pages:{
        signIn:"/auth/SignIn"
    }
}