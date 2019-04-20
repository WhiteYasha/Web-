const CHANGE_ITEM = "CHANGE_ITEM";
// 新闻动作
const SEARCH_NEWS = "SEARCH_NEWS";

const initialState = {
    shopList: [{
            name: "新白鹿 (杭州游泳馆店)",
            address: "杭州中山北路572号",
            phone: "0571-87910599"
        },
        {
            name: "新白鹿 (杭州龙游店)",
            address: "下城区龙游路65号",
            phone: "0571-87922071"
        },
        {
            name: "新白鹿 (杭州银西店)",
            address: "杭州延安路98号（银泰西湖店二楼）",
            phone: "0571-87002266"
        }
    ],
    dishList: [{
        name: "鱼羊鲜",
        tag: "招牌菜",
        introduction: "鱼羊鲜",
        rate: 4
    }, {
        name: "醉红枣",
        tag: "头盘冷菜",
        introduction: "红枣",
        rate: 3.5
    }, {
        name: "竹园鸡",
        tag: "私房美味",
        introduction: "鸡肉",
        rate: 4
    }],
    newsList: [{
        title: "专家建言餐饮转型：转方式调结构 迎大众化时代",
        date: "2013-03-31",
        author: "",
        source: "",
        tags: ["行业新闻"],
        content: "",
        views: 0,
        likes: 0
    }],
    activeItem: "home"
};

export const changeItem = (item) => ({
    type: CHANGE_ITEM,
    item
});
export const searchNews = (filterType, orderType) => ({
    type: SEARCH_NEWS,
    filterType,
    orderType
});

const appReducer = (state = initialState, action) => {
    switch (action.type) {
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
