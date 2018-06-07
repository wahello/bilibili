import React from 'react';
import {StyleSheet,View} from 'react-native';
import {observer,inject} from 'mobx-react';

type Props ={
    children:React.Children
}

@inject('baseTheme')
@observer
export class BaseLikeScreen extends React.Component<Props>{

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.baseTheme = this.props.baseTheme;
    }

    render(){

        return(
            <View style={[style.UpdateBookScreen,{backgroundColor:this.baseTheme.brightBackGroundColor}]}>
                {this.props.children}
            </View>
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
});