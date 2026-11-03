import React from "react";
import { View, Text, ScrollView, Pressable, KeyboardAvoidingView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import FormularioCompra from "../../../components/FormularioCompra";

const Compra = () => {
    const router = useRouter();

    return (
        <SafeAreaView className="flex-1 bg-fondo">
            {/* Igual que en el login: el teclado no tapa los campos */}
            <KeyboardAvoidingView className="flex-1" behavior={Platform.OS === "ios" ? "padding" : "height"}>
                <ScrollView keyboardShouldPersistTaps="handled">
                    {/* Bloque de cabecera (en Next: PageHeader) */}
                    <View className="bg-superficie border-b border-borde px-4 py-8">
                        <Text className="font-body text-sm text-oro mb-2">Librería</Text>
                        <Text className="font-display text-4xl text-crema">Finalizar compra</Text>
                        <Text className="font-body text-apagado mt-3">
                            Completa tus datos en tres pasos. No se necesita pasarela de pago.
                        </Text>
                    </View>

                    <View className="px-4 pt-6 pb-6">
                        <FormularioCompra />

                        <Pressable onPress={() => router.back()} className="py-4 mt-4 active:opacity-70">
                            <Text className="font-body text-oro text-center">← Volver al carrito</Text>
                        </Pressable>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default Compra;