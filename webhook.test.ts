import discordwebhook from "./index.ts";

const webhook = new discordwebhook("webhook_url");

await webhook.send("Hello, this is a test.")
  .then(console.log);
