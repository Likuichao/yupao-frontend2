<template>
    <div id="teamPage">
<!--        <van-button type="primary" @click="doJoinTeam">加入队伍</van-button>-->
        <van-search v-model="searchText" placeholder="搜索队伍"  @search="onSearch"/>
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

    const router = useRouter();
    //队伍列表
    const teamList = ref([]);
    //搜索队伍输入框
    const searchText = ref('');
    //已经加入的队伍
    const listTeam = async (val='') => {
        const res = await myAxios.get('/team/list/join',{
            params:{
                searchText: val
            },
        });
        if(res?.code === 0) {
            teamList.value = res.data;
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
    onMounted( ()=>{
        listTeam();
    })
</script>

<style scoped>

</style>