import { Application } from "https://deno.land/x/oak/mod.ts";
import router from "./router.ts";

const env = Deno.env.toObject();
const HOST = env.HOST || "0.0.0.0";
const PORT = env.PORT || 8080;

const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

console.log(`Listening on http://${HOST}:${PORT}`);
await app.listen(`${HOST}:${PORT}`);
