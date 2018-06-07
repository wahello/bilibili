/**
 * @flow
 */
import React from 'react';
import {Image,StyleSheet} from 'react-native';
import {BaseImage} from '../base';
import SplashScreen from 'react-native-splash-screen'



export default class SplashScreen1 extends React.Component<any,any>{

    componentDidMount() {

        SplashScreen.hide();
        this.props.navigation.navigate('Tab')
        // this.timer = setTimeout(()=>{
        //
        // },2000)
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