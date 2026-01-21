import { eventBus } from "rn-common-lib";

export function featureBListen() {
    
    // Listen / subscribe to the USER_LOGIN event
    // Whenever the event is emitted, it will show the payload in the console...
  return eventBus.on("USER_LOGIN", (payload) => {
    console.log("[FeatureB] USER_LOGIN received:", payload);
  });
}
