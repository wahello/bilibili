import * as React from 'react';
import {View,Text} from 'react-native';
import {BaseContainer,BaseString} from '../../base';
import {observer,inject} from 'mobx-react';
import {RouteHelper} from 'react-navigation-easy-helper';
import {SettingItem} from '../setting/SettingItem';
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
          <BaseContainer
            title='设置'
          >
             <SettingItem/>
          </BaseContainer>
        )
    }

    onPress=()=>{
           // Toast.showToast()
         this.baseTheme.changeBgImage()
    }
}
