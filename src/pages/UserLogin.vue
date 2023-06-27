<template>
    <van-form @submit="onSubmit">
        <van-cell-group inset>
            <van-field
                    v-model="userAccount"
                    name="账号"
                    label="账号"
                    placeholder="账号"
                    :rules="[{ required: true, message: '请填写账号' }]"
            />
            <van-field
                    v-model="userPassword"
                    type="password"
                    name="密码"
                    label="密码"
                    placeholder="密码"
                    :rules="[{ required: true, message: '请填写密码' }]"
            />
        </van-cell-group>
        <div style="margin: 16px;">
            <van-button round block type="primary" native-type="submit">
                提交
            </van-button>
        </div>
    </van-form>

</template>

<script setup lang="ts">
    //v-model实现数据的双向绑定

    import myAxios from "../plugins/my-axios";
    import { ref } from 'vue';
    import {showFailToast, showSuccessToast} from "vant";
    import {useRoute, useRouter} from "vue-router";

    //提供了许多编程式导航的API,eg:实现导航历史前进、后退、push
    const router = useRouter();
    const route = useRoute();
    const userAccount = ref('');
    const userPassword = ref('');

    //async 用于申明一个 function 是异步的，而 await 用于等待一个异步方法执行完成。
    //提交表单(使用await的原因：请求是异步的，会返回一堆axios对象，而不是要取的后台的响应)
    const onSubmit = async (values) => {
       const res = await myAxios.post('/user/login', {
            userAccount: userAccount.value,
            userPassword: userPassword.value
        })
        console.log(res,'用户登录');
       if(res.code === 0 && res.data){
           showSuccessToast({
               message:'登录成功',
               duration: 500
           });
           //使用重定向(现在的页面会把历史记录替换掉)，不使用push（在当前的历史记录中又压入一条新的记录）
           //跳转到之前的页面
           // const redirectUrl = route.query?.redirect as string ?? '/';//??前边的值存在就取前边的值，否则取后边的值
           router.replace('/');
       } else {
           showFailToast('登录失败');
       }
    };


</script>

<style scoped>

</style>