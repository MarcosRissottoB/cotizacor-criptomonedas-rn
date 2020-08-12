import React, {useState, useEffect} from 'react';
import {
  Text,
  StyleSheet,
  Image,
  View,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';

// Components
import {Header} from './components/Header';
import {Form} from './components/Form';
import {Quotation} from './components/Quotation';

const App = () => {
  const [currency, setCurrency] = useState('');
  const [cryptoCurrency, setCryptoCurrency] = useState('');
  const [consultApi, setConsultApi] = useState(false);
  const [result, setResult] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const quoteCryptoCurrency = async () => {
      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cryptoCurrency}&tsyms=${currency}`;
      const result = await axios.get(url);

      setTimeout(() => {
        setResult(result.data.DISPLAY[cryptoCurrency][currency]);
        setConsultApi(false);
        setIsLoading(false);
      }, 3000);
    };

    if (consultApi) {
      setIsLoading(true);
      quoteCryptoCurrency();
    }
  }, [consultApi]);

  const component = isLoading ?
    <ActivityIndicator size="large" color="#5349E2" />
    : <Quotation result={result} />;

  return (
    <>
      <ScrollView>
        <Header />
        <Image
          style={styles.image}
          source={require('./assets/img/cryptomonedas.png')}
        />
        <View style={styles.container}>
          <Form
            currency={currency}
            cryptoCurrency={cryptoCurrency}
            setCurrency={setCurrency}
            setCryptoCurrency={setCryptoCurrency}
            setConsultApi={setConsultApi}
          />
        </View>
        <View style={{marginTop: 20}}>{component}</View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 150,
    marginHorizontal: '2.5%',
  },
  container: {
    marginHorizontal: '2.5%',
  },
});

export default App;
