import axios from "axios";
import wsClient from "socket.io-client";

const SDK_END_POINT_URL = "https://fpa-backend.herokuapp.com";
// const SDK_END_POINT_URL = "http://www.lvh.me:3000";

export default class FPA_SDK {
  private static instance: FPA_SDK | null = null;
  private socket: SocketIOClient.Socket;
  private publicKey = "";

  public static getInstance(publicKey: string) {
    if (!publicKey) {
      throw new Error("Require public key!!");
    }

    if (this.instance) return this.instance;
    this.instance = new FPA_SDK(publicKey);
    return this.instance;
  }

  /**
   * TODO: should return promise value
   * return should user auth status!
   *
   */
  public async getUserToken(otid: string) {
    const publicKey = this.getPublicKey();
    try {
      const result = (await axios.post(`${SDK_END_POINT_URL}/otid/${otid}`, {
        "thirdparty-public-key": publicKey
      })).data;

      if (result.result === 200) {
        const channelId = result.channelId;
        console.log("@@@@", channelId);

        return new Promise(resolve => {
          this.socket.emit("fpa_channel_join", {
            channelId
          });
          this.socket.on("auth_send", data => {
            console.log(">>>", data);
            resolve(data.response);
          });
        });
      } else {
        return Promise.resolve({ code: 404, status: "not_found" });
      }
    } catch (err) {
      if (err.response && err.response.status === 404) {
        return Promise.resolve({ code: 404, status: "not_found" });
      }
      return Promise.reject({ code: 500, status: err });
    }
  }

  public async doUserApprove(otid: string) {
    const publicKey = this.getPublicKey();
    try {
      const result = await axios.post(`${SDK_END_POINT_URL}/third-party/approve`, {
        otid,
        "thirdparty-public-key": publicKey
      });
      return result.data.data.result;
    } catch (err) {
      if (err.response && err.response.status === 404) {
        return Promise.resolve({ code: 404, status: err.response.data.result });
      }
      return Promise.reject(err);
    }
  }

  private constructor(publicKey: string) {
    this.publicKey = publicKey;
    this.socket = wsClient(`${SDK_END_POINT_URL}/fpa`);
  }

  protected readonly getPublicKey = () => {
    if (!this.publicKey) {
      throw new Error("You should create instance first");
    } else {
      return this.publicKey;
    }
  };
}
