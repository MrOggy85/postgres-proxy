import AppError from "./AppError.ts";
import { Client, PostgresError, Status } from "./deps.ts";

async function connect(
  user: string,
  password: string,
  database: string,
  hostname: string,
  port: string,
) {
  const client = new Client({
    user,
    password,
    database,
    hostname,
    port,
  });
  await client.connect();
  return client;
}

type ConnectParams = Parameters<typeof connect>;

export async function runQuery(q: string, hej: ConnectParams) {
  const client = await connect(...hej);

  try {
    const result = await client.queryArray(q);
    return result;
  } catch (error) {
    if (error instanceof PostgresError) {
      console.error(
        "PostgresError 2",
        error.name,
        error.message,
        error.fields,
        error.stack,
      );
      throw new AppError("", Status.InternalServerError);
    }
  } finally {
    await client.end();
  }
}
