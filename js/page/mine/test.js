import * as React from 'react';
import {View,Text} from 'react-native';
import {BaseContainer,BaseString} from '../../base';
import {observer,inject} from 'mobx-react';


@observer
export class Test extends React.Component{
    

    render(){
        return(
            <Text onPress={()=>this.props.navigation.push('Test')}>
                点击
            </Text>
        )
    }
}
