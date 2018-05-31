/**
 * @flow
 */
import * as React from 'react';
import FastImage from 'react-native-fast-image'

type Props={
    styles:any,
    uri:string|number,
    children:any
}

export const ImageView=(props:Props)=>(
    <FastImage
        style={props.styles}
        source={
            {uri:props.uri, priority: FastImage.priority.normal,cache:'force-cache'}
        }
        resizeMode={FastImage.resizeMode.contain}>
        {props.children}
        </FastImage>
);

