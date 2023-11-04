const path = require("path");
const today = new Date();
module.exports = {
    output: {
        path: path.join(__dirname, "/public/dist"),
        filename: `${today.getTime()}.bundle.js`,
        clean: true,
    },
    plugins: [],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                },
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: ["style-loader", "css-loader", "sass-loader"],
            },
            {
                test: /\.(png|woff|woff2|eot|ttf|svg)$/,
                loader: "url-loader",
                options: { limit: false },
            },
        ],
    },
    resolve: {
        modules: [path.resolve("./src"), path.resolve("./node_modules")],
        extensions: [".js", ".jsx"],
    },
};
