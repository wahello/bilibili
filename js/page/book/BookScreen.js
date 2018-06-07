import * as React from 'react';
import {BaseContainer} from '../../base';
import {observer,inject} from 'mobx-react';
import {toJS} from 'mobx';
import {ClassBookView} from "./ClassBookView";
import SplashScreen from 'react-native-splash-screen'

@inject('bookClassStore')
@observer
export class BookScreen extends React.Component{

    // 构造
    constructor(props) {
        super(props);
        this.bookClassStore = this.props.bookClassStore;
    }
    
    componentDidMount() {
        SplashScreen.hide();
        this.bookClassStore.fetchData()
    }

    render(){

        const {navigate} = this.props.navigation;
        let sections = toJS(this.bookClassStore.data);

        return(
            <BaseContainer
                store={this.bookClassStore}>
                <ClassBookView
                    navigate={navigate}
                    sections={sections}/>
            </BaseContainer>
        )
    }
}

