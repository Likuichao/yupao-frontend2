<template>
    <!--引入展示用户列表组件-UserCardList.vue  user-list等同于userList-->
    <user-card-list :user-list="userList"/>
    <!--如果没有查询到用户，处理-->
    <van-empty description="数据为空" v-if="!userList || userList.length<1"/>
</template>

<script setup lang="ts">
    import { ref, onMounted } from 'vue';
    import {useRoute} from "vue-router";
    import myAxios from "../plugins/my-axios";
    import qs from 'qs';
    import {Toast} from "vant/es";
    import {showFailToast, showSuccessToast} from "vant";

    //使用路由
    const route = useRoute();
    //获取由路由（跳转页面）传递的参数（选中的标签）；再交由axios向后端发起请求
    const {tags} = route.query;
    //根据tags查询到的用户信息
    const userList = ref([]);

    //向后端发起请求
    onMounted(async ()=>{
        //await等待请求完成，才得到userList
        const userListData = await myAxios.get('/user/search/tags',{
            params:{
                tagNameList: tags //tags交由axios向后端发起请求
            },
            //对参数序列化
            paramsSerializer: params => {
                return qs.stringify(params, { arrayFormat: 'repeat' })
            }
        }).then(function (response) {
            console.log('/user/search/tags',response);
            showSuccessToast('请求成功');
            //my-axios.js中返回的是response?.data，所以只需要再取.data即可
            return response.data;

        }).catch(function (err) {
            console.log('/user/search/tags',err);
            showFailToast('请求失败');
        })
        //如果请求到数据userListData，就赋值给userList
        if(userListData){
            //把json数据转成数组
            userListData.forEach(user =>{
                if(user.tags){
                    user.tags=JSON.parse(user.tags);
                }
            })
            userList.value=userListData;
        }
    })

    const mockUser = ref({
        id: 1111,
        username: 'yupi',
        userAccount: '11111',
        avatarUrl: 'https://img-blog.csdnimg.cn/20201014180756757.png?x-oss-process=image/resize,m_fixed,h_64,w_64',
        gender: '男',
        phone: '123344444',
        email: '1111@qq.com',
        tags: ['java','c++','python','java','c++','python','java','c++','python'],
        profile: "我是好海西，还有hi阿㕛后ID哦东欧的,我是好海西，还有hi阿㕛后ID哦东欧的",
    })
</script>

<style scoped>

</style>