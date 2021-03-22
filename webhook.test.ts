import discordwebhook from "./index.ts";

const webhook = new discordwebhook('https://discord.com/api/webhooks/796141040968794162/XjYIteJO3dpOZnQEUT6nyl_e-teoHQHVp72g-OUdCKSEJ9GnrJ663pTB9_Nz2gJ1ejnd');

webhook.send('Hello, this is a test.')
    .then(console.log);