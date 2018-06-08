/**
 * @flow
 */
import {observable,action,runInAction,toJS} from 'mobx';
import {BaseApi,BookApi} from "../assest/api";
import {HttpUtils} from "../utils/HttpUtils";
import {BasePageStore} from "./BasePageStore";
import {BaseString} from "../base";
import {Toast} from "teaset";
import {getTime,getSize} from "../fun";


interface BookDetail {

    evaluation_data:Array<any>,
    evaluation_total:string|number,
    recommend_data:Array<any>,
    bookTitle:string,
    chapter_data:Array<any>,
    cover:string,
    title:string,
    author:string,
    majorCate:string,
    lastChapter:string,
    score:number,
    copyright:boolean,
    nowDate:number,
    date:number,
    latelyFollower:number,
    serializeWordCount:number,
    postCount:number,
    retentionRatio:number,
    array1:Array<any>,
    array2:Array<any>,
    wordCount:number,
    longIntro:string,
    originalPriceText:string,
    commentTitle:string,
    showRecommendedView:boolean,
    showCopyright:boolean

}

export default class BookDetailStore extends BasePageStore implements BookDetail {


    @observable chapter_data=[];
    @observable recommend_data=[];
    @observable bookTitle='';
    @observable evaluation_total='';
    @observable evaluation_data=[];
    @observable cover;
    @observable title;
    @observable author;
    @observable majorCate;
    @observable lastChapter;
    @observable score;
    @observable copyright;
    @observable nowDate;
    @observable date;
    @observable latelyFollower;
    @observable serializeWordCount;
    @observable postCount;
    @observable retentionRatio;
    @observable array1=[];
    @observable array2=[];
    @observable wordCount;
    @observable longIntro;
    @observable originalPriceText;
    @observable commentTitle;
    @observable showRecommendedView;
    @observable showCopyright;

    constructor(){
        super();
    }

    @action fetchBookDetail=async(id)=>{

        this.setLoading(true);
        let url = BaseApi.BookBase1+BookApi.booId+id;
        let comment_url = BaseApi.BookBase1+'/books/'+id+'/editor-comments?n=1';
        let evaluation_url =BaseApi.BookBase1+BookApi.short_evaluation+id;
        let recommend_url = BaseApi.BookBase1+'/book/'+id+BookApi.recommend;
        let pricr_url = BaseApi.BookBase1+'/book/'+id+BookApi.price;
        let original_url = BaseApi.BookBase1+BookApi.btoc;

        const params = {limit:3, total:true, sortType:'hottest'};
        const params1={view:'summary', book:id};
        const recommend_params = {packageName:'com.ushaqi.zhuishushenqi'};

        try{
            const data = await HttpUtils.get(url);
            const comment = await HttpUtils.get(comment_url);
            const evaluation_data = await HttpUtils.get(evaluation_url,params);
            const recommend_data = await HttpUtils.get(recommend_url,recommend_params);
            const pricr_data = await HttpUtils.get(pricr_url);
            const original_data = await HttpUtils.get(original_url,params1);
            runInAction(()=>{
                this.setDetail(data,comment.docs);
                this.bookDetail = data;
                this.evaluation_data = evaluation_data.docs;
                this.evaluation_total = evaluation_data.total;
                this.recommend_data = recommend_data.books;
                this.originalPriceText = pricr_data.doc.originalPriceText;
                this.bookTitle = data.title;
                this.chapterFetchData(original_data[0]._id,data);
                setTimeout(()=>{
                    this.setLoading(false)
                },1500);

            })
        }catch (e) {
            console.log(e);
            Toast.fail(BaseString.ERROR_TEXT)
        }

    };

    @action chapterFetchData=(id, dataSource)=>{

        let url = BaseApi.BookBase1+BookApi.atoc+id;
        const params = {view:'chapters'};
        HttpUtils.get(url,params).then(action(data=>{
            this.chapter_data = data.chapters;
            console.log(data.chapters)
        })).catch((e)=>{
            console.log(e);
        })
    };

    @action setDetail=(bookDetail,comment_data)=>{

        const data = toJS(bookDetail);
        const comment = comment_data.slice(0);

        if (data){

            this.cover = BaseApi.BookBase4 + data.cover;

            this.title = data.title;
            this.author = data.author;
            this.majorCate = data.majorCate;
            this.lastChapter = data.lastChapter;
            const score = data.rating;
            if (score){
                this.score = score.score.toFixed(1);
                this.count = getSize(score.count,1);
            }
            const copyright = data.copyright;
            if (copyright){
                this.copyright = copyright;
                this.showCopyright = true
            }else {
                this.showCopyright = false;
            }
            this.nowDate = new Date();
            this.date =  getTime(data.updated,this.nowDate);
            this.latelyFollower = getSize(data.latelyFollower,1); //人气
            this.serializeWordCount = getSize(data.serializeWordCount,1); //更新字数
            this.postCount = getSize(data.postCount,1); //帖子
            this.retentionRatio = data.retentionRatio + '%';  //留存
            if (data.serializeWordCount>-1){
                this.array1 = BaseString.BOOK_DETAIL_CLASS;
                this.array2 = [this.latelyFollower,this.retentionRatio,this.postCount,this.serializeWordCount];
                this.wordCount = getSize(data.wordCount,0)+' 字';

            }else {
                this.array1 = BaseString.BOOK_DETAIL_CLASS_TWO;
                this.array2 = [this.latelyFollower,this.retentionRatio,this.postCount];
                this.wordCount = data.chaptersCount +' 话';
            }
            this.longIntro = data.longIntro;
            if (comment[0]){
                //console.log(666,comment[0].comment);
                if (comment[0].comment.length>0){
                    this.commentTitle = comment[0].comment;
                    this.showRecommendedView= true;
                }else {
                    this.showRecommendedView= false;
                }
            }else {
                this.showRecommendedView= false;
            }

        }

    }
}