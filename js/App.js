/**
 * @flow
 */

import * as React from 'react';
import {Provider} from 'mobx-react';
import Store  from './mobx/index';
import configAppNavigator from './route/TabRoute';

type State = {
    initApp:string;
    show:boolean
}

export default class App extends React.Component<any,State>{

    state={
        initApp:'',
        show:true
    };

    async componentDidMount() {
        setTimeout(()=>{
          this.setState({
              initApp:'Splash'
          })
        },100)
    }

    render(){
        const {initApp} = this.state;
        if (!!initApp){
            const App = configAppNavigator(initApp);
            return(
                <Provider {...Store}>
                   <App/>
                </Provider>
            )
        }

        return null;

    }
}
