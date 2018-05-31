import * as React from 'react';
import {View,TouchableOpacity,Text} from 'react-native';
import {BaseContainer,BaseString} from '../../base';
import {observer,inject} from 'mobx-react';
import {RouteHelper} from 'react-navigation-easy-helper';

@observer
export class BookScreen extends React.Component{


    render(){
        return(
            <BaseContainer>
                <TouchableOpacity
                    onPress={this.onPress}
                    >
                    <Text>点击</Text>
                </TouchableOpacity>
            </BaseContainer>
        )
    }

    onPress=()=>{
        this.props.navigation.navigate('Test')
    }
}
