/**
 * @flow
 * 公共store
 */
import {observable, action} from 'mobx'
import {BaseString} from '../base';

interface BaseStore {
    data:Array<any>,
    isLoading:boolean,
    isError:boolean,
    loadingMsg:string,
    isToast:boolean,
    isSearch:boolean,
    errorMsg:string,
    toastMsg:string,
    errorPress:()=>void
}

export class BasePageStore implements BaseStore{

    @observable data;
    @observable isLoading;
    @observable isError;
    @observable isToast=false;
    @observable isSearch=false;
    @observable toastMsg;
    loadingMsg;
    errorMsg;
    errorPress;

    constructor(data=[],isLoading=false,isError=false, isToast = false,isSearch=false,loadingMsg = BaseString.LOADING_TITLE, errorMsg = BaseString.ERROR_TEXT){
        this.setData(data);
        this.isLoading = isLoading;
        this.isError = isError;
        this.loadingMsg = loadingMsg;
        this.errorMsg = errorMsg;
        this.isToast = isToast;
        this.isSearch= isSearch;
    }

    @action setData=(data)=>{
        this.data = data;
    };

    @action setError=(isError:boolean = true,errorPress:()=>void)=>{
        if (this.isLoading) {
            this.isLoading = false;
        }
        this.isError = isError;
        this.errorPress = errorPress;
    };

    @action setLoading(isLoading: boolean = true) {
        if (this.isError) {
            this.isError = false
        }
        this.isLoading = isLoading;
    }

    @action showToast(isToast:boolean = true,toastMsg:string=BaseString.ERROR_TEXT){
        if (this.isToast){
            this.isToast = false;
        }
        this.isToast =isToast;
        this.toastMsg = toastMsg;
    }

    @action hideToast(){
        this.isToast = false;
    }

    @action showSearch(isSearch:boolean = true){
        if(this.isSearch){
            this.isSearch = false;
        }
        this.isSearch = isSearch;
    }
}
