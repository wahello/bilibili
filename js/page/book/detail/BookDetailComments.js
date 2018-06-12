/**
 * @flow
 * 图书详情页 评论部分
 */
import React from 'react';
import {View,Text,TouchableOpacity,Image} from 'react-native';
import {BaseImage} from "../../../base/index";
import {style} from "../Styles";
import {observer,inject} from 'mobx-react';
import {ImageView} from "../../../component/ImageView";
import StarRating from 'react-native-star-rating';
import {BaseString} from '../../../base/index';
import {ClearBr,getTime} from '../../../fun/index';
import {BaseApi} from "../../../assest/api";
import {RouteHelper} from 'react-navigation-easy-helper';

type Props={
    evaluation_data:Array<any>,
    evaluation_total:number,
    nowDate:number,
    id:number|string
}

@inject('baseTheme','bookDetailStore')
@observer
export class BookDetailComments extends React.Component<Props,any>{

    // 构造
    constructor(props) {
        super(props);
        this.bookDetailStore= this.props.bookDetailStore;
        this.brightBackGroundColor = this.props.baseTheme.brightBackGroundColor;
        this.brightTextColor = this.props.baseTheme.brightTextColor;
        this.brightNavTextColor = this.props.baseTheme.brightNavTextColor;

    }



    render(){

        const {evaluation_data,evaluation_total,nowDate} = this.bookDetailStore;

        return(
            <View style={style.evaluationView}>
                <Text style={[style.IntroductionTitle,{color:this.brightNavTextColor}]}>{BaseString.HOE_SHORT_COMMEND}</Text>
                {evaluation_data.map((item,i)=>{

                    let context = ClearBr(item.content);

                    return(
                        <View key={i} style={[style.evaluationItemView]}>
                            <View style={style.evaluationItemTopView}>
                                <View style={{flexDirection:'row',alignItems:'center',marginLeft:20}}>
                                    <ImageView uri={BaseApi.BookBase4+item.author.avatar} styles={[style.evaluationItemImageView,{ borderColor:this.brightTextColor,}]}/>
                                    <Text style={[style.avatarTitle,{color:this.brightTextColor,}]}>{item.author.nickname}</Text>
                                    <View style={[style.avatarLvView,{ borderColor:this.brightTextColor,}]}>
                                        <Text style={[style.avatarLv,{ color:this.brightTextColor,}]}>LV.{item.author.lv}</Text>
                                    </View>

                                </View>
                                <View>
                                    <StarRating
                                        disabled={false}
                                        maxStars={5}
                                        emptyStar={BaseImage.start1}
                                        fullStar={BaseImage.start3}
                                        halfStar={BaseImage.start2}
                                        starSize={12}
                                        rating={item.rating}
                                        containerStyle={{width:60,marginRight:30,marginBottom:10}}
                                    />
                                </View>
                            </View>
                            <View style={style.avatarContentView}>
                                <Text style={[style.avatarContent,{  color:this.brightTextColor,}]}>{context}</Text>
                            </View>
                            <View style={{flexDirection:'row',justifyContent:'space-between',height:30,alignItems:'center'}}>
                                <View style={{marginLeft:30}}>
                                    <Text style={[style.avatarTitle,{ color:this.brightTextColor}]}>{getTime(item.updated,nowDate)}</Text>
                                </View>
                                <View style={{marginRight:30,flexDirection:'row',alignItems:'center'}}>
                                    <Image source={BaseImage.praise} style={style.praise}/>
                                    <Text style={[style.avatarTitle,{ color:this.brightTextColor}]}>{item.likeCount}</Text>
                                </View>
                            </View>
                        </View>
                    )
                })}

                <TouchableOpacity
                    onPress={()=>RouteHelper.navigate('BookComments',{id:this.props.id})}
                    activeOpacity={1}
                    style={style.allEvaluation}>
                    <Text style={[style.evaluation_total,{color:this.brightNavTextColor}]}>{BaseString.ALL_SHORT_COMMEND}{evaluation_total}条</Text>
                </TouchableOpacity>

                <View style={[style.bookLoadBottomView,{width:WIDTH-60}]}/>

            </View>
        )

    }

}