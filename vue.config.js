module.exports = {
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.scss$/,
          use: [
            "vue-style-loader",
            "css-loader",
            {
              loader: "sass-loader",
              options: {
                implementation: require("sass"),
                sassOptions: {
                  indentedSyntax: true, // if you are using Sass
                },
              },
            },
          ],
        },
      ],
    },
  },
  transpileDependencies: true,
};
