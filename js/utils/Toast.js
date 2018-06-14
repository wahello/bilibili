/**
 * @flow
 * 自定义顶部Toast
 */
import *as React from 'react';
import {View, Image, Text, StyleSheet, Animated, StatusBar,SafeAreaView, DeviceEventEmitter, LayoutAnimation,UIManager} from 'react-native';
import {ToastAndroid, Alert} from 'react-native';
import {BaseImage} from '../base';
import {scaleSize} from "./ScreenUtils";
import {observer,inject} from 'mobx-react';

@inject('baseTheme')@observer
export class Toast extends React.Component{

    state={
        height:new Animated.Value(0)
    };

     // 构造
      constructor(props) {
        super(props);
        // 初始状态
            this.top = this.props.baseTheme.statusBarHeight;
            this.isDark = this.props.baseTheme.isDark;
      }
      showToast(){
          this.state.height.setValue(0);
          StatusBar.setBarStyle('light-content',true);
          Animated.spring(this.state.height,{
              toValue:1,
              useNativeAnimations:true
          }).start(()=>{
              setTimeout(()=>{
                  this.hideToast()
              },2000)
          });
      }

      hideToast(){
          Animated.spring(this.state.height,{
              toValue:0,
              useNativeAnimations:true
          }).start(()=>{
              this.isDark? StatusBar.setBarStyle('dark-content',true):null
          });
      }

    componentDidMount() {
        this.showToast()
    }


    componentDidUpdate() {
        StatusBar.setBarStyle('light-content',true);
    }

    render(){

        const height = this.state.height.interpolate({
            inputRange:[0,1],
            outputRange:[-44-this.top,0]
        });

        return(
            <Animated.View style={[style.toastView,{
                height:44+this.top,
                paddingTop:this.top,
                transform:[{translateY:height}]
            }]}>
                <StatusBar barStyle='light-content'/>
                <Image
                    style={style.toast_image}
                    source={BaseImage.icon_toast}/>
                <Text style={style.title}>{this.props.toastMsg}</Text>
            </Animated.View>
        )
    }
}

const style = StyleSheet.create({
   container:{
       backgroundColor: 'blue',
       width:WIDTH,
       height:HEIGHT,
       zIndex:99
   },
    toastView:{
        position:'absolute',
        top:0,
        left:0,
        width:WIDTH,
        backgroundColor:'#eb6056',
        alignItems:'center',
        flexDirection:'row',
        paddingLeft:20,
        zIndex:99
    },
    toast_image:{
        width:scaleSize(58),
        height:scaleSize(37),
        marginRight:20
    },
    title:{
        color:'#FFFFFF'
    }
});
