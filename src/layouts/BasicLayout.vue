<template>
    <!--导航栏-->
    <van-nav-bar
            :title="title"
            left-arrow
            @click-left="onClickLeft"
            @click-right="onClickRight"
    >
    <template #right>
        <van-icon name="search" size="18" />
    </template>
     </van-nav-bar>
    <!--内容页-->
    <div id="content">
        <router-view/>
<!--        <template v-if="active === 'index'">-->
<!--            <Index/>-->
<!--        </template>-->
<!--        <template v-if="active === 'team'">-->
<!--            <Team/>-->
<!--        </template>-->
    </div>
    <!--tab栏-->
<!--    <van-tabbar v-model="active" @change="onChange">-->
<!--        <van-tabbar-item icon="home-o" name="index">主页</van-tabbar-item>-->
<!--        <van-tabbar-item icon="search" name="team">队伍</van-tabbar-item>-->
<!--        <van-tabbar-item icon="friends-o" name="user">个人中心</van-tabbar-item>-->
<!--    </van-tabbar>-->
    <van-tabbar @change="onChange">
        <van-tabbar-item icon="home-o" name="index" to="/">主页</van-tabbar-item>
        <van-tabbar-item icon="search" name="team" to="/teamPage">队伍</van-tabbar-item>
        <van-tabbar-item icon="friends-o" name="user" to="/userPage">个人中心</van-tabbar-item>
    </van-tabbar>
</template>

<script setup lang="ts">
    import { showToast } from 'vant';
    import {useRouter,useRoute} from "vue-router";
    import {ref} from "vue";
    import routes from "../config/route";
    //声明路由
    const  router = useRouter();
    const route = useRoute();

    //标题显示
    const DEFAULT_TITlE='伙伴匹配';
    const title = ref(DEFAULT_TITlE);
    /**
     * 根据路由切换标题
     */
    router.beforeEach((to, form) => {
        const toPath = to.path;
        const route = routes.find((route) => {
            return toPath === route.path;
        })
        title.value = route?.title ?? DEFAULT_TITlE;
    })


    //编程式路由，实现页面跳转,回到上一个页面
    const onClickLeft = () => {
        router.back();
    }
    //编程式路由，实现页面跳转到搜索页
    const onClickRight = () => {
        router.push('/search');
    };
    // const active = ref("index");//高亮,根据name设置
    // const onChange = (index) => showToast(`${index}`);
</script>
<style scoped>
    #content {
        padding-bottom: 50px;
    }
</style>