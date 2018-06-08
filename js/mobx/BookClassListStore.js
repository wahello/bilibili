/**
 * @flow
 */

import {observable,action,runInAction,toJS} from 'mobx';
import {BaseApi,BookApi} from "../assest/api";
import {HttpUtils} from "../utils/HttpUtils";
import {BasePageStore} from "./BasePageStore";
import {BaseString} from "../base";
import {Toast} from "teaset";

interface BookClassList {
    data:Array<any>,
    classSmallData:Array<any>,
    isClassType:boolean,
    total:string | number,
    loadingMore:boolean,
    start:number,
    showTopType:boolean,
    topIndex:number,
    bottomIndex:number,
}

export default class bookClassListStore extends BasePageStore implements BookClassList{

    @observable data = [];
    @observable total=0;
    @observable loadingMore = false;
    @observable classSmallData =[];
    @observable isClassType = true;
    @observable start = 0;
    @observable showTopType = true;
    @observable topIndex = 0;
    @observable bottomIndex = 0;

    constructor(){
        super();
    }

    @action fetchData=(gender:string,type:string,major,minor:string)=> {

        this.setLoading(true);
        let url = BaseApi.BookBase1 + BookApi.categories;
        let params = {
            gender: gender, type: type, major: major, minor: minor, start: this.start, limit: 20
        };
        HttpUtils.get(url, params).then(action(data=>{
            this.data = data.books;
            this.total = data.total;
            setTimeout(()=>{
                this.setLoading(false)
            },1500);

        })).catch((e)=>{
            console.log(e);
            this.data.length===0?this.setError(true):Toast.fail(BaseString.ERROR_TEXT)
        })
    };

    @action fetchAgain=()=>{
        this.fetchData()
    };


    @action fetchMoreData = (gender:string,type:string,major,minor:string,start:number)=>{

        this.loadingMore = true;
        let url = BaseApi.BookBase1+BookApi.categories;
        let params = {
            gender:gender,type:type,major:major,minor:minor,start:start,limit:20
        };
        HttpUtils.get(url, params).then(action(data=>{
            this.data = this.data.concat(data.books);
            this.loadingMore  = false;
        })).catch((err)=>{
            console.log(err);
            this.data.length===0?this.setError(true):Toast.fail(BaseString.ERROR_TEXT)
        });
    };

    @action fetchClassSmall=(gender,major)=>{


        if (gender ==='picture' || gender==='press'){
            this.showTopType = false;
        }else {
            this.showTopType= true;
        }

        let url = BaseApi.BookBase1+BookApi.lv2;
        HttpUtils.get(url).then(action(data=>{
            this.dealArray(data,gender,major);
        })).catch((e)=>{
            console.log(e);
        })
    };

    @action changeTopIndex=(index)=>{
        this.topIndex = index
    };

    @action changeBottomIndex=(index)=>{
        this.bottomIndex = index
    };

    @action dealArray=(obj,gender,major)=>{

        let data = [];
        let data1 = [];
        let data2 = [];

        for (let i in obj){
            if (i !=='ok'){
                data.push(obj[i])
            }
        }
        'male,female,picture,press'.split(',').forEach((typeTitle,i)=>{
            let obj = {key:typeTitle,data:[]};
            data.forEach((itemType,index)=>{
                if (i ===index){
                    obj.data.push(itemType)
                }
            });
            data1.push(obj)
        });

        data1.forEach((item,i)=>{
            if (item.key === gender){
                item.data.forEach((item1, i)=>{
                    item1.forEach((item2,i)=>{
                        if(item2.major === major){
                            if (item2.mins.length !==0){
                                item2.mins.forEach((item3,i)=>{
                                    //console.log(item3)
                                    let obj1 = {title:item3}
                                    data2.push(obj1)
                                });
                                this.classSmallData = data2;
                                // DataCache.createTopView(item2.mins);
                                //RealmBook.createTopView('BookTopData',item2.mins);
                                this.isClassType = true;
                            }else {
                                this.isClassType = false;
                            }
                        }
                    })
                })
            }
        })
    };
}
