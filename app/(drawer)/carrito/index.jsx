import React from "react";
import { View, Text, Pressable, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useCarrito } from "../../../context/CarritoContext";

const Carrito = () => {
    const router = useRouter();
    const { carrito, quitarDelCarrito } = useCarrito();

    // Suma de los precios (igual que en el CheckoutForm de Next)
    const total = carrito.reduce((suma, l) => suma + (parseFloat(l.precio) || 0), 0).toFixed(2);

    return (
        <SafeAreaView className="flex-1 bg-fondo">
            <View className="flex-1 px-6 pt-6">
                <Text className="font-display text-4xl text-oro mb-6">Tu carrito</Text>

                {carrito.length === 0 ? (
                    // Carrito vacío (en Next: componente EstadoVacio)
                    <View>
                        <Text className="font-body text-crema mb-8">
                            Tu carrito está vacío. Añade títulos desde su ficha del catálogo.
                        </Text>
                        <Pressable
                            onPress={() => router.push("/catalogo")}
                            className="rounded py-4 bg-oro active:bg-oro-claro"
                        >
                            <Text className="font-body-semibold text-fondo text-center">Explorar el catálogo</Text>
                        </Pressable>
                    </View>
                ) : (
                    // Carrito con libros (en Next: el <aside> "Tu pedido")
                    <View className="flex-1">
                        <FlatList
                            data={carrito}
                            keyExtractor={(libro) => String(libro.id)}
                            renderItem={({ item }) => (
                                <View className="flex-row justify-between items-start py-3 border-b border-borde">
                                    <View className="flex-1 pr-4">
                                        <Text className="font-body text-crema">{item.titulo}</Text>
                                        <Pressable onPress={() => quitarDelCarrito(item.id)}>
                                            <Text className="font-body text-xs text-apagado mt-1">Quitar</Text>
                                        </Pressable>
                                    </View>
                                    <Text className="font-body text-crema">
                                        {item.precio ? `${item.precio} €` : "—"}
                                    </Text>
                                </View>
                            )}
                        />
                        <View className="flex-row justify-between border-t border-borde pt-4 mb-6">
                            <Text className="font-body-semibold text-crema">Total</Text>
                            <Text className="font-body-semibold text-crema">{total} €</Text>
                        </View>
                        <Pressable
                            onPress={() => router.push("/compra")}
                            className="rounded py-4 bg-oro active:bg-oro-claro"
                        >
                            <Text className="font-body-semibold text-fondo text-center">Finalizar compra</Text>
                        </Pressable>
                    </View>
                )}

                <Pressable onPress={() => router.back()} className="py-4 mt-2 active:opacity-70">
                    <Text className="font-body text-oro text-center">← Volver</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
};

export default Carrito;