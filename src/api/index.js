/*
 * @Author: Mx
 * @Date: 2023-03-24 11:37:53
 * @Description: API
 */
import axios from 'axios';

/** 首页数据 */
export const queryHomePageData = (data) => {
    return axios.post('/api/homePageData',data);
}