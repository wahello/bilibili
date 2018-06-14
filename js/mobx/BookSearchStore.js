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
    textInputContext:string | number,
    automatically:Array<any>,
}

export default class BookSearchStore extends BasePageStore implements BookSearch{

    @observable hotBook=[];
    @observable bookResult=[];
    @observable textInputContext='';
    @observable automatically=[];

    constructor(){
        super();
        console.log(this.isSearch);
    }

    //热词搜索
    @action
    async fetchHotwords(){

         this.setLoading(true);
         let url = BaseApi.BookBase1 +BookApi.hotwords;

         try{
             const dataSource = await HttpUtils.get(url);
             runInAction(()=>{
                 this.hotBook = dataSource.searchHotWords;
                 this.setLoading(false)
             })
         }catch (e) {
            console.log(e);
            this.hotBook.length ===0?this.setError(true):this.showToast(true)
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