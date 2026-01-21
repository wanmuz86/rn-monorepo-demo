import { addRoute, addTab } from "rn-common-lib";
import { CustomerListScreen } from "./screens/CustomerListScreen.jsx";
import { CustomerDetailScreen } from "./screens/CustomerDetailScreen.jsx";

// Screens within the module
// Arranged based on Flow of stack , will be used by navigation in Host App to creat the stack
export const CustomerRoutes = {
  LIST: "CustomerList",
  DETAIL: "CustomerDetail",
};

// Tab for the module
export const CustomerTabs = {
  TAB_CUSTOMERS: "TabCustomers",
};

export function registerCustomer(registry) {
    // Register the route
  addRoute(registry, {
    name: CustomerRoutes.LIST,
    component: CustomerListScreen,
  });

  addRoute(registry, {
    name: CustomerRoutes.DETAIL,
    component: CustomerDetailScreen,
  });

  // Register the tab
  addTab(registry, {
    name: CustomerTabs.TAB_CUSTOMERS,
    title: "Customers",
    routeName: CustomerRoutes.LIST,
    icon: "👥",
  });
}
