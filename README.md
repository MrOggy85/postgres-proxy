# postgres-proxy

Lightweight HTTP proxy for sending SQL commands to a Postgres DB

## Why?

This is very handy if you like your website to be able to send SQL commands
directly to the DB. It's very useful for small personal projects. But, it's
definitly not recommended for any service with multiple users because of obvious
security concerns. Please use it at your own risk.

## How

This HTTP server accepts requests with a JSON body. The body needs to include
the credentials and location of your DB as well as the SQL you want to execute.

## Requirements

- `deno` - [[_install_]](https://deno.land/#installation)
- `denon` (optional) [[_install_]](https://github.com/denosaurs/denon/)

## Development

```sh
$ ./run.sh
```

## Usage

### `curl`

```sh
curl --request POST \
  --url HTTP_ADDRESS_OF_ADEPLOYED_API \
  --header 'Content-Type: application/json' \
  --data '{
	"u": "DB_USER",
	"pw": "DB_PASSWORD",
	"h": "DB_HOST",
	"port": "DB_PORT",
	"db": "DB_NAME",
	"q": "SELECT * FROM table"
}'
```

### `axios`

```ts
type PostgresProxyResponse = {
  command: "SELECT";
  query: unknown;
  rowCount: number;
  rows: any[][];
};

async function request(q: string) {
  const response = await axios({
    url: "/",
    baseURL: HTTP_ADDRESS_OF_ADEPLOYED_API,
    method: "POST",
    data: {
      u: "DB_USER",
      pw: "DB_PASSWORD",
      h: "DB_HOST",
      port: "DB_PORT",
      db: "DB_NAME",
      q: "SELECT * FROM table",
    },
  });

  return response.data;
}
```
