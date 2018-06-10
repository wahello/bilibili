/**
 * @flow
 */
import * as React from 'react';
import {ImageBackground,ScrollView,Text,TouchableOpacity,View,SafeAreaView} from 'react-native';
import {BaseImage,BaseString,BaseContainer} from '../../base';
import {style} from "./Styles";
import {observer,inject} from 'mobx-react';

type Props = {
    title:string,
    _content:string
}

@inject('baseTheme')@observer
export class BookReaderDetails extends React.Component<Props,any>{

    constructor(props){
        super(props);
        this.brightReadTextColor = this.props.baseTheme.brightReadTextColor;
        this.brightBackGroundColor = this.props.baseTheme.brightBackGroundColor;
        this.isDark = this.props.baseTheme.isDark;
    }

    render(){

        const {title,content} =this.props;
        console.log(this.isDark)

        return(
            this.isDark?
                <SafeAreaView style={{flex:1,backgroundColor:this.brightBackGroundColor}}>
                    {this.renderItem(title,content)}
                </SafeAreaView>

                :
                <SafeAreaView style={{flex:1,backgroundColor:this.brightBackGroundColor}}>
                    <ImageBackground
                        style={{flex:1,width:WIDTH}}
                        source={BaseImage.reader_background_brown_big_img}>
                        {this.renderItem(title,content)}
                    </ImageBackground>
                </SafeAreaView>


        )

    }

    renderItem=(title,content)=>{
            return(
                <ScrollView
                    contentContainerStyle={{paddingLeft:15,paddingRight:15}}
                    showsVerticalScrollIndicator={false}>
                    <Text style={[style.chapterTitle,{color: this.brightReadTextColor}]} numberOfLines={2}>{title}</Text>
                    {/*<TouchableOpacity*/}
                    {/*onPress={()=>this.setState({showModal:!this.state.showModal,hidden:!this.state.hidden},()=>StatusBar.setHidden(this.state.hidden,true))}*/}
                    {/*activeOpacity={1}*/}
                    {/*style={style.chapterContext}>*/}
                    {/**/}
                    {/*</TouchableOpacity>*/}

                    <Text
                        style={{ color: this.brightReadTextColor,
                            fontSize: 16,lineHeight:22}}>
                        {content}
                    </Text>

                    <View style={style.chapterBottomView}>
                        <View style={{width:70,height:60,justifyContent:'center',alignItems:'center'}}>
                            <Text>上一章</Text>
                        </View>
                        <View style={{width:70,height:60,justifyContent:'center',alignItems:'center'}}>
                            <Text>下一章</Text>
                        </View>
                    </View>
                </ScrollView>

        )
    }

}