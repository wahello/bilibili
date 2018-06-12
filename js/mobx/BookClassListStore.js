/**
 * @flow
 * 图书列表store
 */

import {observable,action,runInAction,toJS} from 'mobx';
import {BaseApi,BookApi} from "../assest/api";
import {HttpUtils} from "../utils/HttpUtils";
import {BasePageStore} from "./BasePageStore";
import {BaseString} from "../base";
import {Toast} from "../utils/Toast";

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

    @action 
    async fetchData(gender:string,type:string,major,minor:string){

        this.setLoading(true);
        let url = BaseApi.BookBase1 + BookApi.categories;
        let params = {
            gender: gender, type: type, major: major, minor: minor, start: this.start, limit: 20
        };
        try {
            const dataSource = await HttpUtils.get(url, params);
            runInAction(()=>{
                this.data = dataSource.books;
                this.total = dataSource.total;
                setTimeout(()=>{
                    this.setLoading(false)
                },1500);
            })
        }catch (e) {
            console.log(e)
            runInAction(()=>{
                this.setLoading(false);
                this.data.length===0?this.setError(true):this.showToast(true);
            })
        }
    };

    @action fetchAgain=()=>{
        this.fetchData()
    };

    @action
    async fetchMoreData(gender:string,type:string,major,minor:string,start:number){

        this.loadingMore = true;
        let url = BaseApi.BookBase1+BookApi.categories;
        let params = {
            gender:gender,type:type,major:major,minor:minor,start:start,limit:20
        };
        try{
            const dataSource =  HttpUtils.get(url, params);
            runInAction(()=>{
                this.data = this.data.concat(dataSource.books);
                this.loadingMore  = false;
            })
        }catch (e) {
            console.log(e);
            runInAction(()=>{
                this.data.length===0?this.setError(true):this.showToast(true);
            })
        }
    };

    @action
    async fetchClassSmall(gender,major){

        if (gender ==='picture' || gender==='press'){
            this.showTopType = false;
        }else {
            this.showTopType= true;
        }
        let url = BaseApi.BookBase1+BookApi.lv2;
        try {
            const dataSource = await HttpUtils.get(url);
            runInAction(()=>{
                this.dealArray(dataSource,gender,major);
            })
        }catch (e) {
            console.log(e);
        }
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
