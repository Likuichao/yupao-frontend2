<template>
    <van-skeleton title avatar :row="3" :loading="loading" v-for="user in userList">
        <van-card
                :desc="user.profile"
                :title="user.username"
                :thumb="user.avatarUrl"
        >
            <template #tags>
                <van-tag plain type="primary" v-for="tag in user.tags" style="margin-right: 8px; margin-top: 8px">{{tag}}</van-tag>
            </template>
            <template #footer>
                <van-button size="mini">联系我</van-button>
            </template>
        </van-card>
    </van-skeleton>
</template>

<script setup lang="ts">
    import {userType} from "../models/user";
    interface UserCardListProps{
        loading: boolean
        userList: userType[];
    }
    //使用withDefaults，设置默认值；为了避免主页传递过来的数据为空
    const props = withDefaults(defineProps<UserCardListProps>(), {
        loading: true,
        userList: [] as userType[],
    });
</script>

<style scoped>

</style>