import { AppRegistry } from "react-native";
import App from "../App";

AppRegistry.registerComponent("hostapp", () => App);

AppRegistry.runApplication("hostapp", {
  rootTag: document.getElementById("root"),
});
