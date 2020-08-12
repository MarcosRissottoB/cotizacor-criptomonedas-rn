import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableHighlight, Alert} from 'react-native';
import {Picker} from '@react-native-community/picker';
import axios from 'axios';

export const Form = ({
  currency,
  cryptoCurrency,
  setCryptoCurrency,
  setCurrency,
  setConsultApi,
}) => {
  const [cryptoCurrencies, setCryptoCurrencies] = useState([]);

  const getCurrency = currency => {
    setCurrency(currency);
  };

  const getCrypto = crypto => {
    setCryptoCurrency(crypto);
  };

  useEffect(() => {
    const getInfoApi = async () => {
      const url =
      'https://min-api.cryptocompare.com/data/top/totalvolfull?limit=10&tsym=USD';
      const result = await axios.get(url);
      setCryptoCurrencies(result.data.Data);
    };
    getInfoApi();
  }, []);

  const quotePrice = () => {
    if (currency.trim() === '' || cryptoCurrency.trim() === '') {
      showAlert();
      return;
    }
    setConsultApi(true);
  };

  const showAlert = () => {
    Alert.alert('Error...', 'Ambos campos son obligatorios', [{text: 'OK'}]);
  };

  return (
    <View>
      <Text style={styles.label}>Moneda</Text>
      <Picker
        selectedValue={currency}
        onValueChange={currency => getCurrency(currency)}
        itemStyle={{height: 120}}>
        <Picker.Item label=" - Seleccione -" value="" />
        <Picker.Item label=" Dólar - Estados Unidos" value="USD" />
        <Picker.Item label="Peso - México" value="MXN" />
        <Picker.Item label="Euro" value="EUR" />
        <Picker.Item label="Libra esterlina" value="GBP" />
      </Picker>
      <Text style={styles.label}>Cryptomoneda</Text>
      <Picker
        selectedValue={cryptoCurrency}
        onValueChange={crypto => getCrypto(crypto)}
        itemStyle={{height: 120}}>
        <Picker.Item label=" - Seleccione -" value="" />
        {cryptoCurrencies.map(({CoinInfo}) => (
          <Picker.Item
            key={CoinInfo.Id}
            label={CoinInfo.FullName}
            value={CoinInfo.Name}
          />
        ))}
      </Picker>
      <TouchableHighlight
        style={styles.btnCotizar}
        onPress={() => quotePrice()}>
        <Text style={styles.textCotizar}>Cotizar</Text>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontFamily: 'Lato-Black',
    fontSize: 22,
    marginVertical: 20,
    textTransform: 'uppercase',
  },
  btnCotizar: {
    backgroundColor: '#5E49E2',
    padding: 10,
    marginTop: 20,
  },
  textCotizar: {
    color: '#FFF',
    fontSize: 18,
    fontFamily: 'Lato-Black',
    textTransform: 'uppercase',
    textAlign: 'center',
  },
});
