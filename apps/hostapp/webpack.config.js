const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: path.resolve(__dirname, "web", "index.js"),

  // once we build  it will deployed inside /dist folder
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.js",
    publicPath: "/",
    clean: true,
  },

  devServer: {
    port: 8080,
    historyApiFallback: true,
  },

  resolve: {
    // check also whatever ended with .web.js and .web.jsx
    extensions: [".web.jsx", ".web.js", ".jsx", ".js", ".json"],
    alias: { "react-native$": "react-native-web" },
    mainFields: ["browser", "module", "main"],
  },

  module: {
    rules: [
      { test: /\.m?js$/, resolve: { fullySpecified: false } },
      {
        test: /\.(js|jsx)$/,
        include: [
          path.resolve(__dirname),
          path.resolve(__dirname, "../../packages"),
        ],
        use: {
          loader: "babel-loader",
          options: {
            babelrc: false,
            configFile: false,
            presets: [require.resolve("@babel/preset-react")],
          },
        },
      },
      // image definitiaon
      { test: /\.(png|jpg|svg)$/, type: "asset/resource" },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "web", "index.html"),
    }),
  ],
};
