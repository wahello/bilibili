import {observable,action} from 'mobx';
import {BaseApi,BookApi} from "../assest/api";
import {HttpUtils} from "../utils/HttpUtils";
import {Toast} from 'teaset';
import {BaseString} from '../base';
import {BasePageStore} from "./BasePageStore";
import {dealArray} from "../fun";

interface BookClass {
    data:Array<any>,
}

export default class BookClassStore extends BasePageStore implements BookClass{

    @observable data = [];

     @action fetchData=()=>{
        this.setLoading(true);
        HttpUtils.get(BaseApi.BookBase1+BookApi.statistics,null)
            .then(action((res)=>{
                this.data=dealArray(res).slice(0);
                this.setLoading(false);
            })).catch((error)=>{
                this.data.length ===0?this.setError(true,error.msg):Toast.fail(BaseString.ERROR_TEXT)
        })
    }

    @action fetchAgain=()=>{
         this.fetchData()
    }
}


