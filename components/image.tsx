import { Image, Dimensions, ScrollView } from 'react-native'
import { format } from 'date-fns'

const { width, height } = Dimensions.get('screen')
const PLACE = '32737'
const DATE = new Date()
const TIME = '0000'
const BASE_URL = 'https://www.shmu.sk/data/datanwp/v2'

const Meteogram = () => {
  return (
    <ScrollView>
      <Image
        source={{
          uri: `${BASE_URL}/epsgram_a-laef/a-laef-epsgram_${
            PLACE
          }-${format(DATE, 'yyyyMMdd')}-${TIME}-nwp-.png`,
        }}
        style={{ width, height }}
      />
    </ScrollView>
  )
}

export default Meteogram
