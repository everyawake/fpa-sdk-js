import FPA from "../src";

const fpaIns = FPA.getInstance(
  "8Rn6HXnuFZWNYQUaLk6+ip5dz1bEzZDsbMBz3oU6Ks6qgoTq3kBg/VNaIxsceoJ/4Ptr1MVju11/DIO+MCJ4Sg=="
);
const otid = "r4v8l";
fpaIns
  .getUserToken(otid)
  .then((result: any) => {
    console.log("#########", result);
    if (result.status && result.status === "not_found") {
      const result = fpaIns.doUserApprove(otid);
      console.log("!!! approved >> ", result);
    } else {
      switch (result.authStatus) {
        case "user-auth-done": {
          console.log("!!!!!!! done", result);
          console.log("!!!!!!! userToken", result.data.userToken);
          break;
        }

        case "user-auth-failed": {
          console.log("!!!!!!! failed", result);
          break;
        }
      }
    }
  })
  .catch(error => console.log("@@@@@@@@@ ERR", error));
