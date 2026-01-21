import { featureADemo } from "feature-a";
import { featureBListen } from "feature-b";
import { storage } from "rn-common-lib";

async function main() {

  console.log("== Cross-module test start ==");

  // Register the listening part of featureB
  const off = featureBListen();

  // Feature A perform the step 1) Analytics, Emit, Storage
  const token = await featureADemo();


  // Verify that the storage is stored
  console.log("[Runner] token returned from featureADemo():", token);

  // Get it from storage class right away
  const stored = await storage.getItem("token");
  console.log("[Runner] token read from storage:", stored);

  // Unsubscribe 
  off();
  
  console.log("== Cross-module test done ==");
}

main().catch((err) => {
  console.error("Test failed:", err);
  process.exit(1);
});

