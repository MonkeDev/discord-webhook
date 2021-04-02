# discord-webhook

- Create/Edit/Delete Discord webhook messages with their
  [API](https://discord.com/developers/docs/intro).
- Read our **[Documentation](https://github.com/MonkeDev/discord-webhook/tree/main/docs)** if you are confused on how to use this package and/or get help in our [Discord Server](https://monkedev.com/r/discord)

## Example using [Discordeno](https://deno.land/x/discordeno@10.5.0)

```ts
import discordwebhook from "https://deno.land/x/discordwebhook/mod.ts";
import { startBot } from "https://deno.land/x/discordeno/mod.ts";
const webhook = new discordwebhook("YOUR-WEBHOOK-URL");

startBot({
  token: "BOT-TOKEN",
  intents: ["GUILDS", "GUILD_MESSAGES"],
  eventHandlers: {
    ready() {
      console.log("Successfully connected to gateway");
    },
    messageCreate(message) {
      if (message.content == "hi") {
        webhook.createMessage("Hello!")
          .then(console.log);
      }
    },
  },
});
```

## Contributing

You may check out the [Discord Webhook Documentation](https://discord.com/developers/docs/resources/webhook) to see what new methods/functionality should be added. Please contact the founders on the [Discord Server](https://monkedev.com/r/discord) for more information. Once you got the idea, fork the repository. Upon completion, format your code with `deno fmt` and make a pull request. 
