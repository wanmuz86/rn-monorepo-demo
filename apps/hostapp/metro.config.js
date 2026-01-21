
const path = require("path");
const { getDefaultConfig, mergeConfig } = require("@react-native/metro-config");


const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, "../..");


const defaultConfig = getDefaultConfig(projectRoot);


// Force React and React Native to resolve ONLY from hostapp's node_modules
// This prevents multiple React instances which cause "Invalid hook call" errors
// Eg: If in our features module, we will use react-reactive code that is coming from the 
// host app
// peer-dependencies settings as well
const extraNodeModules = {
 react: path.resolve(projectRoot, "node_modules/react"),
 "react-native": path.resolve(projectRoot, "node_modules/react-native"),
};


// Create blocklist pattern for workspace root React
const workspaceRootEscaped = workspaceRoot.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");


module.exports = mergeConfig(defaultConfig, {
watchFolders: [workspaceRoot],
resolver: {
  // CRITICAL: hostapp's node_modules must come FIRST in resolution order
  nodeModulesPaths: [
    path.resolve(projectRoot, "node_modules"),
    path.resolve(workspaceRoot, "node_modules"),
  ],
  // Force React to resolve from hostapp only - this takes precedence
  extraNodeModules,
  unstable_enablePackageExports: true,
  blockList: [
    // Block nested node_modules in packages
    /packages\/.*\/node_modules\/.*/,
    // Block React from workspace root - CRITICAL to prevent duplicate React instances
    new RegExp(`${workspaceRootEscaped}/node_modules/react(/.*)?$`),
    new RegExp(`${workspaceRootEscaped}/node_modules/react-native(/.*)?$`),
  ],
},
});













