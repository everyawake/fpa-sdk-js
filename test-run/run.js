const FPA = require("../dist").default;

const fpaIns = FPA.getInstance("8Rn6HXnuFZWNYQUaLk6+ip5dz1bEzZDsbMBz3oU6Ks6qgoTq3kBg/VNaIxsceoJ/4Ptr1MVju11/DIO+MCJ4Sg==");

fpaIns.getUserToken("em7lx").then(result => {
  if (result.status && result.status === "not_found") {
    // const result = fpaIns.doUserApprove(otid);
    console.log("!!! user not found >> ", result);
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
}).catch(error => console.log("@@@@@@@@@ ERR", error));
