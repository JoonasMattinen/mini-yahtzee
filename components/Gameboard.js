import { Text, View } from 'react-native'
import styles from '../style/style'
import Header from './Header'
import Footer from './Footer'

export default Gameboard = ({route, navigation}) => {

  const {playerName} = route.params;

  return (
    <View>
      <Header />
      <Text>
        Gameboard will be here...
      </Text>
      <Text style={[styles.gameinfo, styles.gameinfoBold]}>
        Player: {playerName}
      </Text>
      <Footer style={styles.author} />
    </View>
  )
}