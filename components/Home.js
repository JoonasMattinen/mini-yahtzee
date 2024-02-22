import { useState } from 'react'
import { Text, TextInput, View, Pressable, Keyboard, Alert } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Header from './Header'
import Footer from './Footer'
import styles from '../style/style'
import { 
    NBR_OF_DICES,
    NBR_OF_tHROWS,
    MIN_SPOT,
    MAX_SPOT,
    BONUS_POINTS_LIMIT,
    BONUS_POINTS } from '../constants/Game'

export default Home = ({navigation}) => {

    const [playerName, setPlayerName] = useState('')
    const [hasPlayerName, setHasPlayerName] = useState(false)

    const  handlePlayerName = (value) => {
        if(value.trim().length > 0) {
            setHasPlayerName(true)
            Keyboard.dismiss()
        }else {
            Alert.alert('Player name is required!')
        }
    }

    return (
        <View>
        <Header />
        <TextInput 
        style={styles.gameinfo}
        value={playerName}
        onChangeText={setPlayerName}
        onEndEditing={(e) => handlePlayerName(e.nativeEvent.text)}
        placeholder='Enter your name...'
        returnKeyType='done'
        >        
        </TextInput>
        <Footer style={styles.author} />
        </View>
    );
}