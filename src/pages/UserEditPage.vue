<template>
    <!--修改表单--->
    <van-form @submit="onSubmit">
        <van-cell-group inset>
            <!--参数动态传入-->
            <van-field
                    v-model="editUser.currentValue"
                    :name="editUser.editKey"
                    :label="editUser.editName"
                    :placeholder="'请输入'+editUser.editName"
            />
        </van-cell-group>
        <!--表单提交-->
        <div style="margin: 16px;">
            <van-button round block type="primary" native-type="submit">
                提交
            </van-button>
        </div>
    </van-form>

</template>

<script setup lang="ts">
    import {useRoute, useRouter} from "vue-router";
    import { ref } from 'vue';
    import myAxios from "../plugins/my-axios";
    import {showFailToast, showSuccessToast} from "vant";
    import {getCurrentUser} from "../services/user";

    //提供了许多编程式导航的API,eg:实现导航历史前进、后退、push(跳转到指定 hash 地址，并增加一条历史记录)
    const router = useRouter();
    //获取动态路由参数(route相当于当前正在跳转的路由对象。每一个路由都会有一个router对象，可以从里面获取name,path,params等)
    const route = useRoute();

    const editUser = ref({
        editKey: route.query.editKey,
        currentValue: route.query.currentValue,
        editName: route.query.editName
    })

    //提交
    const  onSubmit = async () => {
        //获取当前用户
        const currentUser = await getCurrentUser();
        //判空
        if(!currentUser) {
            showFailToast('用户未登录');
        }
        //提交更新请求-post方式
        const res = await myAxios.post('/user/update',{
            'id': currentUser.id,//先用假数据
            //[]括起来可以传一个变量
            [editUser.value.editKey]: editUser.value.currentValue
        })
        console.log(res, '更新请求');
        if(res.code === 0 && res.data > 0){
            showSuccessToast({
                message:'修改成功',
                duration: 500
            });
            //返回到上一页（导航历史后退）
            router.back();
        } else {
            showFailToast('修改错误');
        }
        //todo 把editKey，currentValue，editName提交到后台
    };
</script>

<style scoped>

</style>