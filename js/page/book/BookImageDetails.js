/**
 * @flow
 */
import * as React from 'react';
import {ImageBackground,ScrollView,Text,TouchableOpacity,View,FlatList,SafeAreaView} from 'react-native';
import {BaseImage,BaseString} from '../../base';
import {style} from "./Styles";
// import {SafeAreaView} from 'react-navigation';
import AutoSizingImage from '../../component/AutoSizingImage';
type Props = {
   data:Array<any>
}

export class BookImageDetails extends React.Component<Props,any>{

    render(){
        return(
            <SafeAreaView style={{flex:1}}>

            <FlatList
                style={{flex:1}}
                renderItem={this._renderItem}
                data={this.props.data}
                keyExtractor={this._keyExtractor}
                initialNumToRender={10}
                showsVerticalScrollIndicator={false}
            />
            </SafeAreaView>
        )
    }
    _keyExtractor=(item,i)=>i+'';

    _renderItem=({item})=>{
        return(
            <AutoSizingImage
                uri={item}
                width={WIDTH}
                style={{borderRadius:0}}
            />
        )
    }

}