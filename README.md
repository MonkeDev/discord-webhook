# discord-webhook
## Some problems rn with Deno script hosting :trollface:
- Create/Edit/Delete Discord webhook messages with their [API](https://discord.com/developers/docs/intro).

## Example using [Discordeno](https://deno.land/x/discordeno@10.5.0)
```ts
import discordwebhook from 'https://deno.land/x/discordwebhook@0.0.1/mod.ts';
import { startBot } from "https://deno.land/x/discordeno/mod.ts";
const webhook = new discordwebhook('YOUR-WEBHOOK-URL');

startBot({
  token: "BOT-TOKEN",
  intents: ["GUILDS", "GUILD_MESSAGES"],
  eventHandlers: {
    ready() {
      console.log("Successfully connected to gateway");
    },
    messageCreate(message) {
      if (message.content == "hi") {
        webhook.createMessage('Hello!')
            .then(console.log);
      }
    },
  },
});
```

## Documentation
```ts
import discordwebhook from 'https://deno.land/x/discordwebhook@0.0.1/mod.ts';
const webhook = new discordwebhook(webhookUrl?: string);

// Creates a webhook message
webhook.createMessage(message: string, params?: object | undefined)
    .then(console.log);

// Edits a webhook message
webhook.editMessage(messageId: string, content: string, embeds?: object[] | undefined, allowed_mentions?: object | undefined)
    .then(console.log);

// Deletes a webhook message
webhook.deleteMessage(messageId: string)
    .then(console.log);
```

## Contributing
- If you want, fill in the gaps that are missing. Check out the [Discord Webhook Documentation]() to see what methods to add. Make a pull request once you are done :)
- Please message us in our [Discord Server](https://monkedev.com/r/discord) | Authors: `Swaggger/BurnedBed` & `Mafia`
