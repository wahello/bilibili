import React from 'react';
import {Text,Image,StyleSheet,TouchableOpacity} from 'react-native';
import {BaseLikeScreen} from "./BaseLikeScreen";
import {BaseString,BaseImage} from '../../base/'
import {scaleSize} from "../../utils/ScreenUtils";

export default class UpdateBookScreen extends React.Component{

    render(){

        return(
            <BaseLikeScreen>
                <Image source={BaseImage.bg_dafalt} style={style.bg_dafalt}/>
                <TouchableOpacity style={style.paper}>
                    <Text style={{color:'#fff'}} onPress={()=>this.props.navigate('Book')}>{BaseString.ADD_BOOK}</Text>
                </TouchableOpacity>
            </BaseLikeScreen>
        )

    }
}
const style = StyleSheet.create({
    bg_dafalt:{
        width:scaleSize(153),
        height:scaleSize(153),
    },
    paper:{
        height: 40,
        width: 140,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'red',
        borderRadius:30,
        position:'absolute',
        bottom:HEIGHT/5,
        shadowColor: 'black',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        shadowOffset: {
            height: 5,
        },
        elevation: 4,
    }
});

