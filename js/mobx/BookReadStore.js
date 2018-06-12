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

    @action
    async chapterFetch(link){

        // this.chapter_data =bookReadStore.chapter_data.slice();
        // this.title = bookReadStore.title;
        this.setLoading(true);
        let chapter_url = BaseApi.BookBase3 +link;
        try{
            const dataSource = await HttpUtils.get(chapter_url);
            runInAction(()=>{
                if (dataSource){
                    if(dataSource.chapter.cpContent){
                        this.chapter = dataSource.chapter.cpContent;
                        this.isImages = false;
                        setTimeout(()=>{
                            this.setLoading(false);
                        },500)
                    }else {
                        this.chapter = (dataSource.chapter.images).split(',');
                        this.isImages = true;
                        setTimeout(()=>{
                            this.setLoading(false);
                        },500)
                    }
                    this.chapterTitle = dataSource.chapter.title;
                }
            })
        }catch (e) {
            console.log(error);
            this.showToast(true)
        }
    }

}