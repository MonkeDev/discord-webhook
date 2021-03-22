export default class discordwebhook {
  url: string;
  constructor(webhook_url: string) {
    this.url = webhook_url;
  }
  send(message: string, params?: object) {
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
