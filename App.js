import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View, StyleSheet } from 'react-native';

const App = () => {
  const [carregando, setCarregando] = useState(true);
  const [personagens, setPersonagens] = useState([]);

  const buscarPersonagens = async () => {
    try {
      const resposta = await fetch('https://swapi.dev/api/people/');
      const dados = await resposta.json();
      setPersonagens(dados.results);
    } catch (erro) {
      console.error('Erro ao buscar personagens:', erro);
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    buscarPersonagens();
  }, []);

  return (
    <View style={estilos.container}>
      {carregando ? (
        <ActivityIndicator size="large" color="green" />
      ) : (
        <FlatList
          data={personagens}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <View style={estilos.containerPersonagem}>
              <Text style={estilos.nomePersonagem}>{item.name}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: 'black'
  },
  containerPersonagem: {
    padding: 16,
    marginVertical: 8,
    backgroundColor: 'green',
    borderRadius: 8,
  },
  nomePersonagem: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default App;
