import React from "react";
import { View, Text, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

const MisLibros = () => {
    const router = useRouter();

    return (
        <SafeAreaView className="flex-1 bg-fondo">
            <View className="flex-1 px-6 pt-6">
                <Text className="font-display text-4xl text-oro mb-4">Mis libros</Text>
                <Text className="font-body text-crema mb-8">
                    Aquí aparecerán los libros que hayas comprado.
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

export default MisLibros;