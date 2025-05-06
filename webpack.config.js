import path from 'path';
import webpack from 'webpack';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  target: 'node',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  mode: 'production',
  experiments: {
    topLevelAwait: true
  },
  resolve: {
    alias: {
      '@models': path.resolve(__dirname, 'src/models'),
      '@middleware': path.resolve(__dirname, 'src/middleware'),
      'process': 'process/browser'
    },
    fallback: {
      "path": require.resolve("path-browserify"),
      "crypto": require.resolve("crypto-browserify"),
      "stream": require.resolve("stream-browserify"),
      "buffer": require.resolve("buffer/"),
      "util": require.resolve("util/"),
      "querystring": require.resolve("querystring-es3"),
      "string_decoder": require.resolve("string_decoder/"),
      "url": require.resolve("url/"),
      "vm": require.resolve("vm-browserify"),
      "fs": false,
      "net": false,
      "tls": false,
      "child_process": false,
      "async_hooks": false,
      "http": false,
      "https": false,
      "zlib": false,
      "events": false
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        },
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
      process: 'process/browser',
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')
    })
  ],
}; 