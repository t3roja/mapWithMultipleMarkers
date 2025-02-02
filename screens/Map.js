import React, { useState, useCallback } from 'react'
import { Platform, StyleSheet } from 'react-native'
import MapView from 'react-native-maps'
import { useFocusEffect } from '@react-navigation/native'
import Constants from 'expo-constants'
import AddMarker from '../components/Marker'
import uuid from 'react-native-uuid'

export default function Map(props) {

  const [markers, setMarkers] = useState([])

  useFocusEffect(
    useCallback(() => {
      props.getUserPosition();
    }, [])
  );

  const addMarker = (e) => {
    const coords = e.nativeEvent.coordinate
    setMarkers([...markers, { id: uuid.v4(), ...coords }])
  }

  return (
    <>
      <MapView
        style={styles.map}
        region={props.location}
        mapType={props.mapType}
        onLongPress={addMarker}
      >
        {markers.map((marker) => (
          <AddMarker
            key={marker.id}
            title={`Marker ${marker.id}`}
            latitude={marker.latitude}
            longitude={marker.longitude}
          />
        ))}
      </MapView>
    </>
  );
}

const styles = StyleSheet.create({
  map: {
    height: '100%',
    width: '100%',

    //marginTop: Platform.OS === 'android' ? Constants.statusBarHeight : 0
  }
})
