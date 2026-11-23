import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const client = new MongoClient(process.env.MONGODB_URL);
const db = client.db("fit-log");

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  },
  user: {
    additionalFields: {
      currentWeight: {
        type: "string",
        required: false,
        defaultValue: "--",
      },
      targetWeight: {
        type: "string",
        required: false,
        defaultValue: "--",
      },
    },
  },
  database: mongodbAdapter(db, {
    client,
  }),
});