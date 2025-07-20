import Meteogram from '@/components/image'
import { View, StyleSheet, Button, Text } from 'react-native'
import * as Location from 'expo-location'
import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'

const getDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
) => {
  const difLat = Math.abs(lat1 - lat2)
  const difLon = Math.abs(lon1 - lon2)
  return Math.sqrt(difLat * difLat + difLon * difLon)
}

type ShmuLocation = {
  station_id: number
  station_name: string
  lat: string
  lon: string
  district_code?: number
}
type ShmuLocationWithDistance = ShmuLocation & { distance: number }

const getLocations = async () => {
  const response = await fetch(
    'https://www.shmu.sk/api/v1/nwp/getjsonaladinstations',
  )
  return response.json()
}

export default () => {
  const [location, setLocation] = useState<Location.LocationObject | null>(null)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  const { data } = useQuery<ShmuLocation[]>({
    queryKey: ['locations'],
    queryFn: getLocations,
  })

  const closestLocation = data?.reduce<ShmuLocationWithDistance>((closest, current) => {
    if (!location) return closest

    const currentDistance = getDistance(
      parseFloat(current.lat),
      parseFloat(current.lon),
      location.coords.latitude,
      location.coords.longitude,
    )
    if (currentDistance < closest.distance) {
      return {...current, distance: currentDistance }
    }
    return closest
    
  }, {...data[0], distance: Infinity}) || null

  useEffect(() => {
    async function getCurrentLocation() {
      let { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied')
        return
      }

      let location = await Location.getCurrentPositionAsync({})
      setLocation(location)
    }

    getCurrentLocation()
  }, [])

  return (
    <View style={styles.container}>
      <Text>{location?.coords.latitude} - {location?.coords.longitude}</Text>
      <Text>{closestLocation?.station_name}</Text>
      <Text>Distance: {closestLocation?.distance.toFixed(2)} km</Text>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
