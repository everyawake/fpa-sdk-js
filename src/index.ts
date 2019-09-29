import axios from "axios";
import WSClient from "socket.io-client";

const SDK_END_POINT_URL = "https://fpa-backend.herokuapp.com";

export default class FPA_SDK {
  private static instance: FPA_SDK | null = null;
  private socket = WSClient(`${SDK_END_POINT_URL}/fpa`);
  private publicKey = "";

  public static getInstance(publicKey: string) {
    if (!publicKey) {
      throw new Error("Require public key!!");
    }

    if (this.instance) return this.instance;
    this.instance = new FPA_SDK(publicKey);
    return this.instance;
  }

  public async getUserToken(otid: string) {
    const publicKey = this.getPublicKey();
    const result = (await axios.post(`${SDK_END_POINT_URL}/otid/${otid}`, {
      "thirdparty-public-key": publicKey
    })).data;

    if (result.result === 200) {
      const channelId = result.channelId;
      this.joinChannel(channelId);
    } else {
      throw new Error("Couldn't get user information.");
    }
  }

  private constructor(publicKey: string) {
    this.publicKey = publicKey;
  }

  protected readonly getPublicKey = () => {
    if (!this.publicKey) {
      throw new Error("You should create instance first");
    } else {
      return this.publicKey;
    }
  };

  protected readonly joinChannel = (channelId: string) => {
    this.socket.emit("fpa_channel_join", {
      channelId
    });
    this.socket.on("connect", () => {
      console.log("!!!!!!!! connect");
    });
    this.socket.on("auth_send", data => {
      console.log("!!!!!!!!!! recv auth", data);
    });
  };
}
