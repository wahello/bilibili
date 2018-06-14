/**
 * @flow
 * 图书分类
 */
import {observable,action,runInAction} from 'mobx';
import {BaseApi,BookApi} from "../assest/api";
import {HttpUtils} from "../utils/HttpUtils";
import {Toast} from "../utils/Toast";
import {BaseString} from '../base';
import {BasePageStore} from "./BasePageStore";
import {dealArray} from "../fun";
import {Book} from "../route/TabRoute";

interface BookClass {
    data:Array<any>,
}

export default class BookClassStore extends BasePageStore implements BookClass{

    @observable data = [];

    @action fetchAgain=()=>{
         this.fetchData()
    };

    @action
    async fetchData() {
        this.data = [];
        this.setLoading(true);
        try {
            const dataSource = await HttpUtils.get(BaseApi.BookBase1+BookApi.statistics,null);
            runInAction(()=>{
                this.data=dealArray(dataSource).slice(0);
                setTimeout(()=>{
                    this.setLoading(false);
                },1000)
            })
        }catch (e) {
            runInAction(()=>{
                console.log(e);
                this.data.length ===0?this.setError(true,error.msg):this.showToast(true)
            })
        }
    }

    @action startSerch=()=>{
        this.showSearch(true)
        // setTimeout(()=>{
        //     this.showSearch(false)
        // },100)
    }
}


