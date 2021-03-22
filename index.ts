const webhookurlRegex = /https:\/\/(www\.|)discord\.com\/api\/webhooks\//g
interface credentials {
  webhook_url?: string;
  botToken?: string;
}
interface availParams {
  name: string,
  avatar?: any
}
export default class discordwebhook {
  url: string;
  botToken: string;
  constructor(credentials?: credentials) {
    this.url = credentials?.webhook_url ?? "https://discord.com/api/webhooks/";
    this.botToken = credentials?.botToken ?? '';
    if (this.url.search(webhookurlRegex) !== 0) {
      throw new Error("Please provide a webhook URL, this.url");
    }
  }
  
  get(webhookId: string) {
    return fetch(`https://discord.com/api/v8/webhooks/${encodeURIComponent(webhookId)}`, {
      method: "GET",
      headers: { "Authorization": `Bot ${this.botToken}`, "content-type": "application/json" },
    });
  }
  getChannelWebhooks(channelId: string) {
    return fetch(`https://discord.com/api/v8/channels/${encodeURIComponent(channelId)}/webhooks`, {
      method: "GET",
      headers: { "Authorization": `Bot ${this.botToken}`, "content-type": "application/json" },
    });
  }

  getGuildWebhooks(guildId: string) {
    return fetch(`https://discord.com/api/v8/guilds/${encodeURIComponent(guildId)}/webhooks`, {
      method: "GET",
      headers: { "Authorization": `Bot ${this.botToken}`, "content-type": "application/json" },
    });
  }
  create(channelId: string, params: availParams) {
    let data: availParams = {
      name: params.name
    }
    if(params.avatar) data['avatar'] = params.avatar;
    return fetch(`https://discord.com/api/v8/channels/${encodeURIComponent(channelId)}/webhooks`, {
      method: "POST",
      headers: { "Authorization": `Bot ${this.botToken}`, "content-type": "application/json" },
      body: JSON.stringify(data),
    });
  }

  execute(message: string, params?: object) {
    let data: any = {
      "content": message,
    };
    if (params) {
      if (typeof params !== "object") {
        throw new Error("options must be an object");
      }
      for (const [k, v] of Object.entries(params)) {
        data[k] = v;
      }
    }
    return fetch(this.url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    });
  }
}
