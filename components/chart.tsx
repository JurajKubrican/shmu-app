import { View } from 'react-native'
import { Area, AreaRange, CartesianChart, Line } from 'victory-native'
import { FC } from 'react'

type Props = {
  temps: number[][]
  rain: number[][]
  cloud: number[][]
}

export const MyChart: FC<Props> = ({ temps = [], rain = [], cloud = [] }) => {
  console.log('temps', temps.length, 'rain', rain.length)
  const data = temps.map((t, i) => {
    console.log(cloud[i])
    return {
      time: t[0],
      minT: t[1],
      medianT: t[3],
      maxT: t[5],
      // todo last rain is not available????
      minR: rain[i]?.[1] ?? 0,
      medianR: rain[i]?.[3] ?? 0,
      maxR: rain[i]?.[5] ?? 0,

      // maxC: 100 - (cloud[i]?.[1] ?? 0),
      medianC: 100 - (cloud[i]?.[3] ?? 0),
      // minC: 100- (cloud[i]?.[5] ?? 0),
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
          // 'minC',
          'medianC',
          // 'maxC',
        ]} // 👈 specify data keys used for y-axis
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

const DATA = Array.from({ length: 31 }, (_, i) => ({
  day: i,
  lowTmp: 20 + 10 * Math.random(),
  highTmp: 40 + 30 * Math.random(),
}))
