/*
 * @Author: Mx
 * @Date: 2023-03-16 10:55:24
 * @Description: 
 */
  module.exports = (options = {})=>{
    return {
        option:{
            configureWebpack: config => {
            // 设置webpack别名
                config.resolve.alias = Object.assign(config.resolve.alias, {
                    '@': 'src',
                })
                if (options) {
                    config.resolve.alias = Object.assign(config.resolve.alias, options.configureWebpack.resolve.alias)
                }
            },
            css: {
                extract: false,
                loaderOptions: {
                  scss: {
                    additionalData: `
                    @import "@/mx-common/avue/styles/index.scss";
                    `
                  }
                }
            }
        }
    }  
  }