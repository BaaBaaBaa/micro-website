const autoPreFixer = require('autoprefixer');
const px2rem = require('postcss-pxtorem');
// const merge = require("webpack-merge");
// const tsImportPluginFactory = require("ts-import-plugin");

module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
      ? './'
      : '/',
  productionSourceMap: false,
  css: {
    // // 启用 CSS modules
    // requireModuleExtension: false,
    // // 是否使用css分离插件
    // extract: true,
    // // 开启 CSS source maps，一般不建议开启
    // sourceMap: false,
    // css预设器配置项
    loaderOptions: {
      css: {},
      postcss: {
        plugins: [
          autoPreFixer(),
          px2rem({
            rootValue: 75, //基准值(计算公式：设计图宽度/10)，设计图尺寸为750X1134(iPhone6)，基准值为750/10=75
            propList: ['*']
          })
        ]
      }
    }
  },
  // // 配置按需加载vant组件
  // chainWebpack: config => {
  //   config.module
  //       .rule("ts")
  //       .use("ts-loader")
  //       .tap(options => {
  //         options = merge(options, {
  //           transpileOnly: true,
  //           getCustomTransformers: () => ({
  //             before: [
  //               tsImportPluginFactory({
  //                 libraryName: "vant",
  //                 libraryDirectory: "es",
  //                 style: true
  //               })
  //             ]
  //           }),
  //           compilerOptions: {
  //             module: "es2015"
  //           }
  //         });
  //         return options;
  //       });
  // },
  devServer: {
    // open: true,
    // host: 'localhost',
    // port: 8080,
    // https: false,
    // //以上的ip和端口是我们本机的;下面为需要跨域的
    // proxy: {//配置跨域
    //     '/api': {
    //         target: 'http://127.0.0.1:3000',//这里后台的地址模拟的;应该填写你们真实的后台接口
    //         ws: true,
    //         changOrigin: true,//允许跨域
    //         pathRewrite: {
    //             '^/api': ''//请求的时候使用这个api就可以
    //         }
    //     }
    // }
  }
}
