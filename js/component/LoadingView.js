/**
 * @flow
 */

import * as React from 'react';
import {observer} from 'mobx-react';
import {Animated,View,StyleSheet,Easing} from 'react-native';
import {BaseImage} from '../base';
import {scaleSize} from "../utils/ScreenUtils";
import {brightColor} from "../base/BaseColor";

type State={
    bounceValue:Animated,
    rotateValue:Animated
}

@observer
export class Loading extends React.Component<any,State>{

    state = {
        bounceValue: new Animated.Value(1), //你可以改变这个值看
        rotateValue: new Animated.Value(0),//旋转角度的初始值
    };

    componentDidMount() {
        //在初始化渲染执行之后立刻调用动画执行函数
        this.startAnimation();
    }

    componentWillUnmount() {
        this.state.bounceValue.setValue(1);
        this.state.bounceValue.setValue(0);
    }

    startAnimation() {
        this.state.bounceValue.setValue(1);//和上面初始值一样，所以
        //弹动没有变化
        this.state.rotateValue.setValue(0);
        Animated.parallel([
            //通过Animated.spring等函数设定动画参数
            //可选的基本动画类型: spring, decay, timing
            Animated.spring(this.state.bounceValue, {
                toValue: 1,      //变化目标值，也没有变化
                friction: 20,    //friction 摩擦系数，默认40
            }),
            Animated.timing(this.state.rotateValue, {
                toValue: 1,  //角度从0变1
                duration: 1000,  //从0到1的时间
                easing: Easing.out(Easing.linear),//线性变化，匀速旋转
            }),
            //调用start启动动画,start可以回调一个函数,从而实现动画循环
        ]).start(()=>this.startAnimation());
    }

    render(){

        return(
            <View style={style.loadingView}>
                <View style={style.loadDialog}>
                    <Animated.Image
                        style={[style.ic_svstatus_loading,{
                            transform: [
                                //将初始化值绑定到动画目标的style属性上
                                {scale: this.state.bounceValue},
                                //使用interpolate插值函数,实现了从数值单位的映
                                //射转换,上面角度从0到1，这里把它变成0-360的变化
                                {rotateZ: this.state.rotateValue.interpolate({
                                        inputRange: [0,1],
                                        outputRange: ['0deg', '360deg'],
                                    })}]}]}
                        source={BaseImage.ic_svstatus_loading}
                    />
                </View>
            </View> : null
        )
    }
}

const style = StyleSheet.create({

    ic_svstatus_loading:{
        width:scaleSize(60),
        height:scaleSize(60)
    },
    loadDialog: {
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: brightColor.brightTopTabBottomColor,
        borderRadius: 10
    },
    loadingView:{
        width:WIDTH,
        height:HEIGHT,
        justifyContent:'center',
        alignItems:'center',
        position:'absolute',
        top:0,
        left:0,
        zIndex:99,
        overflow:'hidden',
        backgroundColor:'transparent'
    },
});