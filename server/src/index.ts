import { Hono } from "hono";
import { Env } from "./types/env";
import { auth } from "./lib/auth";

const app = new Hono<Env>();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.on(["POST", "GET"], "/api/auth/*", (c) => {
  return auth.handler(c.req.raw);
});

export default {
  port: process.env.PORT || 3000,
  fetch: app.fetch,
};
