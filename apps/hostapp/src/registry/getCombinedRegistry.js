import { createEmptyRegistry, validateRegistry } from "rn-common-lib";
// import the registry from the features module
import { registerLogin } from "module-login";
import { registerCustomer } from "module-customer";

export function getCombinedRegistry() {
    // create the registry
  const registry = createEmptyRegistry();


  // add the routes and tabs from features module inside the global registry

  // arrangement matter
  // in this case, since both module is part of a tab items
  // Login - Customer

  registerLogin(registry);
  
  // CustomerList - CustomerDetail
  registerCustomer(registry);

  // pperform validation on the registry
  validateRegistry(registry);
  return registry;
}

