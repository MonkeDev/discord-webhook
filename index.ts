const webhookUrlRegex = /https:\/\/(www\.|)discord\.com\/api\/webhooks\//g;
const getWebHookInfo = (url: string) => {
  const [webhookId, webhookToken] = url.split("webhooks/")[1].split("/");
  return {
    id: webhookId,
    token: webhookToken,
  };
};
export default class discordwebhook {
  url: string;
  constructor(webhookUrl: string) {
    this.url = webhookUrl ?? "https://discord.com/api/webhooks/";
    if (this.url.search(webhookUrlRegex) !== 0) {
      throw new Error("Please provide a webhook URL, this.url");
    }
  }

  createMessage(message: string, params?: object) {
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
    }).then(res => res.text());
  }

  editMessage(
    messageId: string,
    content: string,
    embeds?: object[],
    allowed_mentions?: object,
  ) {
    let data: any = {
      "content": content,
    };
    if (embeds) data["embeds"] = embeds;
    else if (allowed_mentions) data["allowed_mentions"] = allowed_mentions;
    return fetch(
      `https://discord.com/api/v8/webhooks/${
        encodeURIComponent(getWebHookInfo(this.url).id)
      }/${encodeURIComponent(getWebHookInfo(this.url).token)}/messages/${
        encodeURIComponent(messageId)
      }`,
      {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
      },
    ).then(res => res.json());
  }

  deleteMessage(messageId: string) {
    return fetch(
      `https://discord.com/api/v8/webhooks/${
        encodeURIComponent(getWebHookInfo(this.url).id)
      }/${encodeURIComponent(getWebHookInfo(this.url).token)}/messages/${
        encodeURIComponent(messageId)
      }`,
      {
        method: "DELETE",
        headers: { "content-type": "application/json" },
      },
    ).then(res => res.text());
  }
}
