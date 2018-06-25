/**
 * @format
 * @flow
 */

import React, {Component} from 'react';
import configAppNavigator from './app/route/TabRoute';
type Props = {};
type State = {
    initApp:string;
    show:boolean
}
export default class App extends Component<Props,State> {

  state:State={
      initApp:'',
      show:true
  };

    async componentDidMount() {
        await setTimeout(()=>{
            this.setState({
                initApp:'Tab'
            })
        })
    }

  render() {
      const {initApp} = this.state;
      if (!!initApp){
          const App = configAppNavigator(initApp);
          return(
              <App/>
          )
      }
      return null;
  }
}
