import React from 'react';
import {StyleSheet} from 'react-native';
import {View,Text,ImageBackground} from 'react-native';
import {observer,inject} from 'mobx-react';
import {BaseString,BaseImage} from '../../base/'
import {BaseLikeScreen} from "./BaseLikeScreen";

@inject('baseTheme')
@observer
export default class HistoryBookScreen extends React.Component{

    // 构造
      constructor(props) {
        super(props);
        // 初始状态
       this.baseTheme = this.props.baseTheme;
      }

    render(){

        return(
            <BaseLikeScreen>
                {this.baseTheme.isDark?null:
            <ImageBackground
                style={[style.UpdateBookScreen,{ backgroundColor:this.baseTheme.brightBackGroundColor}]}
                source={BaseImage.reader_background_brown_big_img6}>
                <Text style={[style.history,{color:this.baseTheme.brightTextColor}]}>{BaseString.NO_HISTORY}</Text>
            </ImageBackground>}
            </BaseLikeScreen>
        )
    }
}

const style = StyleSheet.create({
    UpdateBookScreen:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        width:WIDTH,
    },
    history:{
        fontSize:18,
        fontFamily:'Helvetica',
    }
});