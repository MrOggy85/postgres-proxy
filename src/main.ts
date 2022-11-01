import { Application, oakCors, Router } from "./deps.ts";
import { runQuery } from "./db.ts";
import errorHandler from "./errorHandler.ts";
import AppError from "./AppError.ts";

const app = new Application();

app.use(async (ctx, next) => {
  await next();
  console.log(`${ctx.request.method} ${ctx.request.url}`);
});

app.use(
  oakCors({
    origin: "*",
  }),
);

errorHandler(app);

type SqlRequest = {
  q: string;
  u: string;
  pw: string;
  db: string;
  h: string;
  port: string;
};

const router = new Router();
router
  .get("/", (context) => {
    context.response.body = "Hello world!";
  })
  .post("/", async (ctx) => {
    const body = ctx.request.body({ type: "json" });

    const sqlRequest = await body.value as SqlRequest;
    const { u, pw, db, h, port, q } = sqlRequest;
    if (!u) {
      throw new AppError("'u' value not present", 400);
    }
    if (!pw) {
      throw new AppError("'pw' value not present", 400);
    }
    if (!db) {
      throw new AppError("'db' value not present", 400);
    }
    if (!h) {
      throw new AppError("'h' value not present", 400);
    }
    if (!port) {
      throw new AppError("'port' value not present", 400);
    }
    if (!q) {
      throw new AppError("'q' value not present", 400);
    }

    console.log("q", q);

    const result = await runQuery(q, [
      u,
      pw,
      db,
      h,
      port,
    ]);

    ctx.response.body = result;
  });

app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 8000 });
