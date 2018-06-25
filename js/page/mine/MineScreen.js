import * as React from 'react';
import {View,Text, StatusBar} from 'react-native';
import {BaseContainer,BaseString} from '../../base';
import {observer,inject} from 'mobx-react';
import {RouteHelper} from 'react-navigation-easy-helper';
import {SettingItem} from '../setting/SettingItem';
import {login} from "../../server/login";
// import { State, LongPressGestureHandler ,ScrollView,NativeViewGestureHandler} from 'react-native-gesture-handler';


@inject('baseTheme')
@observer
export class MineScreen extends React.Component{



    // 构造
      constructor(props) {
        super(props);
        // 初始状态
       this.baseTheme = this.props.baseTheme;
      }

    _onHandlerStateChange=({nativeEvent})=>{
          // if (nativeEvent.state ===State.ACTIVE){
          //     alert('触摸')
          // }
        console.log(nativeEvent)
         // console.log(nativeEvent.state)
    }

    render(){
        return(
          <BaseContainer
            title='设置'>
             {/*<SettingItem/>*/}
              {/*<Text onPress={this.onPress}>登录</Text>*/}
              {/*<LongPressGestureHandler onHandlerStateChange={this._onHandlerStateChange}>*/}
                  {/*<Text style={{fontSize:26}}>触摸</Text>*/}
              {/*</LongPressGestureHandler>*/}
            {/* <ScrollView
                NativeViewGestureHandler={this._onHandlerStateChange}>
                <Text>123</Text>
            </ScrollView> */}
          </BaseContainer>
        )
    }

    onPress=()=>{
           // Toast.showToast()
         login();
    }
}
