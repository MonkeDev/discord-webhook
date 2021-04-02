# discordwebhook#editMessage()

### Edits a webhook message: [Documentation Reference](https://discord.com/developers/docs/resources/webhook#edit-webhook-message)

| Parameter             |                              Description                              |                                                                  Required |
| --------------------- | :-------------------------------------------------------------------: | ------------------------------------------------------------------------: |
| `messageId` (String)  |             The messageId of the message you want to edit             |                                                                         ✓ |
| `message` (String)    | The content of the message that you want to replace the original with | ✖ (Default: Either add this message param, params.file, or params.embeds) |
| `params` (editParams) |                The optional parameters of this method                 |                                                           ✖ (Default: {}) |
