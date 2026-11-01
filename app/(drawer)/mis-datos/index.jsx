import React from "react";
import { View, Text, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

const MisDatos = () => {
    const router = useRouter();

    return (
        <SafeAreaView className="flex-1 bg-fondo">
            <View className="flex-1 px-6 pt-6">
                <Text className="font-display text-4xl text-oro mb-2">Mis datos</Text>
                <Text className="font-body-semibold text-apagado mb-6">En construcción</Text>
                <Text className="font-body text-crema mb-8">
                    Desde aquí podríamos consultar y editar los datos de perfil (si algún día se añade :P ).
                </Text>
                <Pressable
                    onPress={() => router.back()}
                    className="rounded py-4 bg-oro active:bg-oro-claro"
                >
                    <Text className="font-body-semibold text-fondo text-center">← Volver</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
};

export default MisDatos;