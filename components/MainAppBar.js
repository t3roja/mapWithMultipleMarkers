import React from 'react'
import { Appbar } from 'react-native-paper'
import { getHeaderTitle } from '@react-navigation/elements'


export default function MainAppBar(props) {
    const title = getHeaderTitle(props.options, props.route.name)

    const removeAllMarkers = () => {
        props.setMarkers([])
    }

    //console.log(props.navigation)
    return (
        <Appbar.Header style={{ backgroundColor: props.backgroundColor }}>
            {props.back ? <Appbar.BackAction onPress={() => props.navigation.goBack()} /> : null}
            <Appbar.Content title={title} />
            {props.back ? null : <Appbar.Action icon={'map-marker-remove-outline'} onPress={removeAllMarkers} />}
            {props.back ? null : <Appbar.Action icon={props.icon} onPress={props.getUserPosition} />}
            {props.back ? null : <Appbar.Action icon={'cog'} onPress={() => props.navigation.navigate('Settings')} />}
                
        </Appbar.Header>
    )
}
