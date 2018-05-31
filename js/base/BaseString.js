/**
 * @flow
 */

type String = {

    TabBarItem:any;
    TabBarHeader:any;
    LOADINGTITLE:string;
    HISTORY:string,
    LIKEBOOK:string

}

const BaseString:String = {

    TabBarItem:{
        LIKE:'书架',
        BOOK:'分类',
        MINE:'我的'
    },

    TabBarHeader:{
        LIKE:'我的书架',
        BOOK:'图书分类',
        MINE:'个人中心'
    },

    LOADINGTITLE:'加载中...',
    HISTORY:'暂无浏览历史',
    LIKEBOOK:'快去收藏您喜欢的书籍 *^__^*',



};

export default BaseString;