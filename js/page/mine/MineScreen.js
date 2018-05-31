import * as React from 'react';
import {View,Text} from 'react-native';
import {BaseContainer,BaseString} from '../../base';
import {observer,inject} from 'mobx-react';


@observer
export class MineScreen extends React.Component{


    render(){
        return(
          <BaseContainer>
              <Text onPress={()=>this.props.navigation.navigate('Test')}>跳转</Text>
          </BaseContainer>
        )
    }
}