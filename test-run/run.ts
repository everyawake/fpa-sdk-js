import FPA from "../src";

const fpaIns = FPA.getInstance(
  "8Rn6HXnuFZWNYQUaLk6+ip5dz1bEzZDsbMBz3oU6Ks6qgoTq3kBg/VNaIxsceoJ/4Ptr1MVju11/DIO+MCJ4Sg=="
);
const otid = "xxd1a";
fpaIns
  .getUserToken(otid)
  .then(async (result: any) => {
    console.log("!!!!!!!", result);
    if (result.status === "not_found") {
      const result = await fpaIns.doUserApprove(otid);
      console.log("!!! approved >> ", result);
    }
  })
  .catch(error => console.log("@@@@@@@@@ ERR", error));
