
const path = require('path');
function resolve(dir) {
  return path.join(__dirname, dir)
}
const config = {
  // 自定义webpack配置
  configureWebpack: {
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  },
  // 包依赖分析插件
  // ANALYZER: require('webpack-bundle-analyzer')
}

module.exports = config
