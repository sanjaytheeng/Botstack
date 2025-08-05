import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db";
import * as schema from "@/db/schema";
import { polar, checkout, portal } from "@polar-sh/better-auth";
import { polarClient } from "./polar";

export const auth = betterAuth({
  plugins: [
    polar({
      client: polarClient,
      createCustomerOnSignUp: true, // Automatically create a Polar customer when a user signs up
      use: [
        checkout({
          authenticatedUsersOnly: true, // Only authenticated users can access the checkout
          successUrl: "/upgrade",
        }),
        portal(),
      ],
    }),
  ],
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  emailAndPassword: {
    enabled: true, // Enable email and password authentication
  },
  database: drizzleAdapter(db, {
    provider: "pg", // or "mysql", "sqlite"
    schema: {
      ...schema, // Import your Drizzle schema
    }, // Your Drizzle schema
  }),
});
