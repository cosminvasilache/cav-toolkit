import * as path from 'path';
import * as webpack from 'webpack';
import merge from 'webpack-merge';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

interface Environment {
    prod: boolean,
    dev: boolean,
    analyze: boolean,
}

const baseWebpackConfig: webpack.Configuration = {
    mode: 'production',
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".mjs", ".cjs", ".json", ".wasm"],
    },
    entry: {
        main: './src/main.ts',
    },
    output: {
        filename: '[name].[contenthash].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                use: ['html-loader'],
            },
            {
                test: /\.ts$/,
                use: 'ts-loader',
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                ],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            minify: {},
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
        }),
    ],
};

const prodWebpackConfig: webpack.Configuration = {
    mode: 'production',
};

const devWebpackConfig: webpack.Configuration = {
    mode: 'development',
    devtool: 'source-map',
    devServer: {
        open: true,
    },
};

const createAnalyzeWebpackConfig = (): webpack.Configuration => {
    return {
        plugins: [
            new BundleAnalyzerPlugin({

            }),
        ],
    };
};

function createConfig(env: Environment) {
    console.log('ENVIRONMENT:', env);

    let outputWebpackConfig: webpack.Configuration = baseWebpackConfig;

    if (env.prod) {
        outputWebpackConfig = merge(outputWebpackConfig, prodWebpackConfig);
    }

    if (env.dev) {
        outputWebpackConfig = merge(outputWebpackConfig, devWebpackConfig);
    }

    if (env.analyze) {
        outputWebpackConfig = merge(outputWebpackConfig, createAnalyzeWebpackConfig());
    }

    return outputWebpackConfig;
}

export default createConfig;
