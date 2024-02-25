import AsyncStorage from "@react-native-async-storage/async-storage";
import { Text, View } from "react-native";
import Header from "./Header";
import Footer from "./Footer";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import styles from "../style/style";
import { useEffect, useState } from "react";
import { SCOREBOARD_KEY } from "../constants/Game";

export default Scoreboard = () => {

  const [playerName, setPlayerName] = useState("");
  const [sum, setSum] = useState(0);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
    const getStoredData = async () => {
      try {
        const serializedPlayerData = await AsyncStorage.getItem(SCOREBOARD_KEY);
        if (serializedPlayerData !== null) {
          // Parse the string back into an object
          const playerData = JSON.parse(serializedPlayerData);
          console.log("Retrieved player data:", playerData);

          // You can now access playerName and score like this:
          console.log("Player name:", playerData.playerName);
          console.log("Sum:", playerData.sum);
          setPlayerName(playerData.playerName);
          setSum(playerData.sum);
          setDate(playerData.date);
          setTime(playerData.time);
        }
      } catch (e) {
        console.log(e);
      }
    };
    getStoredData();
  }, []);

  return (
    <View>
      <Header />
      <View style={styles.gameboard}>
        <MaterialCommunityIcons
          name="star-shooting-outline"
          size={100}
        ></MaterialCommunityIcons>
      </View>
      <Text>Player: {playerName} Date: {date}{time} Score: {sum}</Text>
      <Footer />
    </View>
  );
};

