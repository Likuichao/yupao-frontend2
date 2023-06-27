import axios from "axios";

const isDev = process.env.NODE_ENV==='development'

// 自定义创建axios的实例
const myAxios = axios.create({
    // `baseURL` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL。
    // 它可以通过设置一个 `baseURL` 便于为 axios 实例的方法传递相对 URL
    baseURL: isDev ? 'http://127.0.0.1:8080/api':'http://8.130.93.91:8080/api',
    withCredentials: true,
});

//axios默认是不让ajax请求头部携带cookie的，添加withCredentials设置
myAxios.defaults.withCredentials = true;

// 添加请求拦截器
myAxios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    console.log("我要发送请求了",config)
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
myAxios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    console.log("我收到响应了",response)
    //如果没有登录跳转到个人登录页
    if(response?.data?.code === 40100) {
        // const redirectUrl = window.location.href;
        // window.location.href='/user/login?redirect=${redirectUrl}';
        window.location.href='/user/login';//VueRouter.createWebHistory() route.ts
    }
    return response?.data;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});

export default myAxios;