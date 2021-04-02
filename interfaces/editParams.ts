import embedStructure from "./embedStructure.ts";

export default interface editParams {
  embeds?: embedStructure[];
  file?: any;
  payload_json?: string;
  allowed_mentions?: object;
}
