import {StyleSheet} from 'react-native';
import {isIPhoneX, scaleSize} from "../../utils/ScreenUtils";

export const style = StyleSheet.create({
    topSearchView:{
        //justifyContent:'center',
        //alignItems:'center',
        position:'absolute',
        flexDirection:'row',
        top:0,
        left:0,
        zIndex:99,
        shadowOffset: {width: 1, height: 1},
        shadowOpacity: 1,
        shadowRadius: 5,
        shadowColor: 'rgba(0,0,0,0.5)',
        elevation: 10,
    },
    bottomSearchView:{
        flex:1,
        width:WIDTH,
        zIndex:99,
        position:'absolute',
        top:0,
        left:0,
    },
    rightItem:{

    },
    searchInputView:{
        width:WIDTH/4*3,
        height:44,
        marginLeft:20,
        justifyContent:'center',
        alignItems:'center'
    },
    cancel:{
        width:WIDTH/4-20,
        height:44,
        justifyContent:'center',
        alignItems:'center'
    },
    searchView:{
        width:WIDTH/4*3,
        height:30,
        paddingLeft:10
    },
    closeView:{
        position:'absolute',
        right:10,
        top:7,
        width:30,
        height:30,
        borderRadius:15,
        justifyContent:'center',
        alignItems:'center'
    },
    closeImage:{
        width:20,
        height:20
    }
})