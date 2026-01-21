import { eventBus, analytics, storage } from "rn-common-lib";

export async function featureADemo() {

  // call the track function from the analytics common library  
  analytics.track({ name: "SCREEN_VIEW", props: { screen: "FeatureAHome" } });

  //Publish an event USER_LOGIN to the subsriber with payload {userId:"u-123"}
  eventBus.emit("USER_LOGIN", { userId: "u-123" });
  
  // It will store "token" inside the storage "common library"
  await storage.setItem("token", "abc123");
  return await storage.getItem("token");

}
