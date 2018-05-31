/**
 * @flow
 */
import React from 'react';
import {Image,StyleSheet} from 'react-native';
import {BaseImage} from '../base';

export default class SplashScreen extends React.Component<any,any>{

    componentDidMount() {
        this.timer = setTimeout(()=>{
            this.props.navigation.navigate('ModalView')
        },2000)
    }

    componentWillUnmount() {
        this.timer && clearTimeout(this.timer)
    }

    render(){

        return(
            <Image
                source={BaseImage.ad_splsh_bg}
                style={styles.container}
            />
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        width:WIDTH,
        height:HEIGHT
    }
});