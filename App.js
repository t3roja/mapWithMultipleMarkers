import { StyleSheet } from 'react-native'
import Map from './screens/Map'
import { useState } from 'react'
import { PaperProvider } from 'react-native-paper'
import MainAppBar from './components/MainAppBar'
import * as Location from 'expo-location'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Settings from './screens/Settings'

const settings = {
  backgroundColor: '#00a484'
}

const Stack = createNativeStackNavigator()

const icons = {
  location_not_known: 'crosshairs',
  loacation_searching: 'crosshairs-question',
  location_found: 'crosshairs-gps'
}
export default function App() {

  const [icon, setIcon] = useState(icons.location_not_known)
  const [location, setLocation] = useState({
    latitude: 65.800,
    longitude: 25.4800,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  })

  const [mapType, setMapType] = useState('standard')

  const getUserPosition = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync()

    try {
      if (status !== 'granted') {
        console.log('Geolocation failed')
        setIcon(icons.location_not_known)
        return
      }
      setIcon(icons.loacation_searching)
      const position = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High })
      setLocation({ ...location, 'latitude': position.coords.latitude, 'longitude': position.coords.longitude })
      setIcon(icons.location_found)
      console.log('Geolocation: ', position.coords.latitude, position.coords.longitude)
    } catch (error) {
      setIcon(icons.location_not_known)
      console.log(error)
    }
  }

  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName='Map'
          screenOptions={{header: (props) =>
            <MainAppBar {...props}
            backgroundColor={settings.backgroundColor}
            icon={icon}
            getUserPosition={getUserPosition}
          />}}
          >
            <Stack.Screen name='Map'>
              {() =>
                <Map location={location} mapType={mapType} getUserPosition={getUserPosition}/>
              } 
            </Stack.Screen>
            <Stack.Screen name='Settings'>
              {() =>
                <Settings backgroundColor={settings.backgroundColor} mapType={mapType} setMapType={setMapType}/>
              } 
            </Stack.Screen>
      </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
