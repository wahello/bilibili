import React from 'react';
import {Text,Image,StyleSheet} from 'react-native';
import {BaseString,BaseImage} from '../../base/'
import {observer,inject} from 'mobx-react';
import {BaseLikeScreen} from "./BaseLikeScreen";
import {scaleSize} from "../../utils/ScreenUtils";
@inject('baseTheme')
@observer
export default class LikeBookScreen extends React.Component{

    // 构造
      constructor(props) {
        super(props);
        // 初始状态
          this.baseTheme= this.props.baseTheme;
      }

    componentDidMount() {

    }

    render(){

        return(
            <BaseLikeScreen>
                <Image
                    style={style.ic_cartoon_download_empty}
                    source={BaseImage.ic_cartoon_download_empty}/>
                <Text style={[style.likeTitle,{ color:this.baseTheme.brightTextColor}]}>{BaseString.LIKE_BOOK}</Text>
            </BaseLikeScreen>
        )

    }
}

const style = StyleSheet.create({
    ic_cartoon_download_empty:{
        width:scaleSize(168),
        height:scaleSize(158),
    },
    likeTitle:{
        marginTop:50,
    }
});

