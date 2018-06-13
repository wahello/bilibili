/**
 * @flow
 * 一个公共的头部组件
 */
import React from 'react';
import {View,Text,TouchableOpacity,Image,StyleSheet,StatusBar} from 'react-native';
import {observer,inject} from 'mobx-react';
import {BaseImage} from '../base/index';
import {Style} from "../utils/type";
import MyBackButton from '../component/BackComponent';

type Props={

    style:Style,
    title:string,
    titleStyle:Style,
    rightTitle:string,
    rightIcon: string | number,
    showGoBack:boolean,
    renderRightItem: ?()=>mixed=>React.Element<any>,
    renderTitleView: ?()=>mixed=>React.Element<any>,
    onBack: ()=>mixed,
    onRight: ()=>mixed,
}

@inject('baseTheme')
@observer
export default class BaseNavBar extends React.Component<Props>{


    // 构造
      constructor(props) {
        super(props);
        this.baseTheme = this.props.baseTheme;
        this.top = this.baseTheme.statusBarHeight;
      }

    static defaultProps = {
        showGoBack: false,
    };

    componentDidUpdate() {
        StatusBar.setBarStyle(this.baseTheme.brightStatusBarStyle)
    }

    render() {
        const {
            title,
            titleStyle,
            showGoBack,
            onBack,
            style,
            rightTitle,
            onRight,
            rightIcon,
            renderRightItem,
            renderTitleView,
        } = this.props;



        return (
            <View style={[
                styles.header,
                style,{
                    height: 44+this.top,
                    paddingTop: this.top,
                    backgroundColor: this.baseTheme.brightNavBackGroundColor,
                }
            ]}>
                <StatusBar barStyle={this.baseTheme.brightStatusBarStyle}/>
                {showGoBack && <LeftItem
                    top={this.top}
                    source={this.baseTheme.isDark?BaseImage.back_bright:BaseImage.back_dark}
                    color={this.baseTheme.brightNavTextColor}
                />}
                {renderTitleView || <Text numberOfLines={1} style={[styles.title, titleStyle,{color: this.baseTheme.brightNavTextColor,}]}>{title || ''}</Text>}
                {renderTitleView && renderTitleView()}
                {rightTitle && <RightItem text={rightTitle} onPress={onRight} />}
                {rightIcon && <RightIconItem icon={rightIcon} onPress={onRight} />}
                {renderRightItem &&
                <TouchableOpacity
                    activeOpacity={0.75}
                    style={[styles.renderRight,{ top:this.top}]}
                    onPress={onRight}>
                    {renderRightItem()}
                </TouchableOpacity>
                }
            </View>
        );
    }

}


const LeftItem = (props) => {
    return (
        <MyBackButton
            activeOpacity={0.75}
            style={[styles.leftItem,{top: props.top}]}>
            <Image
                style={{width: 20, height: 20}}
                source={props.source}
                resizeMode="contain"
            />
            <Text style={{color:props.color}}>返回</Text>
        </MyBackButton>
    );
};



const RightItem = ({onPress, text}) => {
    return (
        <TouchableOpacity
            activeOpacity={0.75}
            style={[styles.rightItem,{ top: this.top,}]}
            onPress={onPress}
        >
            <Text style={{fontSize: 15, color: '#666666'}}>{text}</Text>
        </TouchableOpacity>
    );
};

const RightIconItem = ({onPress, icon}) => {
    return (
        <TouchableOpacity
            activeOpacity={0.75}
            style={[styles.rightIconItem,{top: this.top}]}
            onPress={onPress}
        >
            <Image style={{width: 18, height: 18}} source={icon} resizeMode="contain" />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({

    header: {
        width: WIDTH,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        textAlign: 'center',
        fontSize: 18,
        width:WIDTH/2,
    },
    leftItem: {
        position: 'absolute',
        left: 0,
        height: 44,
        width: 60,
        paddingLeft: 5,
        justifyContent: 'center',
        flexDirection:'row',
        alignItems:'center'
    },
    rightItem: {
        position: 'absolute',
        right: 0,
        height: 44,
        paddingRight: 10,
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    rightIconItem: {
        position: 'absolute',
        right: 0,
        height: 44,
        paddingRight: 10,
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    renderRight: {
        position: 'absolute',
        right: 0,
        height: 44,
        paddingRight: 10,
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
});

