import React from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useCarrito } from "../../../context/CarritoContext";
import ResumenPedido from "../../../components/ResumenPedido";

const Carrito = () => {
    const router = useRouter();
    const { carrito } = useCarrito();

    return (
        <SafeAreaView className="flex-1 bg-fondo">
            <ScrollView>
                <View className="px-6 pt-6 pb-6">
                    <Text className="font-display text-4xl text-oro mb-6">Tu carrito</Text>

                    {carrito.length === 0 ? (
                        // Carrito vacío (en Next: EstadoVacio)
                        <View>
                            <Text className="font-body text-crema mb-8">
                                Tu carrito está vacío. Añade títulos desde su ficha del catálogo.
                            </Text>
                            <Pressable onPress={() => router.push("/catalogo")} className="rounded py-4 bg-oro active:bg-oro-claro">
                                <Text className="font-body-semibold text-fondo text-center">Explorar el catálogo</Text>
                            </Pressable>
                        </View>
                    ) : (
                        <View>
                            <ResumenPedido />
                            <Pressable onPress={() => router.push("/compra")} className="rounded py-4 bg-oro active:bg-oro-claro mt-6">
                                <Text className="font-body-semibold text-fondo text-center">Finalizar compra</Text>
                            </Pressable>
                        </View>
                    )}

                    <Pressable onPress={() => router.back()} className="py-4 mt-2 active:opacity-70">
                        <Text className="font-body text-oro text-center">← Volver</Text>
                    </Pressable>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Carrito;