const fs = require("fs");
const http = require("http");

if (fs.existsSync(".env")) {
  for (const line of fs.readFileSync(".env", "utf8").split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*"?([^"]*)"?\s*$/);
    if (m) process.env[m[1]] = m[2];
  }
}

const next = require("next");

const port = Number(process.env.PORT) || 3000;
const app = next({ dev: false, port });
const handle = app.getRequestHandler();

const log = (label, error) =>
  fs.appendFileSync("error.log", `\n[${new Date().toISOString()}] [${label}] ${error && error.stack ? error.stack : String(error)}\n`);

process.on("uncaughtException", (error) => log("uncaught", error));
process.on("unhandledRejection", (error) => log("rejection", error));

app.prepare().then(() => {
  http
    .createServer((req, res) => handle(req, res))
    .listen(port, () => {
      console.log("ETCS pret sur le port " + port);
    });
});
