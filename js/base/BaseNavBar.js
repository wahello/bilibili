/**
 * @flow
 */
import React from 'react';
import {View,Text,TouchableOpacity,Image,StyleSheet,StatusBar} from 'react-native';
import {observer,inject} from 'mobx-react';
import {BaseImage} from '../base/index';

type Props={

    style:any,
    title:string,
    titleStyle:any,
    rightTitle:string,
    rightIcon: string | number,
    showGoBack:boolean,
    renderRightItem: void,
    renderTitleView: void,
    onBack: void,
    onRight: void,
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
        showGoBack: true,
    };

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
                    height: 44+ this.top,
                    paddingTop: this.top,
                    backgroundColor: this.baseTheme.brightNavBackGroundColor,
                }
            ]}>
                <StatusBar barStyle={this.baseTheme.brightStatusBarStyle}/>
                {showGoBack && <LeftItem onPress={onBack} />}
                {renderTitleView || <Text style={[styles.title, titleStyle,{color: this.baseTheme.brightNavTextColor,}]}>{title || ''}</Text>}
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

const LeftItem = ({onPress}) => {
    return (
        <TouchableOpacity
            activeOpacity={0.75}
            style={[styles.leftItem,{top: this.top,}]}
            onPress={onPress}>
            <Image
                style={{width: 20, height: 20}}
                source={BaseImage.back}
                resizeMode="contain"
            />
        </TouchableOpacity>
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
    },
    leftItem: {
        position: 'absolute',
        left: 0,
        height: 44,
        width: 60,
        paddingLeft: 5,
        justifyContent: 'center',
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

