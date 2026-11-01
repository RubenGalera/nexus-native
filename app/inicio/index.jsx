import React from 'react'; //Ya no es necesario importar React en las versiones más recientes de React Native, pero se mantiene para compatibilidad con versiones anteriores.
import { Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

const Inicio = () => {
  return (
    <View className="flex-1 items-center justify-center bg-fondo">
      <Text className="font-display text-4xl text-oro">Nexus</Text>
      <Text className="font-body text-base text-crema mt-2">Librería universitaria y coworking</Text>
      <StatusBar style="light" />
    </View>
  );
}

export default Inicio;