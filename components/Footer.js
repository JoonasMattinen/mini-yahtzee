import React from 'react'
import { Text, View } from 'react-native';
import styles from '../style/style';

export default function Footer() {
  return (
    <View style={styles.footer}>
      <Text style={[styles.author, styles.customFont]}>
        Author: Joonas Mattinen
      </Text>
    </View>
  )
}