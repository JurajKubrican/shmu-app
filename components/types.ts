export interface WeatherData {
  location_name: string
  lat: string
  lon: string
  elevation: string
  si_id: string
  model_name: string
  data_date_time: string
  Orography: Orography
  Total_cloud_cover: TotalCloudCover
  Total_precipitation: TotalPrecipitation
  Maximum_temperature_in_the_last_hour: MaximumTemperatureInTheLastHour
  Air_temperature_at_2m: AirTemperatureAt2m
  Wind_speed_at_10m: WindSpeedAt10m
  Snowfall: Snowfall
  Low_cloud_cover: LowCloudCover
  High_cloud_cover: HighCloudCover
  Minimum_temperature_in_the_last_hour: MinimumTemperatureInTheLastHour
  Wind_gust_at_10m: WindGustAt10m
  Medium_cloud_cover: MediumCloudCover
  Mean_sea_level_pressure: MeanSeaLevelPressure
  Wind_direction_at_10m: WindDirectionAt10m
}

export interface Orography {
  comment: string
  unit: string
  data: number[][]
}

export interface TotalCloudCover {
  comment: string
  unit: string
  columns: string[]
  data: number[][]
}

export interface TotalPrecipitation {
  comment: string
  unit: string
  columns: string[]
  data: number[][]
}

export interface MaximumTemperatureInTheLastHour {
  comment: string
  unit: string
  columns: string[]
  data: number[][]
}

export interface AirTemperatureAt2m {
  comment: string
  unit: string
  columns: string[]
  data: number[][]
}

export interface WindSpeedAt10m {
  comment: string
  unit: string
  columns: string[]
  data: number[][]
}

export interface Snowfall {
  comment: string
  unit: string
  columns: string[]
  data: number[][]
}

export interface LowCloudCover {
  comment: string
  unit: string
  columns: string[]
  data: number[][]
}

export interface HighCloudCover {
  comment: string
  unit: string
  columns: string[]
  data: number[][]
}

export interface MinimumTemperatureInTheLastHour {
  comment: string
  unit: string
  columns: string[]
  data: number[][]
}

export interface WindGustAt10m {
  comment: string
  unit: string
  columns: string[]
  data: number[][]
}

export interface MediumCloudCover {
  comment: string
  unit: string
  columns: string[]
  data: number[][]
}

export interface MeanSeaLevelPressure {
  comment: string
  unit: string
  columns: string[]
  data: number[][]
}

export interface WindDirectionAt10m {
  comment: string
  unit: string
  columns: string[]
  data: number[][]
}
