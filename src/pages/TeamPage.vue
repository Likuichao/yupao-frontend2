<template>
    <div id="teamPage">
        <van-button class="add-button" icon="plus" type="primary" @click="doJoinTeam"></van-button>
        <van-search v-model="searchText" placeholder="搜索队伍"  @search="onSearch"/>
        <van-tabs v-model:active="active" @change="onTabChange">
            <van-tab title="公开" name="public"></van-tab>
            <van-tab title="加密" name="private"></van-tab>
        </van-tabs>
        <div style="margin-bottom: 16px"></div>
        <!--引入展示用户列表组件-TeamCardList.vue  user-list等同于userList-->
        <team-card-list :team-list="teamList"/>
        <!--如果没有查询到用户，处理-->
        <van-empty description="数据为空" v-if="teamList?.length<1"/>
    </div>
</template>

<script setup lang="ts">
    import {useRouter} from "vue-router";
    import {onMounted} from "vue";
    import myAxios from "../plugins/my-axios";
    import {showFailToast, showSuccessToast, showToast} from "vant";
    import {ref} from "vue";
    const active = ref('public');

    const router = useRouter();
    //队伍列表
    const teamList = ref([]);
    const originList = ref([]);
    //搜索队伍输入框
    const searchText = ref('');

    //切换查询状态
    const onTabChange = (name) => {
        if (name === 'public') {
            // 待补充 originList
            teamList.value = originList.value.filter(item => item.status === 0);
        } else {
            teamList.value = originList.value.filter(item => item.status === 2);
        }
    }
    // const onTabChange = (name) => {
    //     if(name === 'public') {
    //         listTeam(searchText.value,0);
    //     } else {
    //         listTeam(searchText.value,2);
    //     }
    // }

    //搜索队伍
    const listTeam = async (val='',status = 0) => {
        const res = await myAxios.get('/team/list',{
            params:{
                searchText: val,
                status
            },
        });
        if(res?.code === 0) {
            teamList.value = res.data;
            originList.value = res.data;
            showSuccessToast({
                message:'搜索成功',
                duration: 500
            });
        } else {
            showFailToast('搜索错误');
        }
    };
    //添加队伍
    const doJoinTeam = () => {
        router.push({
            path:'/team/add'
        })
    }
    //搜索队伍
    const onSearch =  (val) => {
        listTeam(val);
    }
    //页面加载时只触发一次
    onMounted( async ()=>{
        await listTeam();
        teamList.value = originList.value.filter(item => item.status === 0);
    })
</script>

<style scoped>

</style>