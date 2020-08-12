import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export const Quotation = ({result}) => {
  return (
    <View>
      {result.PRICE ?
        <View style={styles.result}>
          <Text style={[styles.text, styles.price]}>
            <Text style={styles.span}>{result.PRICE}</Text>
          </Text>
          <Text style={styles.text}>
            El más alto del día:{' '}
            <Text style={styles.span}> {result.HIGHDAY}</Text>
          </Text>
          <Text style={styles.text}>
            El más BAJO del día:{' '}
            <Text style={styles.span}> {result.LOWDAY}</Text>
          </Text>
          <Text style={styles.text}>
            Variación últimas 24 horas:{' '}
            <Text style={styles.span}> {result.CHANGEPCT24HOUR} %</Text>
          </Text>
          <Text style={styles.text}>
            Ultimas actualización:{' '}
            <Text style={styles.span}> {result.LASTUPDATE}</Text>
          </Text>
        </View>
      : null}
    </View>
  );
};

const styles = StyleSheet.create({
  result: {
    backgroundColor: '#5E49E2',
    padding: 20,
  },
  text: {
    color: '#FFF',
    fontFamily: 'Lato-Regular',
    fontSize: 18,
    marginTop: 10,
  },
  price: {
    fontSize: 38,
  },
  span: {
    color: '#FFF',
    fontFamily: 'Lato-Black',
  },
});
