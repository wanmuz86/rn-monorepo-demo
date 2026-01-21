import { getCombinedRegistry } from "./getCombinedRegistry";

// The same as our previosly created script
// to create the general navigation path/ sitemap
// Create navigation for it

let registry;
try {
 registry = getCombinedRegistry();
 console.log("Registry built successfully:", {
   routesCount: registry.routes?.length || 0,
   tabsCount: registry.tabs?.length || 0,
 });
} catch (error) {
 console.error("Failed to build registry:", error);
 console.error("Error stack:", error.stack);
 // Fallback to empty registry to prevent app crash
 registry = { routes: [], tabs: [] };
}


export { registry };
