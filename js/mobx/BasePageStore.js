/**
 * @flow
 */
import {observable, action} from 'mobx'
import {BaseString} from '../base';

interface BaseStore {
    data:Array<any>,
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
}
