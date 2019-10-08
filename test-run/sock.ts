import * as wsClient from "socket.io-client";

class s {
  private sock = wsClient("https://fpa-backend.herokuapp.com/fpa");

  public foo = () => {
    this.sock.emit("fpa_channel_join", {
      channelId: "8Rn6HXnuFZWNYQUaLk6+ip5dz1bEzZDsbMBz3oU6Ks6qgoTq3kBg/VNaIxsceoJ/4Ptr1MVju11/DIO+MCJ4Sg=="
    });
    this.sock.on("auth_send", data => {
      console.log("@@@@@@@ ", data);
    });
  };
}

const v = new s();
v.foo();
