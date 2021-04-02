import embedStructure from "./embedStructure.ts";

export default interface executeParams {
  username?: string;
  avatar_url?: string;
  tts?: boolean;
  file?: any;
  embeds?: embedStructure[];
  payload_json?: string;
  allowed_mentions?: object;
}
