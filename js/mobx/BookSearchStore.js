/**
 * @flow
 */
import {observable,action,runInAction,toJS,computed} from 'mobx';
import {BaseApi,BookApi} from "../assest/api";
import {HttpUtils} from "../utils/HttpUtils";
import {BasePageStore} from "./BasePageStore";

interface BookSearch{
    hotBook:Array<any>,
    bookResult:Array<any>,
    textInputContext:string,
    automatically:Array<any>,
    auther:string,
    autherList:Array<any>,
    hotRecommended:Array<any>,
    ugcBooklist:Array<any>,
    questionsList:Array<any>,
    communityList:Array<any>
}

export default class BookSearchStore extends BasePageStore implements BookSearch{

    @observable hotBook=[];
    @observable bookResult=[];
    @observable textInputContext='';
    @observable automatically=[];
    @observable atuher='';
    @observable autherList=[];
    @observable hotRecommended=[];
    @observable ugcBooklist=[];
    @observable questionsList=[];
    @observable communityList=[];

    constructor(){
        super();
    }

    //热词搜索
    @action
    async fetchHotwords(){

         let url = BaseApi.BookBase1 +BookApi.hotwords;

         try{
             const dataSource = await HttpUtils.get(url);
             runInAction(()=>{
                 this.hotBook = dataSource.searchHotWords;
             })
         }catch (e) {
            console.log(e);
            this.hotBook.length ===0?this.setError(true):this.showToast(true)
         }
    }
    //热门推荐
    @action
    async fetchHotRecommended(){
        let url = BaseApi.BookBase1 +BookApi.hot_recommended;

        try{
            const dataSource = await HttpUtils.get(url);
            runInAction(()=>{
                this.hotRecommended = dataSource;
            })
        }catch (e) {
            console.log(e);
        }
    }

    //搜索
    @action
    async fetchSearchData(){
        this.setLoading(true);
        let url = BaseApi.BookBase1 + BookApi.search;

        let params = {
            query:this.textInputContext
        };
        try{
            const dataSource = await HttpUtils.get(url, params);
            runInAction(()=>{
                this.bookResult = dataSource.books;
                this.setLoading(false)
            })
        }catch (e) {
            console.log(e);
            this.bookResult.length===0?this.setError(true):this.showToast(true)
        }
    }

    //模糊搜索
    @action
    async fetchAutoData(){

        let url = BaseApi.BookBase1 + BookApi.automatically;
        let params = {
            query:this.textInputContext
        };
        try{
            const dataSource = await HttpUtils.get(url, params);
            runInAction(()=>{

                if (dataSource.keywords.length>0){
                    this.automatically = dataSource.keywords;
                    console.log(this.automatically)
                } else {
                    this.automatically = [];
                }
            })
        }catch (e) {
            console.log(e)
        }

    }

    //设置作者
    @action setAuther=(auther:string)=>{
        this.atuher = auther;
    };

    //作者数据列表
    @action
    async fetchAutherData(){
        this.setLoading(true);
        let url = BaseApi.BookBase1 + BookApi.accurate_search;
        let params = {
            author:this.atuher
        };

        try{
            const dataSource = await HttpUtils.get(url,params);
            runInAction(()=>{
                this.autherList = dataSource;
                this.setLoading(false);
            })
        }catch (e) {
            console.log(e);

        }
    }

    //搜索页书单
    @action
    async fetchUgcBookList(){
        this.setLoading(true);
        let url =BaseApi.BookBase1 + BookApi.ugcbooklist_search;
        let params={
            query:this.textInputContext
        };
        try{
            let dataSource = await HttpUtils.get(url,params);
            this.ugcBooklist = dataSource;
            this.setLoading(false)
        }catch (e) {
            console.log(e);
        }
    }

    //搜索页书荒
    @action
    async fetchQuestionsList(){
        this.setLoading(true);
        let url = BaseApi.BookBase1 + BookApi.questions;
        let params={
            tab:search,term:this.textInputContext
        };
        try{
            let dataSource = await HttpUtils.get(url,params);
            this.questionsList = dataSource;
            this.setLoading(false)
        }catch (e) {
            console.log(e);
        }
    }

    //搜索页社区
    @action
    async fetchCommunityList(){
        this.setLoading(true);
        let url =BaseApi.BookBase1 + BookApi.post_searchl
        try{
            let dataSource = await HttpUtils.get(url);
            this.communityList = dataSource;
        }catch (e) {
            console.log(e);
        }
    }

    //清除搜索内容
    @action clearTextInputContext=()=>{
        if (this.textInputContext!==null && this.textInputContext.length>0){
            this.textInputContext = '';
        }
    };
    //设置搜索内容
    @action inputTextContext=(textInput)=>{
        this.textInputContext = textInput
    };

    //清除按钮的显示和隐藏
    @computed get textInputLength(){
        if (this.textInputContext!==null&&this.textInputContext.length>0){
            return true
        }
    }
}