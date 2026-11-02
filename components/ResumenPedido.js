import React from "react";
import { View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useCarrito } from "../context/CarritoContext";

// Resumen del pedido: se usa en el Carrito y en la Compra
const ResumenPedido = () => {
    const { carrito, quitarDelCarrito } = useCarrito();
    const total = carrito.reduce((suma, l) => suma + (parseFloat(l.precio) || 0), 0).toFixed(2);

    return (
        <View className="rounded-lg border border-borde bg-superficie p-6">
            <Text className="font-display text-2xl text-crema">Tu pedido</Text>

            {/* .map en vez de FlatList: este resumen irá dentro de un ScrollView,
                y una lista FlatList dentro de un ScrollView da un aviso en RN */}
            <View className="mt-4">
                {carrito.map((libro) => (
                    <View key={libro.id} className="flex-row justify-between items-start py-3 border-b border-borde">
                        <View className="flex-1 pr-4">
                            <Text className="font-body text-crema">{libro.titulo}</Text>
                            {/* Web: Quitamos el gris del hover ya que en movil no existe.
                                Añadimos icono de papelera y color de aviso para que se vea que se puede pulsar */}
                            <Pressable
                                onPress={() => quitarDelCarrito(libro.id)}
                                className="flex-row items-center mt-2 active:opacity-60"
                            >
                                <Ionicons name="trash-outline" size={16} color="#d06a5a" />
                                <Text className="font-body text-xs text-ocupado ml-1">Quitar</Text>
                            </Pressable>
                        </View>
                        <Text className="font-body text-crema">
                            {libro.precio ? `${libro.precio} €` : "—"}
                        </Text>
                    </View>
                ))}
            </View>

            <View className="flex-row justify-between pt-4">
                <Text className="font-body-semibold text-crema">Total</Text>
                <Text className="font-body-semibold text-crema">{total} €</Text>
            </View>
        </View>
    );
};

export default ResumenPedido;