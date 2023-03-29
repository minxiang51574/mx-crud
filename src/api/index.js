/*
 * @Author: Mx
 * @Date: 2023-03-24 11:37:53
 * @Description: API
 */
import axios from 'axios';

/** 首页列表数据查询 */
export const queryHomePageData = (data) => {
    return axios.post('/api/homePageData',data);
}
/** 首页列表数据删除 */
export const deleteHomePageData = (data) => {
    return axios.post('/api/deleteData',{id: data.id });
}
/** 首页列表数据新增 */
export const addHomePageData = (data) => {
    return axios.post('/api/addHomePageData',data);
}
/** 首页列表数据编辑 */
export const updateHomePageData = (data) => {
    return axios.post('/api/updateHomePageData',data);
}