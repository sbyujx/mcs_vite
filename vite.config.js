import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
// import vueJsx from '@vitejs/plugin-vue-jsx'
// import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { viteMockServe } from 'vite-plugin-mock'
import { createHtmlPlugin } from 'vite-plugin-html'
// import Components from 'unplugin-vue-components/vite'
// import UnoCSS from 'unocss/vite'
// import { presetAttributify, presetIcons, presetUno } from 'unocss'
// import mkcert from 'vite-plugin-mkcert'
// import DefineOptions from 'unplugin-vue-define-options/vite'
// import AutoImport from 'unplugin-auto-import/vite'
import setting from './src/settings'

// process.cwd() 是当前Node.js进程执行时的文件夹地址——工作目录，保证了文件在不同的目录下执行时，路径始终不变
// __dirname 是被执行的js 文件的地址 ——文件所在目录
const prodMock = setting.openProdMock     // 生产环境的Mock
const pathSrc = resolve(__dirname, 'src')// 源码路径，用于定义路径别名


// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  return {
    // 共享配置
    root: process.cwd(),                //项目根目录（index.html 文件所在的位置）。可以是一个绝对路径，或者一个相对于该配置文件本身的相对路径。
    base: setting.viteBasePath,         //开发或生产环境服务的公共基础路径。通过import.meta.env.BASE_URL暴露

    //  定义全局常量替换方式。其中每项在开发环境下会被定义在全局，而在构建时被静态替换。
    define: {                 
      GLOBAL_STRING: JSON.stringify('i am global var from vite.config.js define'),
      GLOBAL_VAR: { test: 'i am global var from vite.config.js define' }
    },

    clearScreen: false,       //设为 false 可以避免 Vite 清屏而错过在终端中打印某些关键信息
    
    // 文件系统路径的别名
    resolve: {
      alias: {                
        '@/': `${pathSrc}/`,
        // '@':path.resolve(__dirname,'./src')
        // 'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js' //remove i18n waring
      },
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'] // https://cn.vitejs.dev/config/#resolve-extensions
    },

    // 服务器选项
    server: {
      host: true,             // string | boolean   默认为'localhost'。指定服务器应该监听哪个 IP 地址。 如果将此设置为 0.0.0.0 或者 true 将监听所有地址，包括局域网和公网地址
      port: 5003,             // number   指定开发服务器端口。注意：如果端口已经被使用，Vite 会自动尝试下一个可用的端口，所以这可能不是开发服务器最终监听的实际端口。
      strictPort:true,        // boolean  设为 true 时若端口已被占用则会直接退出，而不是尝试下一个可用端口。
      https: false,           // boolean | https.ServerOptions 启用 TLS + HTTP/2。
      open: false,            // boolean | string  在开发服务器启动时自动在浏览器中打开应用程序。当此值为字符串时，会被用作 URL 的路径名。若你想指定喜欢的浏览器打开服务器，你可以设置环境变量 process.env.BROWSER（例如：firefox）
      // proxy:               // Record<string, string | ProxyOptions>  为开发服务器配置自定义代理规则。期望接收一个 { key: options } 对象。
      cors:true,              // boolean | CorsOptions   为开发服务器配置 CORS。默认启用并允许任何源，传递一个 选项对象 来调整行为或设为 false 表示禁用。
      // headers:             // OutgoingHttpHeaders   指定服务器响应的 header。
      hmr:                    // boolean | { protocol?: string, host?: string, port?: number, path?: string, timeout?: number, overlay?: boolean, clientPort?: number, server?: Server }   禁用或配置 HMR 连接
      { overlay: false }      //设置 server.hmr.overlay 为 false 可以禁用开发服务器错误的屏蔽。方便错误查看
    },

    // 构建选项
    // build: {
    //   chunkSizeWarningLimit: 10000, // 消除触发警告的 chunk, 默认500k
    //   assetsDir: 'static/assets',   // 指定生成静态资源的存放路径（相对于 build.outDir）
    //   rollupOptions: {              // 自定义底层的 Rollup 打包配置。
    //     output: {
    //       chunkFileNames: 'static/js/[name]-[hash].js',
    //       entryFileNames: 'static/js/[name]-[hash].js',
    //       assetFileNames: 'static/[ext]/[name]-[hash].[ext]'
    //     }}
    //   },
      
    // 预览选项
    // preview: {
    //   port: 5006,
    //   host: true,
    //   strictPort: true
    // },


    plugins: [
      vue(),                // 提供 Vue 3 单文件组件支持
      // vueJsx(),          // 提供 Vue 3 JSX 支持（通过 专用的 Babel 转换插件）
      // UnoCSS({presets: [presetUno(), presetAttributify(), presetIcons()]}),  // CSS插件
      // DefineOptions(),      // https://zhuanlan.zhihu.com/p/564077884   组件中可以使用defineOptions来定义 name 属性 ：defineOptions({name: "MyComponent"})  

      // createSvgIconsPlugin({                // 矢量图标
      //   iconDirs: [
      //     resolve(process.cwd(), 'src/icons/common'), 
      //     resolve(process.cwd(), 'src/icons/nav-bar')
      //   ],
      //   symbolId: 'icon-[dir]-[name]'
      // }),

      viteMockServe({                       // 提供本地和生产模拟服务。https://github.com/anncwb/vite-plugin-mock/blob/HEAD/README.zh_CN.md
        supportTs: true,                   // 打开后，可以读取 ts 文件模块。 请注意，打开后将无法监视.js 文件。
        mockPath: 'src/mock',               // 设置模拟.ts 文件的存储文件夹
        localEnabled: true,                 // 设置是否启用本地 xxx.ts 文件，不要在生产环境中打开它.设置为 false 将禁用 mock 功能
        prodEnabled: true,                  // 设置打包是否启用 mock 功能
        // injectCode：如果生产环境开启了 mock 功能,即prodEnabled=true.则该代码会被注入到injectFile对应的文件的底部。默认为main.{ts,js}  
        // 这样做的好处是,可以动态控制生产环境是否开启 mock 且在没有开启的时候 mock.js 不会被打包。
        // 如果代码直接写在main.ts内，则不管有没有开启,最终的打包都会包含mock.js
        injectCode: `                       
          import { setupProdMockServer } from '../mock-prod-server';
          setupProdMockServer();
        `,
        watchFiles: true,                   // 监视文件更改
        logger: true                        // 是否在控制台显示请求日志
      }),

      // Components({                              // https://github.com/antfu/unplugin-vue-components
      //   dirs: ['src/components', 'src/icons'],  // 配置需要默认导入的自定义组件文件夹，该文件夹下的所有组件都会自动 import
      //   extensions: ['vue'],                    // 自动导入的扩展名
      //   deep: true,                             // 是否搜索子目录
      //   dts: './typings/components.d.ts',       // 注意还需要在tsconfig.json里面添加上刚刚自动生成的components.d.ts文件（不然自定义的组件会有错误提示找不到文件）
      //   resolvers: [],                          // 自定义组件的解析器
      // }),

      // AutoImport({                      // https://github.com/antfu/unplugin-auto-import/blob/HEAD/src/types.ts 
      //   imports: [                      // 预设名称，或自定义导入的映射
      //     'vue',
      //     'vue-router',
      //     {'pinia/dist/pinia': ['storeToRefs']}
      //   ],
      //   dirs: ['src/hooks/**', 'src/utils/**', 'src/store/**', 'src/api/**', 'src/directives/**'],//配置后会自动扫描目录下的文件
      //   eslintrc: {                     // 生成对应的.eslintrc-auto-import.json文件
      //     enabled: true,                // Default `false`
      //     filepath: './eslintrc/.eslintrc-auto-import.json', // 保存eslint配置文件的目录。  Default `./.eslintrc-auto-import.json`
      //     globalsPropValue: true        // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
      //   },
      //   dts: './typings/auto-imports.d.ts'  //生成对应.d.ts文件的路径
      // }),

      createHtmlPlugin({                // 自动配置index.html 标题
        inject: { data: { title: setting.title } }
      })
    ],//end plugins

  }//end return
})//end export default
