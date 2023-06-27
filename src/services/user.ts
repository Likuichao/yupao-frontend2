import myAxios from "../plugins/my-axios";
import {getCurrentUserState, setCurrentUserState} from "../state/user";

//做了个缓存，同一个用户到个人信息页，不用每次都使用axiso访问后端
//直接在当前缓存中找有没有currentUser（getCurrentUserState();）
export const getCurrentUser = async () =>{
    //存在当前用户，直接返回
    //使用缓存存在一个问题：个人页不能及时更新！！！
    // const currentUser = getCurrentUserState();
    // if(currentUser) {
    //     return currentUser;
    // }
    //不存在用户（用户未登录），axiso获取
    const res = await myAxios.get('/user/current');
    if(res.code === 0){
        setCurrentUserState(res.data);
        return res.data;
    }
    return null;
}