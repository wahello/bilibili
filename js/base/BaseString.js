/**
 * @flow
 * 一些公共的String
 */
    import BaseImage from '../base/BaseImage';

    const TAB_BAR_BOTTOM_LABEL_LIKE:string ='书架';
    const TAB_BAR_BOTTOM_LABEL_BOOK:string ='分类';
    const TAB_BAR_BOTTOM_LABEL_MINE:string ='我的';

    const TAB_BAR_HEADER_MINE:string ='个人中心';
    const TAB_BAR_HEADER_BOOK:string ='图书分类';
    const TAB_BAR_HEADER_LIKE:string ='我的书架';

    const LOADING_TITLE:string = '加载中...';
    const NO_HISTORY:string ='暂无浏览历史';
    const LIKE_BOOK:string ='快去收藏您喜欢的书籍 *^__^*';
    const ADD_BOOK:string = '添加书籍';
    const LOADING_OVER:string = '加载完毕';

    const BOOK_MINE_UPDATE :string = '追更';
    const BOOK_MINE_HISTORY:string = '历史';
    const BOOK_MINE_LIKE:string = '收藏';

    const BIN_TITLE:string='重新加载';
    const ERROR_TEXT:string='加载出错';

    const PEOPEL_COMMEND:string = '人评';
    const RECOMMEND:string = '编辑推荐';
    const INTRODUCTION:string = '简介';
    const NEW_CHAPTER:string = '最新章节';
    const LOOK_ALL_CHARTER:string = '点击查看所有';
    const HOE_SHORT_COMMEND:string = '热门短评';
    const ALL_SHORT_COMMEND:string = '全部短评';
    const MAY_LIKE:string = '猜你喜欢';
    const LOOK_MORE:string = '查看更多';
    const SENTIMENT:string = '人气';
    const READED_RETAINED :string='读者留存';
    const WAN:string='万';

    const BOOK_CLASS_ARRAY = ['男生','女生','漫画','出版'];
    const BOOK_TOP_CLASS_TYPE = [
        {title:'热门',label:'hot'},
        {title:'新书',label:'new'},
        {title:'好评',label:'reputation'},
        {title:'完结',label:'over'},
        {title:'VIP',label:'monthly'}];

    const BOOK_DETAIL_CLASS = [
        {title:'追书人气',number:''},
        {title:'读者存留',number:''},
        {title:'社区帖子',number:''},
        {title:'日更新字',number:''}
    ];

    const BOOK_DETAIL_CLASS_TWO = [
        {title:'追书人气',number:''},
        {title:'读者存留',number:''},
        {title:'社区帖子',number:''},
    ];

    const BOOK_LOADING_GIF = [
        BaseImage.loading_gif_one,
        null,
        BaseImage.loading_gif_two,
        null,
        BaseImage.loading_gif_three,
        null,
        BaseImage.loading_gif_four,
        null
    ];

export {
    TAB_BAR_BOTTOM_LABEL_LIKE,TAB_BAR_BOTTOM_LABEL_BOOK,TAB_BAR_BOTTOM_LABEL_MINE,
    TAB_BAR_HEADER_MINE,TAB_BAR_HEADER_BOOK,TAB_BAR_HEADER_LIKE,LOADING_TITLE,
    NO_HISTORY,LIKE_BOOK,BIN_TITLE,ERROR_TEXT,BOOK_CLASS_ARRAY,ADD_BOOK,BOOK_MINE_UPDATE,
    BOOK_MINE_HISTORY,BOOK_MINE_LIKE,BOOK_TOP_CLASS_TYPE,BOOK_DETAIL_CLASS,RECOMMEND,
    PEOPEL_COMMEND,INTRODUCTION,NEW_CHAPTER,HOE_SHORT_COMMEND,ALL_SHORT_COMMEND,MAY_LIKE,
    LOOK_MORE,SENTIMENT,READED_RETAINED,WAN,LOADING_OVER,LOOK_ALL_CHARTER,BOOK_DETAIL_CLASS_TWO,
    BOOK_LOADING_GIF
}