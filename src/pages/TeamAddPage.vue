<template>
    <van-form @submit="onSubmit">
        <van-cell-group inset>
            <van-field
                    v-model="addTeamData.name"
                    name="name"
                    label="队伍名"
                    placeholder="队伍名"
                    :rules="[{ required: true, message: '请输入队伍名' }]"
            />
            <!--textarea-高度自适应-->
            <van-field
                    v-model="addTeamData.description"
                    rows="4"
                    autosize
                    label="队伍描述"
                    type="textarea"
                    placeholder="请输入队伍描述"
            />
            <!--选择时间-->
            <van-field
                    is-link
                    readonly
                    name="calendar"
                    label="日历"
                    v-model="addTeamData.expireTime"
                    :placeholder="点击选择日期"
                    @click="showCalendar = true"
            />
            <van-calendar v-model:show="showCalendar" @confirm="onConfirm"/>
            <!--步进器-->
            <van-field name="stepper" label="最大人数">
                <template #input>
                    <van-stepper v-model="addTeamData.maxNum" min="3" max="10" />
                </template>
            </van-field>
            <!--单选框-->
            <van-field name="radio" label="队伍状态">
                <template #input>
                    <van-radio-group v-model="addTeamData.status" direction="horizontal">
                        <van-radio name="0">公开</van-radio>
                        <van-radio name="1">私有</van-radio>
                        <van-radio name="2">加密</van-radio>
                    </van-radio-group>
                </template>
            </van-field>
            <!--加密按钮才有密码输入框-->
            <van-field
                    v-if="Number(addTeamData.status)===2"
                    v-model="addTeamData.password"
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
    import dateformat from 'dateformat'
    import {useRouter} from "vue-router";
    import { ref } from 'vue';
    import myAxios from "../plugins/my-axios";
    import {showFailToast, showSuccessToast} from "vant";

    //表单数据类型
    const initFormData = {
        "name": "",
        "description": "",
        "expireTime": null,
        "maxNum": 3,
        "password": "",
        "status": 0,
    }

    //需要用户填写表单数据
    const addTeamData = ref({...initFormData});//扩展对象运算符，不会改变initFormData

    const router = useRouter();

    //展示日期限制器
    const showCalendar = ref(false);
    const onConfirm = (date) => {
        addTeamData.value.expireTime = `${date.getFullYear()}-${date.getMonth() + 1 >= 10 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1)}-${date.getDate() >= 10 ? date.getDate() + 1 : '0' + date.getDate()} 00:00:00`;
        showCalendar.value = false;
    };
    //await-async：等post方法响应之后再拿到值给res
    const onSubmit = async () => {
        //把status数据格式处理：string->number
        const postData = {
            ...addTeamData.value,
            status: Number(addTeamData.value.status)
        }
        //todo 参数校验
        const res = await myAxios.post("/team/add", postData);
        if(res?.code === 0 && res.data) {
            showSuccessToast('添加成功');
            router.replace("/teamPage");
        } else {
            showFailToast('添加错误');
        }
    }
</script>

<style scoped>

</style>