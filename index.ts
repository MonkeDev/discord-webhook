import executeParams from "./interfaces/executeParams.ts";
import editParams from "./interfaces/editParams.ts";

const webhookUrlRegex =
  /https:\/\/(www\.|)discord\.com\/api\/webhooks\/[0-9]{16,19}\/[^ ]{1,}/g;
const getWebHookInfo = (url: string) => {
  const [webhookId, webhookToken] = url.split("webhooks/")[1].split("/");
  return {
    id: webhookId,
    token: webhookToken,
  };
};
export interface options {
  validate?: boolean;
}

export default class discordwebhook {
  url: string;
  options: options;
  constructor(webhookUrl: string, options?: options) {
    this.url = webhookUrl ?? "https://discord.com/api/webhooks/";
    this.options = options || {
      validate: false,
    };
    if (!webhookUrlRegex.test(this.url)) {
      throw new Error("Please provide a webhook URL, this.url");
    } else if (typeof this.options !== "object") {
      throw new Error("options is not an object");
    }
  }

  /**
   * @method Webhook#execute-webhook
   * @param {String} message The content of the message you want to send through the webhook
   * @param {Object} params The optional parameters that can be passed 
   */
  createMessage(message?: string, params?: executeParams) {
    let data: any = {};
    if (message) data["content"] = message;

    if (params) {
      if (typeof params !== "object") {
        throw new Error("options must be an object");
      }
      for (const [k, v] of Object.entries(params)) {
        if (
          this.options.validate == true &&
          ![
            "username",
            "avatar_url",
            "tts",
            "file",
            "embeds",
            "payload_json",
            "allowed_mentions",
          ].includes(k)
        ) {
          throw new Error(`[ValidationError] Key: ${k} failed`);
        }
        data[k] = v;
      }
    }
    let headers = params?.file
      ? { "content-type": "multipart/form-data" }
      : { "content-type": "application/json" };
    let fetchOptions: any = {
      method: "POST",
      headers,
    };
    if (data) fetchOptions["body"] = JSON.stringify(data);
    return fetch(this.url + "?wait=true", fetchOptions).then((res) =>
      res.json()
    );
  }

  /**
   * @method Webhook#edit-webhook-message
   * @param messageId The messageId of the message you want to edit
   * @param message The content of the message that you want to replace the original with
   * @param params The optional parameters that can be passed
   */
  editMessage(
    messageId: string,
    message?: string,
    params?: editParams,
  ) {
    let data: any = {};
    if (!messageId) {
      throw new Error("Provide the messageId for the message you want to edit");
    }
    if (message) data["content"] = message;

    if (params) {
      if (typeof params !== "object") {
        throw new Error("options must be an object");
      }
      for (const [k, v] of Object.entries(params)) {
        if (
          this.options.validate == true &&
          !["embeds", "file", "payload_json", "allowed_mentions"].includes(k)
        ) {
          throw new Error(`[ValidationError] Key: ${k} failed`);
        }
        data[k] = v;
      }
    }

    let fetchOptions: any = {
      method: "PATCH",
      headers: { "content-type": "application/json" },
    };
    if (data) fetchOptions["body"] = JSON.stringify(data);
    return fetch(
      `https://discord.com/api/v8/webhooks/${
        encodeURIComponent(getWebHookInfo(this.url).id)
      }/${encodeURIComponent(getWebHookInfo(this.url).token)}/messages/${
        encodeURIComponent(messageId)
      }`,
      fetchOptions,
    ).then((res) => res.json());
  }

  /**
   * @method Webhook#delete-webhook-message
   * @param messageId 
   */
  async deleteMessage(messageId: string) {
    if (!messageId) {
      throw new Error(
        "Please provide the messageId for the message you want to delete",
      );
    }
    try {
      return await fetch(
        `https://discord.com/api/v8/webhooks/${
          encodeURIComponent(getWebHookInfo(this.url).id)
        }/${encodeURIComponent(getWebHookInfo(this.url).token)}/messages/${
          encodeURIComponent(messageId)
        }`,
        {
          method: "DELETE",
          headers: { "content-type": "application/json" },
        },
      );
    } catch (e) {
      return console.error(e);
    }
  }
}
