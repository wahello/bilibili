// ModalIndicator.js

'use strict';

import React from "react";
import { TouchableWithoutFeedback} from 'react-native';
import {Overlay} from 'teaset';
import {Loading} from '../component/LoadingView';

export class LoadingUtils {
    static hint;
    static overlayView;
    static isShow = false;
    static key;
    static canCanel = true;

    static show(hint = '加载中...', type = 'Wave', loadView = null) {
        this.hide();
        if (!this.overlayView || hint !== this.hint) {
            if (!loadView) {
                loadView = <TouchableWithoutFeedback
                    style={{width: WIDTH, height: HEIGHT, alignItems: 'center', justifyContent: 'center'}}
                    onPress={() => this.canCanel && this.hide() }>
                   <Loading/>
                </TouchableWithoutFeedback>;
            }

            LoadingUtils.overlayView = (
                <Overlay.View
                    containerStyle={{width: WIDTH, height: HEIGHT}}
                    style={{alignItems: 'center', justifyContent: 'center'}}
                    overlayOpacity={0}
                    modal={!this.canCanel}
                >
                    {loadView}
                </Overlay.View>
            );
            LoadingUtils.hint = hint;
        }
        this.key = Overlay.show(LoadingUtils.overlayView);
        this.isShow = true
    }

    static hide() {
        Overlay.hide(LoadingUtils.key)
    }
}
