/**
 * @flow
 * 错误页面
 */
import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Text
} from 'react-native';
import {observer,inject} from 'mobx-react';
import {BIN_TITLE,ERROR_TEXT} from './BaseString';
import {Style} from "../utils/type";


type Props={
    btnTitle: string,
    onPress: ()=>mixed,
    btnStyle: Style,
    errorText: string,
    textStyle: Style
}

@inject('baseTheme')
@observer
export default class BaseError extends Component<Props,any> {

    // 构造
      constructor(props) {
        super(props);
        this.baseTheme = this.props.baseTheme;
      }

    static defaultProps = {
        btnTitle: BIN_TITLE,
        errorText: ERROR_TEXT,
    };

    render() {

        const {onPress, btnStyle, errorText, btnTitle, textStyle} = this.props;

        return <View style={styles.container}>
            <View style={[styles.errorContainer,{backgroundColor:this.baseTheme.brightBackGroundColor}]}>
                <Text style={textStyle}>{errorText}</Text>
                <TouchableOpacity
                    style={[styles.btn_style, btnStyle]}
                    onPress={onPress}>
                    <Text style={[styles.title,{color:this.baseTheme.brightTextColor}]}>{btnTitle}</Text>
                </TouchableOpacity>
            </View>
        </View>
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
    },
    btn_style: {
        paddingHorizontal: 10,
        paddingVertical: 3,
        borderRadius: 3,
        borderWidth: 1,
    },
    errorContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title:{
        fontSize:12,
    }
});

