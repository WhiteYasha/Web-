// 宏定义
// 默认动作宏定义
const INIT_LIST = "INIT_LIST";
const CHANGE_ITEM = "CHANGE_ITEM";
// 新闻动作宏定义
const SEARCH_NEWS = "SEARCH_NEWS";

// 初始状态
const initialState = {
    shopList: [],
    dishesList: [],
    newsList: [],
    recruitList: [],
    activeItem: "home",
    initState: false
};

// 动作
export const initList = (lists) => ({
    type: INIT_LIST,
    lists
});
export const changeItem = (item) => ({
    type: CHANGE_ITEM,
    item
});
export const searchNews = (filterType, orderType) => ({
    type: SEARCH_NEWS,
    filterType,
    orderType
});

// reducer
const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case INIT_LIST:
            {
                return Object.assign({}, state, {
                    shopList: action.lists.shopList,
                    dishesList: action.lists.dishesList,
                    newsList: action.lists.newsList,
                    recruitList: action.lists.recruitList,
                    initState: true
                });
            }
        case CHANGE_ITEM:
            {
                return Object.assign({}, state, {
                    activeItem: action.item
                });
            }
        case SEARCH_NEWS:
            {
                var newState = state.filter((item) => {
                    return item.tags.indexOf(action.filterType) !== -1;
                });
                return newState;
            }
        default:
            return state;
    }
}

export default appReducer;
