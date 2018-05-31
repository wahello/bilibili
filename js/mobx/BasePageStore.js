/**
 * @flow
 */
import {observable, action} from 'mobx'
import {BaseString} from '../base';

interface BaseStore {
    data:any,
    isLoading:boolean,
    isError:boolean,
    loadingMsg:string,
    errorMsg:string,
    errorPress:()=>void
}

export class BasePageStore implements BaseStore{

    @observable data;
    @observable isLoading;
    @observable isError;
    loadingMsg;
    errorMsg;
    errorPress;

    constructor(data=[],isLoading=false,isError=false, loadingMsg = BaseString.LOADING_TITLE, errorMsg = BaseString.ERROR_TEXT){
        this.setData(data);
        this.isLoading = isLoading;
        this.isError = isError;
        this.loadingMsg = loadingMsg;
        this.errorMsg = errorMsg;
    }

    @action setData=(data)=>{
        this.data = data;
    };

    @action setError=(isError:boolean = true,errorMsg:string = BaseString.ERROR_TEXT,errorPress:()=>void=null)=>{
        if (this.isLoading) {
            this.isLoading = false
        }
        this.isError = isError;
        this.errorMsg = errorMsg;
        this.errorPress = errorPress;
    };

    @action setLoading(isLoading: boolean = true, loadingMsg: string =  BaseString.LOADING_TITLE,) {
        if (this.isError) {
            this.isError = false
        }
        this.isLoading = isLoading;
        this.loadingMsg = loadingMsg;
    }
}
