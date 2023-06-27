import { createApp } from 'vue'
import App from './App.vue'
import { NavBar, Icon, Tabbar, TabbarItem, Search, Col, Row,Cell, CellGroup, Button,Card,NoticeBar } from 'vant';
import { Empty, Form, Field,Calendar,Switch,Skeleton,
    SkeletonTitle,
    SkeletonImage,
    SkeletonAvatar,
    SkeletonParagraph} from 'vant';
import * as VueRouter from 'vue-router'
import routes from "./config/route";
import '../global.css';
const app = createApp(App);
//按需引入组件
app.use(NavBar);
app.use(Icon);
app.use(Tabbar);
app.use(TabbarItem);
app.use(Search);
app.use(Col);
app.use(Row);
app.use(Cell);
app.use(CellGroup);
app.use(Button);
app.use(Card);
app.use(NoticeBar);
app.use(Empty);
app.use(Form);
app.use(Field);
app.use(Calendar);
app.use(Switch);
app.use(Skeleton);
app.use(SkeletonTitle);
app.use(SkeletonImage);
app.use(SkeletonAvatar);
app.use(SkeletonParagraph);
// 创建路由实例并传递 routes 配置;内部提供了 history 模式的实现。
const router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    routes // routes: routes 的缩写
});
app.use(router);
app.mount('#app'); //挂载在app上

