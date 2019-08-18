require('@babel/polyfill');
/**
 * UCF配置文件 更多说明文档请看 https://github.com/iuap-design/ucf-web/blob/master/packages/ucf-scripts/README.md
 */
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin'); 

var bootList = [
    // 'masterdetail-many',
    // 'masterdetail-one',
    // 'singletable-inline-edit',
    // 'singletable-popup-edit',
    // 'singletable-query',
    // 'tree',
    // 'ref-demo',
    // 'form-demo',
    'init-demo'
]

module.exports = (env, argv) => {
    return {
        context: 'iuap-pap-demo-fe', //上下文对象
        // 启动所有模块，默认这个配置，速度慢的时候使用另外的配置
        // bootList: true,
        // 启动这两个模块，启动调试、构建
        bootList:bootList,
        // 代理的配置
        proxy: [
            {
                enable: true,
                headers: {
                    "Referer": "http://yanshi01.app.yyuap.com"
                },
                //要代理访问的对方路由
                router: [
                    '/iuap-pap-demo-be',
                    '/wbalone',
                    '/iuap-saas-message-center/',
                    '/iuap-saas-billcode-service/',
                    '/iuap-saas-filesystem-service/',
                    '/eiap-plus/',
                    '/newref/',
                    '/print_service/',
                    '/iuap-print/',
                    '/pap_basedoc',
                    '/iuapmdm',
                    '/ubpm-web-process-designer',
                    '/iuap_pap_quickstart'
                ],
                url: 'http://yanshi01.app.yyuap.com'
            },
            {
                enable: true,
                headers: {
                    "Referer": "https://mock.yonyoucloud.com"
                },
                //要代理访问的对方路由
                router: [
                    '/mock'
                ],
                url: 'https://mock.yonyoucloud.com'
            },
            {
                enable: true,
                headers: {
                    "Referer": "https://mock.yonyoucloud.com"
                },
                //要代理访问的对方路由
                router: [
                    'mock/1696/2019/getList'
                ],
                url: 'https://mock.yonyoucloud.com/mock/1696/2019/getList'
            }
        ],
        
        // 全局环境变量
        global_env: {
            __MODE__: JSON.stringify(env),
            GROBAL_HTTP_CTX: JSON.stringify("/iuap-pap-demo-be"),
            'process.env.NODE_ENV': JSON.stringify(env),
            'process.env.STATIC_HTTP_PATH':env == 'development'?JSON.stringify("/static"):JSON.stringify("../static")
        },
        // 静态托管服务
        static: 'ucf-common/src',
        // 别名配置
        alias: {
            components: path.resolve(__dirname, 'ucf-common/src/components/'),
            utils: path.resolve(__dirname, 'ucf-common/src/utils/'),
            static: path.resolve(__dirname, 'ucf-common/src/static/'),
            styles: path.resolve(__dirname, 'ucf-common/src/styles/'),
        },
        // 构建排除指定包
        externals: {
            "react": "React",
            "react-dom": "ReactDOM",
            "tinper-bee": "TinperBee",
            "prop-types": "PropTypes"
        },
        
        // 构建服务需要运行的插件
        buildPlugins: [
            new CopyWebpackPlugin([
                { 
                from: __dirname+'/ucf-common/src/static/', 
                to: __dirname+'/ucf-publish/iuap-pap-demo-fe/static/' }
            ])
        ],
        // 调试服务需要运行的插件
        devPlugins: [
        ],
        // 构建资源是否产出SourceMap，默认开启
        open_source_map: false,
        // 是否展开静态引用资源
        res_extra:true
    }
}
