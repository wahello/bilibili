/**
 * @flow
 */
import {observable,action,runInAction,toJS} from 'mobx';
import {BaseApi,BookApi} from "../assest/api";
import {HttpUtils} from "../utils/HttpUtils";
import {BasePageStore} from "./BasePageStore";

interface BookSearch{

    hotBook:Array<any>

}

class BookSearchStore extends BasePageStore implements BookSearch{

    @observable hideToast=[];

}