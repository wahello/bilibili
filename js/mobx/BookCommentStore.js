/**
 * @flow
 */
import {observable,action,runInAction,computed} from 'mobx';
import {BaseApi,BookApi} from "../assest/api";
import {HttpUtils} from "../utils/HttpUtils";
import {BasePageStore} from "./BasePageStore";

interface BookComment{
    bookComments:Array<any>,
    bookShortCommentsSum:string|number,
    bookCommentsTotal:string|number,
    bookCommentsToday:string|number,
    bookReviewsTotal:string|number,
    bookShortComments:Array<any>,
    bookReviewsComments:Array<any>
}

export default class BookCommentStore extends BasePageStore implements BookComment{

    @observable bookComments=[];
    @observable bookShortCommentsSum;
    @observable bookCommentsTotal;
    @observable bookCommentsToday;
    @observable bookReviewsTotal;
    @observable bookShortComments=[];
    @observable bookReviewsComments=[];


    @action
    async fetchBookComments(id){

        this.setLoading(true);
        let url = BaseApi.BookBase1+BookApi.by_book;
        let short_url = BaseApi.BookBase1+BookApi.short_review;
        let review_url =BaseApi.BookBase1+BookApi.review;
        const params = {book:id, sort:'comment-count', type:'normal,vote', start:0, limit:20,};
        const short_params={book:id, limit:20, start:0, sortType:'hottest', total:true};
        const review_params = {book:id, sort:'comment-count', start:0, limit:20,};
        try{
            const data =await HttpUtils.get(url,params);
            const short_comment_data = await HttpUtils.get(short_url,short_params);
            const review_data = await HttpUtils.get(review_url,review_params);
            runInAction(()=>{
                this.bookComments = data.posts;
                this.bookShortCommentsSum= short_comment_data.total;
                this.bookCommentsTotal = data.total;
                this.bookCommentsToday = data.today;
                this.bookReviewsTotal = review_data.total;
                this.bookShortComments = short_comment_data.docs;
                this.bookReviewsComments = review_data.reviews;
                this.setLoading(false);
            })
        }catch (e) {
            console.log(e);
            this.showToast(true)
        }
    };

    @action collection=()=>{

        this.showToast(true,"收藏成功");
        setTimeout(()=>{
            this.hideToast()
        },3000)
    }
}