<template>
    <template v-if="user">
        <van-cell title="昵称" is-link :value="user.username" @click="toEdit('username',user.username,'昵称')"/>
        <van-cell title="账号" :value="user.userAccount" />
        <!-- -->
        <van-cell title="头像" is-link @click="toEdit('avatarUrl',user.avatarUrl,'头像')">
            <img style="height: 48px" :src="user.avatarUrl">
        </van-cell>
        <van-cell title="性别" is-link :value="user.gender" @click="toEdit('gender',user.gender,'性别')"/>
        <van-cell title="电话" is-link :value="user.phone" @click="toEdit('phone',user.phone,'电话')"/>
        <van-cell title="邮箱" is-link :value="user.email" @click="toEdit('email',user.email,'邮箱')"/>
        <van-cell title="星球编号"  :value="user.planetCode"/>
        <van-cell title="注册时间"  :value="user.createTime"/>
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

    //钩子函数，页面首次加载时执行
    onMounted(async () => {
        //获取当前用户信息
        user.value = await getCurrentUser();
    })

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

</script>

<style scoped>

</style>