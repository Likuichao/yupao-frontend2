<template>
    <template v-if="user">
        <van-cell title="当前用户" :value="user?.username"/>
        <van-cell title="修改信息" is-link to="/user/update"/>
        <van-cell title="我创建的队伍" is-link to="/user/team/create" />
        <van-cell title="我加入的队伍" is-link to="/user/team/join" />
<!--        <van-cell title="创建队伍" is-link to="/team/add" />-->
    </template>

</template>

<script setup lang="ts">
    import {useRouter} from "vue-router";
    import {onMounted, ref} from "vue";
    import myAxios from "../plugins/my-axios";
    import {showFailToast, showSuccessToast} from 'vant';
    import {getCurrentUser} from "../services/user";
    //个人信息
    // const user = {
    //     id: 1,
    //     username: 'lkc',
    //     userAccount: 'lkc666',
    //     avatarUrl: 'https://himg.bdimg.com/sys/portraitn/item/public.1.dfa6853a.Fx7T-JS9JHTg2ZlB4UF4Ew',
    //     gender: '男',
    //     phone: '1234567788',
    //     email: '123444@qq.com',
    //     createTime: new Date(),
    //     planetCode:'1234',
    // };

    const user = ref();

    //路由实现页面跳转加传参（query）
    const router = useRouter();
    //点击toEdit方法，进行路由跳转,进入到修改信息页面
    const toEdit = (editKey: string,currentValue:string,editName:string) => {
        router.push({
            path: '/user/edit',
            query: {
                editKey,
                currentValue,
                editName
            }
        })
    }

    //钩子函数，页面首次加载时执行
    onMounted(async () => {
        //获取当前用户信息
        user.value = await getCurrentUser();
        // if(!user.value){
        //     router.push({
        //         path: '/user/login'
        //     });
        // }
    })

</script>

<style scoped>

</style>