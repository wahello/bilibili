import * as React from 'react';
import {View,Text} from 'react-native';
import {BaseContainer,BaseString} from '../../base';
import {observer,inject} from 'mobx-react';
import {RouteHelper} from 'react-navigation-easy-helper';

@observer
export class MineScreen extends React.Component{


    render(){
        return(
          <BaseContainer>
              <Text onPress={()=>RouteHelper.navigate('Test')}>跳转</Text>
          </BaseContainer>
        )
    }
}
