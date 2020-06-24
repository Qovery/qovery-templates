import { MongoClient } from "https://deno.land/x/mongo@v0.8.0/mod.ts";

const env = Deno.env.toObject();
const connectionUri = env.QOVERY_DATABASE_MY_MONGO_CONNECTION_URI || "mongodb://localhost:27017";
const client = new MongoClient();

client.connectWithUri(connectionUri);

const db = client.database("booksApi");

export default db;
