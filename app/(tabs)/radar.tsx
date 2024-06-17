import Meteogram from '@/components/image'
import { View, StyleSheet } from 'react-native'

export default function Tab() {
  return (
    <View style={styles.container}>
      <Meteogram />
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
