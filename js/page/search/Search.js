import React from 'react';
import {View, Animated, Easing, TextInput, StatusBar,Image, TouchableOpacity, Text, Keyboard,FlatList} from 'react-native';
import {observer,inject} from 'mobx-react';
import {style} from "./Style";
import {SearchContext} from './SearchContext';
import {SearchTopTextInput} from './SearchTopTextInput';

@inject('baseTheme','basePageStore','bookSearchStore')
@observer
export class Search extends React.Component{

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.top = this.props.baseTheme.statusBarHeight;
        this.brightBackGroundColor = this.props.baseTheme.brightBackGroundColor;
        this.brightSettingItemColor = this.props.baseTheme.brightSettingItemColor;
        this.isDark = this.props.baseTheme.isDark;
        this.state={
            searchTopView:new Animated.Value(0),
            searchBottomView:new Animated.Value(0),
        }
    }

    componentDidMount() {
        this.showSearchView()
    }
    showSearchView=()=>{
        this.state.searchTopView.setValue(0);
        this.state.searchBottomView.setValue(0);
        this.isDark? StatusBar.setBarStyle('light-content',true):StatusBar.setBarStyle('dark-content',true)
        Animated.parallel([
            Animated.spring(this.state.searchTopView,{
                toValue:1,
                friction: 8,
                tension: 50,
                useNativeAnimations:true
            }),
            Animated.spring(this.state.searchBottomView,{
                toValue:1,
                friction: 8,
                tension: 50,
                useNativeAnimations:true
            } )
        ]).start();
    };

    hideSearchView=()=>{
        Keyboard.dismiss();
        Animated.parallel([
            Animated.spring(this.state.searchTopView,{
                toValue:0,
                friction: 8,
                tension: 50,
                useNativeAnimations:true
            }),
            Animated.spring(this.state.searchBottomView,{
                toValue:0,
                friction: 8,
                tension: 50,
                useNativeAnimations:true
            } )
        ]).start(()=>{
            !this.isDark? StatusBar.setBarStyle('dark-content',true):null;
        });
        this.timer = setTimeout(()=>{
           // this.basePageStore.showSearch(false)
        })
    };

    render(){

        const searchTop = this.state.searchTopView.interpolate({
            inputRange:[0,1],
            outputRange:[-44-this.top,0]
        });

        const searchBottom = this.state.searchBottomView.interpolate({
            inputRange:[0,1],
            outputRange:[HEIGHT*2,(50+this.top)]
        });

        return(
            <View style={{flex:1,position:'absolute',top:0,backgroundColor:'transparent',zIndex:99,overflow:'hidden'}}>
                <StatusBar barStyle='dark-content'/>
                <Animated.View style={[style.topSearchView,{
                    height:44+this.top,
                    width:WIDTH,
                    paddingTop:this.top,
                    backgroundColor:this.brightSettingItemColor,
                    transform:[{translateY:searchTop}]}]}>
                   <SearchTopTextInput onCancel={this.onCancel}/>
                </Animated.View>
                <Animated.View
                    style={[style.bottomSearchView,{
                        backgroundColor:this.brightBackGroundColor,
                        height:HEIGHT,
                        transform:[{translateY:searchBottom}]}]}>
                    <SearchContext/>
                </Animated.View>
            </View>
        )
    }


    //取消
    onCancel=()=>{
        this.hideSearchView()
    };
}
