const path = require('path');
const fs = require("fs");
const HTMLWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');
const ImageminPlugin = require('imagemin-webpack-plugin').default;

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const optimization = () => {
  const config = {
    splitChunks: {
      chunks: 'all'
    }
  };

  if (isProd) {
    config.minimizer = [
      new OptimizeCssAssetWebpackPlugin(),
      new TerserWebpackPlugin()
    ]
  }

  return config
};

const generateHtmlPlugins = (templateDir) => {
  const templateFiles = fs.readdirSync(path.resolve(__dirname, templateDir));
  return templateFiles
    .map(item => {
      if (item.includes('.html')) {
        const parts = item.split(".");
        const name = parts[0];
        const extension = parts[1];
        return new HTMLWebpackPlugin({
          filename: `${name}.${extension}`,
          template: path.resolve(__dirname, `${templateDir}/${name}.${extension}`),
          minify: {
            collapseWhitespace: isProd
          }
        });
      }
    })
    .filter(item => item)
};

const htmlPlugins = generateHtmlPlugins("src");

const filename = ext => isDev ? `[name].${ext}` : `[name].[hash].${ext}`;

const cssLoaders = extra => {
  const loaders = [
    {
      loader: MiniCssExtractPlugin.loader,
      options: {
        hmr: isDev,
        reloadAll: true
      },
    },
    {
      loader: 'css-loader',
      options: {
        sourceMap: isDev
      }
    },
    {
      loader: 'postcss-loader',
      options: {
        sourceMap: true,
        config: {
          path: 'postcss.config.js',
        },
      },
    },
  ];

  if (extra) {
    loaders.push(extra)
  }

  return loaders
};

const babelOptions = preset => {
  const opts = {
    presets: [
      '@babel/preset-env'
    ],
    plugins: [
      '@babel/plugin-proposal-class-properties'
    ]
  };

  if (preset) {
    opts.presets.push(preset)
  }

  return opts
};

const jsLoaders = () => {
  const loaders = [{
    loader: 'babel-loader',
    options: babelOptions()
  }];

  return loaders
};

const plugins = () => {
  const base = [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, 'src/assets/static'),
        to: path.resolve(__dirname, 'dist/assets/static')
      }
    ]),
    new MiniCssExtractPlugin({
      filename: filename('css')
    })
  ].concat(htmlPlugins);

  if (isProd) {
    base.push(
      new BundleAnalyzerPlugin(),
      new ImageminPlugin({test: /\.(jpe?g|png|gif|svg)$/i})
    )
  }

  return base
};

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry: {
    main: ['@babel/polyfill', './assets/scripts/index.js', './assets/styles/index.scss']
  },
  output: {
    filename: filename('js'),
    path: path.resolve(__dirname, 'dist')
  },
  optimization: optimization(),
  devServer: {
    port: 4201,
  },
  devtool: isDev ? 'source-map' : '',
  plugins: plugins(),
  module: {
    rules: [
      {
        test: /\.html$/,
        include: path.resolve(__dirname, "src/templates"),
        use: ["raw-loader"]
      },
      {
        test: /\.css$/,
        use: cssLoaders()
      },
      {
        test: /\.s[ac]ss$/,
        use: cssLoaders('sass-loader')
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'assets/static/images/',
            }
          }
        ]
      },
      {
        test: /\.(ttf|woff|woff2|eot)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'assets/static/fonts/',
            }
          }
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: jsLoaders()
      }
    ]
  }
};
