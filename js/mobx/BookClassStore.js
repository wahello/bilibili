import {action} from 'mobx';
import {BaseApi,BookApi} from "../assest/api";
import {HttpUtils} from "../utils/HttpUtils";
import {BasePageStore} from "./BasePageStore";
import {Toast} from 'teaset';
import {BaseString} from '../base';

export default class bookClassStore extends BasePageStore{

    constructor(props){
        super(props);
        this.fetchData()
    }

     @action fetchData=()=>{

        this.data.length ===0 && this.setLoading(true);
        HttpUtils.get(BaseApi.BookBase1+BookApi.statistics,null, {show:this.data.length!==0})
            .then(action((res)=>{
                this.data.length === 0 && this.setLoading(false);
                this.setData(dealArray(res).slice(0))
            })).catch((error)=>{
                this.data.length ===0?this.setError(true,error.msg):Toast.fail(BaseString.ERROR_TEXT)
        })

        // bookClass().then(action((data)=>{
        //     // this.appStore.decreaseRequest();
        //     // this.appStore.hideLoading();
        //     this.isLoading = false;
        //     this.data = dealArray(data).slice(0);
        // })).catch((e)=>{
        //     console.log(e)
        // })
    }


    // @action fetchData=async()=>{
    //     //this.appStore.increaseRequest();
    //     this.appStore.showLoading();
    //     let url = BaseApi.BookBase1 + BookApi.statistics;
    //     HTTPUtil.get(url).then(action(data=>{
    //         this.appStore.decreaseRequest();
    //         this.appStore.hideLoading();
    //         this.data = dealArray(data).slice(0);
    //     })).catch((error)=>{
    //         console.log(error)
    //     });
    // }
}

function dealArray(array) {

    let data = [];
    let data1 = [];

    for (let i in array){
        if (i!=='ok'){data.push(array[i])}
    }
    '男生,女生,漫画,出版'.split(',').forEach((typeTitle,index)=>{
        let obj = {key:typeTitle,data:[]};
        data.forEach((item1, i)=>{
            if(i===index){
                item1.forEach((item2,)=>{
                    'male,female,picture,press'.split(',').forEach((item,i1)=>{
                        if (i1 ===index){
                            item2.type = item
                        }
                    });
                });
                obj.data.push(item1)
            }
        });
        data1.push(obj);
    });
    return data1;
}

