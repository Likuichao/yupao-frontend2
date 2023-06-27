<!--组件-->
<template>
    <div id="team-list">
        <van-card
                v-for="team in teamList"
                :desc="team.description"
                :title="team.name"
                :thumb="photo1"
        >
            <template #tags>
                <van-tag plain type="primary" style="margin-right: 8px; margin-top: 8px">
                    {{
                    teamStatusEnum[team.status]
                    }}
                </van-tag>
            </template>
            <template #bottom>
                <div>
                    {{'队伍人数:'+team.hasJoinNum+'/'+team.maxNum}}
                </div>
                <div v-if="team.expireTime">
                    {{ '过期时间: ' + new Date(team.expireTime).getFullYear() + '-' + (new Date(team.expireTime).getMonth() + 1) + '-' + (new Date(team.expireTime).getDate())}}
                </div>
                <div>
                    {{ '创建时间: ' + new Date(team.createTime).getFullYear() + '-' + (new Date(team.createTime).getMonth() + 1) + '-' + (new Date(team.createTime).getDate())  }}
                </div>
            </template>
            <template #footer>
                <!--除了管理员之外的并且没有加入队伍的成员-可以尝试加入队伍（显示加入队伍按钮）-->
                <van-button plain type="primary" size="mini" v-if="team.userId!==currentUser?.id && !team.hasJoin"
                            @click="preJoinTeam(team)">加入队伍
                </van-button>
                <!--todo 强制登录，前端全局响应拦截，自动跳转到登录页-->
                <!--更新队伍仅创建人可见-->
                <van-button  v-if="team.createUser.id === currentUser?.id" size="mini"
                             @click="doUpdateTeam(team.id)">更新队伍
                </van-button>
                <!--仅加入队伍的成员可见-->
                <van-button  size="mini"
                             v-if="team.hasJoin"
                             @click="doQuitTeam(team.id)">退出队伍
                </van-button>
                <!--解散队伍仅创建人可见-->
                <van-button  size="mini" type="danger" plain
                             v-if="team.createUser.id === currentUser?.id"
                             @click="doDeleteTeam(team.id)">解散队伍
                </van-button>
            </template>
        </van-card>
        <van-dialog v-model:show="showPasswordDialog" title="请输入密码" show-cancel-button @confirm="doJoinTeam" @cancel="doJoinCancel">
            <van-field v-model="password" placeholder="请输入密码"/>
        </van-dialog>
    </div>
</template>

<script setup lang="ts">
    import {teamType} from "../models/team";
    import {teamStatusEnum} from "../constants/team";
    import photo1 from "../assets/photo1.jpg"
    import myAxios from "../plugins/my-axios";
    import {showFailToast, showSuccessToast} from "vant";
    import {getCurrentUserState} from "../state/user";
    import {onMounted,ref} from "vue";
    import {getCurrentUser} from "../services/user";
    import {useRouter} from "vue-router";

    const router = useRouter();
    const password=ref('');
    const showPasswordDialog = ref(false);
    const joinTeamId = ref(0);

    interface TeamCardListProps{
        teamList: teamType[];
    }

    const currentUser = ref();

    onMounted(async () => {
        currentUser.value = await getCurrentUser();
    })

    //使用withDefaults，设置默认值；为了避免主页传递过来的数据为空
    const props = withDefaults(defineProps<TeamCardListProps>(), {
        teamList: [] as teamType[],
    });

    //加入队伍
    const doJoinTeam = async () =>{
        if (!joinTeamId.value){
            return;
        }
        const res = await myAxios.post('/team/join',{
            teamId: joinTeamId.value,
            password: password.value
        })
        if (res?.code === 0) {
            showSuccessToast({
                message:'加入成功',
                duration: 500
            });
            doJoinCancel();
        } else {
            showFailToast({
                message:'加入失败' + (res.description ? `，${res.description}` : ''),
                duration: 500
            });
        }
    }

    /**
     * 判断是不是加密房间，是的话显示密码框
     * @param team
     */
    const preJoinTeam = (team: teamType) => {
        joinTeamId.value = team.id;
        if (team.status === 0) {
            doJoinTeam()
        } else {
            showPasswordDialog.value = true;
        }
    }

    const doJoinCancel = () => {
        joinTeamId.value = 0;
        password.value = '';
    }

    //更新队伍，跳转至用户更新页
    const doUpdateTeam = (id:number) => {
        router.push({
            path: '/team/update',
            query: {
                id
            }
        })
    }

    //退出队伍
    const doQuitTeam = async (id:number) => {
        const res = await myAxios.post('/team/quit',{
            teamId: id
        })
        if(res?.code === 0) {
            showSuccessToast('退出成功');
        } else {
            showFailToast('退出失败');//todo +(res.description ? ',${res.description}' : '')
        }
    }

    //解散队伍
    const doDeleteTeam = async (id:number) => {
        const res = await myAxios.post('/team/delete',{
            id
        })
        if(res?.code === 0) {
            showSuccessToast('解散成功');
        } else {
            showFailToast('解散失败');//todo +(res.description ? ',${res.description}' : '')
        }
    }

</script>

<script>
    
</script>

<style scoped>

</style>