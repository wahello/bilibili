import React from "react";
import {View} from 'react-native';
import {BaseString} from "../base";
import {inject, observer} from "mobx-react";
import {style} from "../page/book/Styles";
import {Loading,GifLoading} from "../base/BaseLoading";

@inject('baseTheme')
@observer
export class BookListLoading extends React.Component{

    // 构造
    constructor(props) {
        super(props);
        this.brightDefaultColor = this.props.baseTheme.brightDefaultColor;
        this.brightBackGroundColor=this.props.baseTheme.brightBackGroundColor;
    }

    render(){
        return(
            <View style={{flex:1 , backgroundColor:this.brightBackGroundColor}}>

                <Loading/>

                {
                    BaseString.BOOK_TOP_CLASS_TYPE.map((item,i)=>{
                        return(
                            <View style={style.bookLoadView} key={i}>
                                <View style={[style.leftBookView, { backgroundColor:this.brightDefaultColor, shadowColor: this.brightDefaultColor}]}/>

                                <View style={style.rightBookView}>
                                    <View style={[style.rightBookViewTitle,{backgroundColor:this.brightDefaultColor}]}/>
                                    <View style={[style.rightBookViewTitle,{width:WIDTH/2,marginTop:15,backgroundColor:this.brightDefaultColor}]}/>
                                    <View style={[style.rightBookViewTitle,{width:WIDTH/2-20,backgroundColor:this.brightDefaultColor}]}/>

                                    <View style={{flexDirection:'row',marginBottom:10}}>
                                        <View style={[style.rightBookViewTitle,{width:WIDTH/6,marginRight:10,backgroundColor:this.brightDefaultColor}]}/>
                                        <View style={[style.rightBookViewTitle,{width:WIDTH/6,backgroundColor:this.brightDefaultColor}]}/>
                                    </View>
                                </View>
                                {/*<View style={style.bookLoadBottomView}/>*/}
                            </View>
                        )
                    })
                }
            </View>
        )
    }
}