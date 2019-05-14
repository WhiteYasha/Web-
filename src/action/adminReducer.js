//  动作宏定义
const INIT_LIST = "INIT_LIST";
const CHANGE_ITEM = "CHANGE_ITEM";
const CHANGE_LOGIN_STATE = "CHANGE_LOGIN_STATE";
const CHANGE_PATH = "CHANGE_PATH";
const ADD_NEWS = "ADD_NEWS";
const DELETE_NEWS = "DELETE_NEWS";
const UPDATE_NEWS = "UPDATE_NEWS";
const READ_MESSAGES = "READ_MESSAGES";

const initialState = {
    loginState: false, //  登录状态
    activeMenuItem: ["home"], //  当前选中的目录条目
    shopList: [], //  全部门店信息列表
    dishesList: [], //  全部菜品信息列表
    newsList: [], //  全部新闻信息列表
    recruitList: [], //  全部招聘信息列表
    messageList: [],
    visitList: [] //  全部访问量列表
};

export const initList = (lists) => ({
    type: INIT_LIST,
    lists
});
export const changeLoginState = state => ({
    type: CHANGE_LOGIN_STATE,
    state
});
export const changeItem = item => ({
    type: CHANGE_ITEM,
    item
});
export const changePath = path => ({
    type: CHANGE_PATH,
    path
});
export const addNews = news => ({
    type: ADD_NEWS,
    news
});
export const deleteNews = id => ({
    type: DELETE_NEWS,
    id
});
export const updateNews = news => ({
    type: UPDATE_NEWS,
    news
});
export const readMessages = id => ({
    type: READ_MESSAGES,
    id
});

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case INIT_LIST:
            {
                return Object.assign({}, state, {
                    shopList: action.lists.shopList,
                    dishesList: action.lists.dishesList,
                    newsList: action.lists.newsList,
                    recruitList: action.lists.recruitList,
                    messageList: action.lists.messageList,
                    visitList: action.lists.visitList
                });
            }
        case CHANGE_LOGIN_STATE:
            {
                return Object.assign({}, state, {
                    loginState: action.state
                });
            }
        case CHANGE_ITEM:
            {
                return Object.assign({}, state, {
                    activeMenuItem: action.item
                });
            }
        case CHANGE_PATH:
            {
                return Object.assign({}, state, {
                    breadPath: action.path
                });
            }
        case ADD_NEWS:
            {
                var newNewsList = state.newsList;
                newNewsList.unshift(action.news);
                return Object.assign({}, state, {
                    newsList: newNewsList
                });
            }
        case DELETE_NEWS:
            {
                return Object.assign({}, state, {
                    newsList: state.newsList.filter((item) => item.id !== action.id)
                });
            }
        case UPDATE_NEWS:
            {
                return Object.assign({}, state, {
                    newsList: state.newsList.map((item) => item.id === action.news.id ? action.news : item)
                });
            }
        case READ_MESSAGES:
            {
                return Object.assign({}, state, {
                    messageList: state.messageList.map((item) => action.id.indexOf(item.id) === -1 ? item : Object.assign({}, item, {
                        watched: 1
                    }))
                });
            }
        default:
            return state;
    }
}

export default appReducer;
