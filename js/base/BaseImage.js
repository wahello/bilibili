/**
 * @flow
 */


interface Image {
    tab:string;
    icon:string
}

class BaseImage implements Image{


    home_uncheck = require('../assest/tabImg/home_uncheck.png');
    home_selected = require('../assest/tabImg/home_selected.png');
    mine_uncheck =require('../assest/tabImg/mine_uncheck.png');
    mine_selected =require('../assest/tabImg/mine_selected.png');
    class_uncheck =require('../assest/tabImg/class_uncheck.png');
    class_selected =require('../assest/tabImg/class_selected.png');

    new_buy_star_bg=require('../assest/icon/new_buy_star_bg.png');
    start1=require('../assest/icon/start1.png');
    start2=require('../assest/icon/start2.png');
    start3=require('../assest/icon/start3.png');
    praise=require('../assest/icon/praise.png');
    my_evaluate_star_dark=require('../assest/icon/my_evaluate_star_dark.png');
    zan=require('../assest/icon/zan.png');
    message=require('../assest/icon/message.png');
    chapter_review_send=require('../assest/icon/chapter_review_send.png');
    bg_dafalt=require('../assest/icon/dafalt_2.png');
    reader_background_brown_big_img6=require('../assest/icon/reader_background_brown_big_img6.png');
    ic_cartoon_download_empty=require('../assest/icon/ic_cartoon_download_empty.png');
    mine=require('../assest/icon/mine_bg.png');
    ic_svstatus_loading=require('../assest/icon/ic_svstatus_loading.png');
    reader_background_brown_big_img=require('../assest/icon/reader_background_brown_big_img.jpg');
    ad_splsh_bg=require('../assest/icon/ad_splsh_bg.jpg');
    back=require('../assest/icon/back.png')

}

const baseImage  = new BaseImage();

export default baseImage
