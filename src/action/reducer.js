// 宏定义
// 默认动作宏定义
const INIT_LIST = "INIT_LIST";
const CHANGE_ITEM = "CHANGE_ITEM";
// 新闻动作宏定义
const FILTER_NEWS = "FILTER_NEWS";
const CHANGE_NEWS_STATE = "CHANGE_NEWS_STATE";
// 菜品动作宏定义
const FILTER_DISHES = "FILTER_DISHES";
const CHANGE_DISH_STATE = "CHANGE_DISH_STATE";

// 初始状态
const initialState = {
    shopList: [], //  全部门店信息列表
    dishesList: [], //  全部菜品信息列表
    newsList: [], //  全部新闻信息列表
    recruitList: [], //  全部招聘信息列表
    activeItem: "home", //  当前的目录
    showDishesList: [], //  显示的菜品信息视图
    showNewsList: [], //  显示的新闻信息视图
    loadState: {
        initState: false, //  主体初始化状态
        dishState: false, //  菜品初始化状态
        newsState: false, //  新闻初始化状态
    }
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
export const filterNews = (filterType, sortType) => ({
    type: FILTER_NEWS,
    filterType,
    sortType
});
export const changeNewsState = (newsState) => ({
    type: CHANGE_NEWS_STATE,
    newsState
});
export const filterDishes = (filterType) => ({
    type: FILTER_DISHES,
    filterType
});
export const changeDishState = (dishState) => ({
    type: CHANGE_DISH_STATE,
    dishState
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
                    loadState: {
                        initState: true,
                        dishState: true,
                        newsState: true
                    },
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
        case CHANGE_NEWS_STATE:
            {
                return Object.assign({}, state, {
                    loadState: {
                        dishState: state.loadState.dishState,
                        newsState: action.newsState
                    }
                });
            }
        case FILTER_NEWS:
            {
                var newNewsList = state.newsList;
                if (action.filterType !== "all") {
                    newNewsList = newNewsList.filter((item) => {
                        return item.tags.indexOf(action.filterType) !== -1;
                    });
                }
                if (action.sortType === "newest") {
                    newNewsList.sort((a, b) => {
                        return b.date.localeCompare(a.date);
                    });
                }
                else {
                    newNewsList.sort((a, b) => {
                        return b.views - a.views;
                    })
                }
                return Object.assign({}, state, {
                    showNewsList: newNewsList,
                    loadState: {
                        dishState: state.loadState.dishState,
                        newsState: true
                    }
                });
            }
        case CHANGE_DISH_STATE:
            {
                return Object.assign({}, state, {
                    loadState: {
                        dishState: action.dishState,
                        newState: state.loadState.newState
                    }
                });
            }
        case FILTER_DISHES:
            {
                if (action.filterType === "全部") {
                    return Object.assign({}, state, {
                        showDishesList: state.dishesList,
                        loadState: Object.assign({}, state.loadState, {
                            dishState: true
                        })
                    });
                } else {
                    return Object.assign({}, state, {
                        showDishesList: state.dishesList.filter((item) => {
                            return item.tags.indexOf(action.filterType) !== -1;
                        }),
                        loadState: Object.assign({}, state.loadState, {
                            dishState: true
                        })
                    });
                }
            }
        default:
            return state;
    }
}

export default appReducer;
