import Meteogram from '@/components/image'
import { View, StyleSheet, Button, Text } from 'react-native'
import * as Location from 'expo-location'
import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { WeatherData } from '@/components/types'
import { MyChart } from '@/components/chart'

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

export type Station = {
  station_id: number
  station_name: string
  lat: string
  lon: string
  district_code: number
}

export type ModelResultDescriptor = {
  type: string
  dt_runtime: string
  runtime: number
  file_link: string
}

type GetModelResultDescriptorsForStation = {
  station: Station
  data: ModelResultDescriptor[]
}

const getLocations = async () => {
  const response = await fetch(
    'https://www.shmu.sk/api/v1/nwp/getjsonaladinstations',
  )
  return response.json()
}

const getModelResultDescriptorsForStation = async (stationId: string) => {
  const response = await fetch(
    'https://www.shmu.sk/api/v1/nwp/getstationproducts?station=' + stationId,
  )
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  console.log(
    response,
    'https://www.shmu.sk/api/v1/nwp/getstationproducts?station=' + stationId,
  )
  return response.json()
}

const getWeatherData = async (fileLink: string) => {
  const response = await fetch(
    'https://www.shmu.sk/data/datanwp/json/'+fileLink,
  )
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  return response.json()
}

export default () => {
  const [location, setLocation] = useState<Location.LocationObject | null>(null)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  const { data } = useQuery<ShmuLocation[]>({
    queryKey: ['locations'],
    queryFn: getLocations,
  })


  const closestLocation =
    data?.reduce<ShmuLocationWithDistance>(
      (closest, current) => {
        if (!location) return closest

        const currentDistance = getDistance(
          parseFloat(current.lat),
          parseFloat(current.lon),
          location.coords.latitude,
          location.coords.longitude,
        )
        if (currentDistance < closest.distance) {
          return { ...current, distance: currentDistance }
        }
        return closest
      },
      { ...data[0], distance: Infinity },
    ) || null

  const { data: descriptorsData, error } =
    useQuery<GetModelResultDescriptorsForStation>({
      queryKey: ['location-descriptors', closestLocation?.station_id],
      enabled: !!closestLocation?.station_id,
      queryFn: () =>
        getModelResultDescriptorsForStation(closestLocation?.station_id + ''),
    })


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

  const firstDataset = descriptorsData?.data?.find(
    (d) => d.type === 'alaef',
  )

  const {data: weatherData, isLoading} = useQuery<WeatherData>({
    queryKey: ['weather-data', closestLocation?.station_id, firstDataset?.dt_runtime],
    enabled: !!firstDataset?.file_link,
    queryFn: () => getWeatherData(firstDataset?.file_link??''),
  })


  const temps = weatherData?.Air_temperature_at_2m?.data??[]
  const rain  = weatherData?.Total_precipitation?.data??[]
  const cloud = weatherData?.Total_cloud_cover?.data??[]

  console.log('weatherData',  data)


  return (
    <View style={styles.container}>
      <Text>
        {location?.coords.latitude} - {location?.coords.longitude}
      </Text>
      <Text>{closestLocation?.station_name}</Text>
      <Text>Distance: {closestLocation?.distance.toFixed(2)} km</Text>
      <MyChart  temps={temps} rain={rain} cloud={cloud}/>
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
