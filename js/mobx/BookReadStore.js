/**
 * @flow
 * 阅读界面
 */
import {observable,action,runInAction,toJS} from 'mobx';
import {BaseApi,BookApi} from "../assest/api";
import {HttpUtils} from "../utils/HttpUtils";
import {BasePageStore} from "./BasePageStore";
import {bookDetailStore} from  './index';
import {BaseString} from "../base";
import {Toast} from "../utils/Toast";

interface BookRead {
    chapter_data:Array<any>,
    title:string,
    chapter:string,
    isImages:boolean,
    chapterTitle:string,
}

export default class BookReadStore extends BasePageStore implements BookRead{

    @observable chapter_data = [];
    @observable title = '';
    @observable chapter='';
    @observable isImages;
    @observable chapterTitle;
    @observable bookReadStore;

    @action chapterFetch=(link)=>{

        // this.chapter_data =bookReadStore.chapter_data.slice();
        // this.title = bookReadStore.title;
        this.setLoading(true);
        let chapter_url = BaseApi.BookBase3 +link;
        HttpUtils.get(chapter_url).then(action(data=>{
            if (data){
                if(data.chapter.cpContent){
                    this.chapter = data.chapter.cpContent;
                    this.isImages = false;
                    setTimeout(()=>{
                        this.setLoading(false);
                    },500)
                }else {
                    this.chapter = (data.chapter.images).split(',');
                    this.isImages = true;
                    setTimeout(()=>{
                        this.setLoading(false);
                    },500)
                }
                this.chapterTitle = data.chapter.title;
            }
        })).catch((error)=>{
            console.log(error);
            this.showToast(true)
        })
    }

}