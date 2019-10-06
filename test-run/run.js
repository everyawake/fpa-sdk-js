const FPA = require("../dist").default;

const fpaIns = FPA.getInstance("8Rn6HXnuFZWNYQUaLk6+ip5dz1bEzZDsbMBz3oU6Ks6qgoTq3kBg/VNaIxsceoJ/4Ptr1MVju11/DIO+MCJ4Sg==");

fpaIns.getUserToken("oMsSj").then(result => {
  console.log("@@@@@@@@@@", result);
}).catch(error => console.log("@@@@@@@@@ ERR", error));
