import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { Text, View, Pressable } from "react-native";
import styles from "../style/style";
import Header from "./Header";
import Footer from "./Footer";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {
  NBR_OF_DICES,
  NBR_OF_THROWS,
  MIN_SPOT,
  MAX_SPOT,
  BONUS_POINTS_LIMIT,
  BONUS_POINTS,
  SCOREBOARD_KEY,
} from "../constants/Game";

let board = [];

export default Gameboard = ({ route }) => {
  const [nbrOfThrowsLeft, setNbrOfThrowsLeft] = useState(NBR_OF_THROWS);
  const [sum, setSum] = useState(0);
  const [status, setStatus] = useState("Throw dices!");
  const [playerName, setPlayerName] = useState("");
  const [isGameEnded, setIsGameEnded] = useState(false);
  const [selectedDices, setSelectedDices] = useState(
    new Array(NBR_OF_DICES).fill(false)
  );
  const [selectedSpotTotals, setSelectedSpotTotals] = useState(
    new Array(MAX_SPOT).fill(0)
  );
  const [selectedSpots, setSelectedSpots] = useState(
    new Array(MAX_SPOT).fill(false)
  );

  //row for dices
  const Dice = ({ index }) => {
    return (
      <View style={styles.container}>
        <Pressable key={"row" + index} onPress={() => selectDice(index)}>
          <MaterialCommunityIcons
            name={board[index]}
            key={"row" + index}
            size={50}
            color={getDiceColor(index)}
          ></MaterialCommunityIcons>
        </Pressable>
      </View>
    );
  };

  const row = [];
  for (let i = 0; i < NBR_OF_DICES; i++) {
    row.push(<Dice key={i} index={i} />);
  }

  // row for spots
  const Spot = ({ index }) => {
    return (
      <View style={styles.container}>
        <Text style={styles.spotText}>{selectedSpotTotals[index - 1]}</Text>
        <Pressable onPress={() => selectSpot(index)}>
          <MaterialCommunityIcons
            name={`numeric-${index}-circle-outline`}
            size={50}
            color={selectedSpots[index - 1] ? "#346751" : "#2c3e50"}
          />
        </Pressable>
      </View>
    );
  };

  const spots = [];
  for (let i = 1; i <= MAX_SPOT; i++) {
    spots.push(<Spot key={i} index={i} />);
  }

  useEffect(() => {
    if (route.params?.playerName) {
      setPlayerName(route.params.playerName);
    }
  }, []);

  useEffect(() => {
    // Call storeData only if sum is updated and the game has ended
    if (isGameEnded) {
      storeData();
    }
  }, [sum, isGameEnded]);


  function getDiceColor(i) {
    if (board.every((val, i, arr) => val === arr[0])) {
      return "#c00000"; //reddish;
    } else {
      return selectedDices[i] ? "#346751" /*green*/ : "#2c3e50" /*black*/;
    }
  }

  const selectDice = (i) => {
    let dices = [...selectedDices];
    dices[i] = selectedDices[i] ? false : true;
    setSelectedDices(dices);
  };

  const throwDices = () => {
    for (let i = 0; i < NBR_OF_DICES; i++) {
      if (!selectedDices[i]) {
        let randomNumber = Math.floor(Math.random() * 6 + 1);
        board[i] = "dice-" + randomNumber + "-outline";
      }
    }
    const updatedThrowsLeft = nbrOfThrowsLeft - 1;
    setNbrOfThrowsLeft(updatedThrowsLeft);

    if (updatedThrowsLeft > 0) {
      setStatus("Select dices and throw again!");
    } else if (updatedThrowsLeft === 0) {
      setStatus("Select your points before next throw!");
    }
  };

  const selectSpot = (spot) => {
    if (nbrOfThrowsLeft > 0) {
      setStatus("Throw 3 times before setting points");
      return;
    }
    // Check if the spot is already locked
    if (selectedSpots[spot - 1]) {
      setStatus("you alredy selected this spot!");
      return; // Do nothing if the spot is locked
    }

    let total = 0;
    for (let i = 0; i < NBR_OF_DICES; i++) {
      if (board[i] === "dice-" + spot + "-outline") {
        total += spot;
      }
    }
    let totals = [...selectedSpotTotals];
    totals[spot - 1] = total;
    setSelectedSpotTotals(totals);
    setSelectedDices(new Array(NBR_OF_DICES).fill(false));
    setNbrOfThrowsLeft(NBR_OF_THROWS);
    setSum(totals.reduce((a, b) => a + b, 0));

    // Lock the spot after selecting it
    const updatedLockedSpots = [...selectedSpots];
    updatedLockedSpots[spot - 1] = true;
    setSelectedSpots(updatedLockedSpots);
    checkGameEnd(updatedLockedSpots);
  };

  const checkGameEnd = (updatedLockedSpots) => {
    const allSpotsSelected = updatedLockedSpots.every((selected) => selected);
    if (allSpotsSelected) {
      setIsGameEnded(true);
      setStatus("Game ended!");
    }
  };

  const storeData = async () => {
    try {
      const playerData = {
        playerName: playerName,
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
        sum: sum,
      };
      await AsyncStorage.setItem(SCOREBOARD_KEY, JSON.stringify(playerData));
    } catch (error) {
      console.log(error);
    }
  };

  const resetGame = () => {
    setNbrOfThrowsLeft(NBR_OF_THROWS);
    setSum(0);
    setStatus("Throw dices!");
    setSelectedDices(new Array(NBR_OF_DICES).fill(false));
    setSelectedSpotTotals(new Array(MAX_SPOT).fill(0));
    setSelectedSpots(new Array(MAX_SPOT).fill(false));
    setIsGameEnded(false);
    board = [];
  };

  return (
    <View style={styles.container}>
      <Header />
      {nbrOfThrowsLeft === 3 ? (
        <View style={styles.gameboard}>
          <MaterialCommunityIcons
            name="dice-multiple-outline"
            size={100}
          ></MaterialCommunityIcons>
        </View>
      ) : (
        <View style={styles.flex}>{row}</View>
      )}
      <Text style={[styles.gameinfo, styles.gameinfoBold]}>
        Throws left: {nbrOfThrowsLeft}
      </Text>
      <Text style={[styles.gameinfo, styles.gameinfoBold]}>{status}</Text>
      {!isGameEnded && (
        <View style={styles.buttonContainer}>
          <Pressable
            style={styles.button}
            onPress={() => throwDices()}
            disabled={nbrOfThrowsLeft === 0 ? true : false}
          >
            <Text style={styles.buttonText}>Throw dices</Text>
          </Pressable>
        </View>
      )}
      {isGameEnded && (
        <View style={styles.buttonContainer}>
          <Pressable style={styles.button} onPress={resetGame}>
            <Text style={styles.buttonText}>Restart Game</Text>
          </Pressable>
        </View>
      )}
      <Text style={[styles.gameinfo, styles.gameinfoBold]}>Total: {sum}</Text>
      <Text style={styles.gameinfo}>
        {sum > 63
          ? `Congratulations! Bonus points ${BONUS_POINTS} added!`
          : `You are ${64 - sum} points away from the bonus!`}
      </Text>
      <Text style={[styles.gameinfo, styles.gameinfoBold]}>
        Player: {playerName}
      </Text>
      <View style={styles.container}>
        <View style={styles.flex}>{spots}</View>
      </View>
      <Footer style={styles.author} />
    </View>
  );
};
