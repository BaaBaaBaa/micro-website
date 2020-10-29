const autoPreFixer = require('autoprefixer');
const px2rem = require('postcss-pxtorem');
const path = require('path');
const SpritesmithPlugin = require('webpack-spritesmith');
// const merge = require("webpack-merge");
// const tsImportPluginFactory = require("ts-import-plugin");

var templateFunction = function (data) {
  var shared = '.icon { background-image: url(I);background-size: Wpx Hpx;}'.replace('I', data.sprites[0].image).replace('W', data.spritesheet.width)
    .replace('H', data.spritesheet.height)

  var perSprite = data.sprites.map(function (sprite) {
    return '.icon-N { width: Wpx; height: Hpx; background-position: Xpx Ypx; }'
      .replace('N', sprite.name)
      .replace('W', sprite.width)
      .replace('H', sprite.height)
      .replace('X', sprite.offset_x)
      .replace('Y', sprite.offset_y);
  }).join('\n');

  return shared + '\n' + perSprite;
};

module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
      ? './'
      : '/',
  productionSourceMap: false,
  configureWebpack: config => {
    /*
    细节坑。文档里面写着 需要resolve，引入图片生成的位置，
    不加这行会报错。因为github，Readme里面有这句话
    resolve contains location of where generated image is
    （要把生成的地址resolve到modules里面。不写就错）
    一定要加，血的教训啊
    */
    config.resolve.modules = ['node_modules', './src/assets/images']
    // 定义一个插件数组。用来覆盖，在里面使用我们的主角
    const Plugins = [
      new SpritesmithPlugin({
        /*
        目标小图标，这里就是你需要整合的小图片的老巢。
        现在是一个个的散兵，把他们位置找到，合成一个
        */
        src: {
          cwd: path.resolve(__dirname, './src/assets/icon'),
          glob: '*.png'
        },
        // 输出雪碧图文件及样式文件，这个是打包后，自动生成的雪碧图和样式，自己配置想生成去哪里就去哪里
        target: {
          image: path.resolve(__dirname, './src/assets/images/sprite.png'),
          css: [
            [path.resolve(__dirname, './src/assets/css/sprite.scss'), {
              // 引用自己的模板
              format: 'function_based_template'
            }],
          ]
        },
        // 自定义模板入口，我们需要基本的修改webapck生成的样式，上面的大函数就是我们修改的模板
        customTemplates: {
          'function_based_template': templateFunction,
        },
        // 样式文件中调用雪碧图地址写法（Readme这么写的）
        apiOptions: {
          cssImageRef: '~sprite.png'
        },
        // 让合成的每个图片有一定的距离，否则就会紧挨着，不好使用
        spritesmithOptions: {
          padding: 20
        }
      })
    ]
    // config里面，覆盖掉以前的，要不然不好使
    config.plugins = [...config.plugins, ...Plugins]
  },
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
