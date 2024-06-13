import { Text,Image, View, Dimensions } from "react-native";
import {format} from 'date-fns'

const {width,height} =  Dimensions.get('screen')
const PLACE = 32737
const DATE = new Date()

export default ()=> {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
        <Image
        source={{uri:"https://www.shmu.sk/data/datanwp/v2/epsgram_a-laef/a-laef-epsgram_"+PLACE+"-"+format(DATE,"yyyyMMdd")+"-0000-nwp-.png"}}
        style={{width,height}}
      />
    </View>
  );
}
