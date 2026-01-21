import { addRoute, addTab } from "rn-common-lib";
import { LoginScreen } from "./screens/LoginScreen.jsx";

// Register the Route name for the module
export const LoginRoutes = { LOGIN: "Login" };
// Register the tab item for the module
export const LoginTabs = { TAB_LOGIN: "TabLogin" };


export function registerLogin(registry) {
  // Call the addRoute method from the common libray
    addRoute(registry, {
    name: LoginRoutes.LOGIN,
    component: LoginScreen,
  });

  // Call the addTab module from the common Library as well
  // This object will be passed inside the registry
  // Later on lab 20, the registry will be used by the Navigator to create the navigation on Hostapp
  addTab(registry, {

    name: LoginTabs.TAB_LOGIN,
    
    title: "Login",
    
    routeName: LoginRoutes.LOGIN,
    
    icon: "🔐",
  });
}
