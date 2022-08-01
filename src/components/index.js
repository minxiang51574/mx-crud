/*
 * @Author: Mx
 * @Date: 2022-08-01 21:22:29
 * @Description: 
 */
import components from "./element"

const install = function(Vue){
    //全局注册组件 组件名为组件的name
    components.map(component => {
        Vue.component(component.name, component);
    });
}

export default {
    version:"1.0.0",
    install
}