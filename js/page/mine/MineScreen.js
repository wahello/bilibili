import * as React from 'react';
import {View,Text} from 'react-native';
import {BaseContainer,BaseString} from '../../base';
import {observer,inject} from 'mobx-react';
import {RouteHelper} from 'react-navigation-easy-helper';
@inject('baseTheme')
@observer
export class MineScreen extends React.Component{

    // 构造
      constructor(props) {
        super(props);
        // 初始状态
       this.baseTheme = this.props.baseTheme;
      }

    render(){
        return(
          <BaseContainer>
              <Text onPress={this.onPress}>改变背景</Text>
          </BaseContainer>
        )
    }

    onPress=()=>{
           // Toast.showToast()
         this.baseTheme.changeBgImage()
    }
}
