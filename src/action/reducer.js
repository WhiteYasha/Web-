// 宏定义
// 默认动作宏定义
const INIT_LIST = "INIT_LIST";
const CHANGE_ITEM = "CHANGE_ITEM";
// 新闻动作宏定义
const SEARCH_NEWS = "SEARCH_NEWS";
// 菜品动作宏定义
const FILTER_DISHES = "FILTER_DISHES";

// 初始状态
const initialState = {
    shopList: [],           //  全部门店信息列表
    dishesList: [],         //  全部菜品信息列表
    newsList: [],           //  全部新闻信息列表
    recruitList: [],        //  全部招聘信息列表
    activeItem: "home",     //  当前的目录
    initState: false,       //  是否已初始化完成
    showDishesList: [],     //  显示的菜品信息视图
    showNewsList: [],       //  显示的新闻信息视图
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
export const filterDishes = (filterType) => ({
    type: FILTER_DISHES,
    filterType
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
                    initState: true,
                    showDishesList: action.lists.dishesList,
                    showNewsList: action.lists.newsList
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
        case FILTER_DISHES:
            {
                if (action.filterType === "全部") {
                    return Object.assign({}, state, {
                        showDishesList: state.dishesList
                    });
                }
                else {
                    return Object.assign({}, state, {
                        showDishesList: state.dishesList.filter((item) => {
                            return item.tags.indexOf(action.filterType) !== -1;
                        })
                    });
                }
            }
        default:
            return state;
    }
}

export default appReducer;
