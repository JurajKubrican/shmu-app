import { View } from 'react-native'
import { Area, AreaRange, CartesianChart, Line } from 'victory-native'
import { FC } from 'react'

type Props = {
  temps: number[][]
  rain: number[][]
  cloud: number[][]
}

export const MyChart: FC<Props> = ({ temps = [], rain = [], cloud = [] }) => {
  const data = temps.map((t, i) => {
    console.log(cloud[i])
    return {
      time: t[0],
      minT: t[1],
      medianT: t[3],
      maxT: t[5],
      minR: rain[i]?.[1] ?? 0,
      medianR: rain[i]?.[3] ?? 0,
      maxR: rain[i]?.[5] ?? 0,

      medianC: 100 - (cloud[i]?.[3] ?? 100),
    }
  })

  return (
    <View
      style={{
        height: 300,
        width: '100%',
        borderColor: 'black',
        borderWidth: 1,
      }}
    >
      <CartesianChart
        data={data}
        xKey="time"
        yKeys={[
          'minT',
          'medianT',
          'maxT',
          'minR',
          'medianR',
          'maxR',
          'medianC',
        ]} 
      >
        {({ points }) => (
          <>
            <Line points={points.medianT} color="red" strokeWidth={3} />
            <AreaRange
              points={points.medianT.map((p, i) => ({
                ...p,
                y0: points.minT[i].y,
                y: points.maxT[i].y,
              }))}
              color="red"
              opacity={0.2}
            />
            <Line points={points.medianR} color="blue" strokeWidth={3} />
            <AreaRange
              points={points.medianT.map((p, i) => ({
                ...p,
                y0: points.minR[i].y,
                y: points.maxR[i].y,
              }))}
              color="blue"
              opacity={0.2}
            />
            <Area
              points={points.medianC.map((p, i) => ({
                ...p,
              }))}
              y0={0}
              color="green"
              opacity={0.2}
            />
          </>
        )}
      </CartesianChart>
    </View>
  )
}
