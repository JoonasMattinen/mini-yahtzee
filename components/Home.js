import { useState } from "react";
import {
  Text,
  TextInput,
  View,
  Pressable,
  Keyboard,
  Alert,
  ScrollView,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Header from "./Header";
import Footer from "./Footer";
import styles from "../style/style";
import {
  NBR_OF_DICES,
  NBR_OF_THROWS,
  MIN_SPOT,
  MAX_SPOT,
  BONUS_POINTS_LIMIT,
  BONUS_POINTS,
} from "../constants/Game";

export default Home = ({ navigation }) => {
  const [playerName, setPlayerName] = useState("");
  const [hasPlayerName, setHasPlayerName] = useState(false);

  const handlePlayerName = (value) => {
    if (value.trim().length > 0) {
      setHasPlayerName(true);
      Keyboard.dismiss();
      console.log("Player name:", value);
    } else {
      Alert.alert("Player name is required!");
    }
  };

  if (hasPlayerName === false) {
    return (
      <View>
        <Header />
        <TextInput
          style={styles.gameinfo}
          value={playerName}
          onChangeText={setPlayerName}
          placeholder="Enter your name..."
          returnKeyType="done"
        ></TextInput>
        <View style={styles.buttonContainer}>
          <Pressable
            style={styles.button}
            title="Start Game"
            onPress={() => {
              handlePlayerName(playerName);
            }}
          >
            <Text style={styles.buttonText}>OK</Text>
          </Pressable>
        </View>
        <Footer style={styles.author} />
      </View>
    );
  } else {
    return (
      <View>
        <ScrollView>
        <Header />
        <View style={styles.gameboard}>
          <MaterialCommunityIcons
            name="dice-multiple-outline"
            size={100}
          ></MaterialCommunityIcons>
        </View>
        <Text style={[styles.gameinfo, styles.gameinfoBold]}>
          Rules of the game
        </Text>
        <Text style={styles.row}>
          THE GAME: Upper section of the classic Yahtzee dice game. You have{" "}
          {NBR_OF_DICES} dices and for the every dice you have {NBR_OF_THROWS}
          throws. After each throw you can keep dices in order to get same dice
          spot counts as many as possible. In the end of the turn you must
          select your points from {MIN_SPOT} to {MAX_SPOT}. Game ends when all
          points have been selected. The order for selecting those is free.
        </Text>
        <Text style={styles.row}>
          POINTS: After each turn game calculates the sum for the dices you
          selected. Only the dices having the same spot count are calculated.
          Inside the game you can not select same points from
          {MIN_SPOT} to {MAX_SPOT} again.
        </Text>
        <Text style={styles.row}>
          GOAL: To get points as much as possible.
          {BONUS_POINTS_LIMIT} points is the limit of getting bonus which gives
          you {BONUS_POINTS}
          points more.
        </Text>
        <Text style={[styles.gameinfo, styles.gameinfoBold]}>
          Good luck {playerName}!
        </Text>
        <View style={styles.buttonContainer}>
          <Pressable 
          style={styles.button}
          onPress={() => navigation.navigate("Gameboard" , {playerName})}
          >
            <Text style={styles.buttonText}>PLAY</Text>
          </Pressable>
        </View>
        <Footer />
        </ScrollView>
      </View>
    );
  }
};
