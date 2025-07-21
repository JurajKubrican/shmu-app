import { View } from "react-native";
import { CartesianChart, Line } from "victory-native";
import { useFont } from "@shopify/react-native-skia";
import { FC } from "react";
// 👇 import a font file you'd like to use for tick labels

type Props = {
  times: number[]
  temps: number[]
}

export const  MyChart:FC<Props> = ({times, temps})=> {

  const data = times.map((time, index) => ({
    time: time,
    temp: temps[index],
  }))??[];

  return (
    <View style={{ height: 300, width:"100%", borderColor: 'black', borderWidth: 1 }}>
      <CartesianChart
        data={data} 
        xKey="time" 
        yKeys={["temp"]} // 👈 specify data keys used for y-axis
      >
        {({ points }) => (
          <>
          <Line points={points.temp} color="red" strokeWidth={3} />
          </>
        )}

      </CartesianChart>
    </View>
  );
}

const DATA = Array.from({ length: 31 }, (_, i) => ({
  day: i,
  lowTmp: 20 + 10 * Math.random(),
  highTmp: 40 + 30 * Math.random(),
}));