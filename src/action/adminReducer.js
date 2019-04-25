//  动作宏定义
const CHANGE_LOGIN_STATE = "CHANGE_LOGIN_STATE";

const initialState = {
    loginState: false,      //  登录状态
    activeMenuItem: "home", //  当前选中的目录条目
    shopList: [],           //  全部门店信息列表
    dishesList: [],         //  全部菜品信息列表
    newsList: [],           //  全部新闻信息列表
    recruitList: [],        //  全部招聘信息列表
};

export const changeLoginState = state => ({
    type: CHANGE_LOGIN_STATE,
    state
});

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_LOGIN_STATE:
        {
            return Object.assign({}, state, {
                loginState: action.state
            });
        }
        default:
            return state;
    }
}

export default appReducer;
