// 定义一些路由,每个路由都需要映射到一个组件(页面跳转规则)
import Index from "../pages/Index.vue";
import TeamPage from "../pages/TeamPage.vue";
import UserEditPage from "../pages/UserEditPage.vue";
import UserPage from "../pages/UserPage.vue";
import UserUpdatePage from "../pages/UserUpdatePage.vue";
import SearchPage from "../pages/SearchPage.vue";
import SearchResultPage from "../pages/SearchResultPage.vue";
import UserLogin from "../pages/UserLogin.vue";
import TeamAddPage from "../pages/TeamAddPage.vue";
import TeamUpdatePage from "../pages/TeamUpdatePage.vue";
import UserTeamJoinPage from "../pages/UserTeamJoinPage.vue";
import UserTeamCreatePage from "../pages/UserTeamCreatePage.vue";

const routes = [
    { path: '/', component: Index },
    { path: '/teamPage', title:'队伍',component: TeamPage },
    { path: '/userPage', title:'用户中心',component: UserPage },
    { path: '/user/edit', title:'编辑用户',component: UserEditPage },
    { path: '/user/list', title:'用户列表',component: SearchResultPage },
    { path: '/search', title:'找伙伴',component: SearchPage },
    { path: '/user/login', title:'用户登录',component: UserLogin },
    { path: '/team/add', title:'添加队伍',component: TeamAddPage },
    { path: '/team/update', title:'更新队伍',component: TeamUpdatePage },
    { path: '/user/update', title:'更新用户',component: UserUpdatePage },
    { path: '/user/team/join', title:'加入队伍',component: UserTeamJoinPage },
    { path: '/user/team/create', title:'创建队伍',component: UserTeamCreatePage },
]

export default routes;