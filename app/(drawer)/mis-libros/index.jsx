import React from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useCarrito } from "../../../context/CarritoContext";
import TarjetaLibro from "../../../components/TarjetaLibro";

const MisLibros = () => {
    const router = useRouter();
    const { librosComprados } = useCarrito();

    return (
        <SafeAreaView className="flex-1 bg-fondo">
            <ScrollView>
                {/* Bloque de cabecera (en Next: PageHeader) */}
                <View className="bg-superficie border-b border-borde px-4 py-8">
                    <Text className="font-body text-sm text-oro mb-2">Mi cuenta</Text>
                    <Text className="font-display text-4xl text-crema">Mis libros</Text>
                    <Text className="font-body text-apagado mt-3">Todos los títulos que has comprado en Nexus.</Text>
                </View>

                <View className="px-4 pt-6 pb-6">
                    {librosComprados.length === 0 ? (
                        // Sin compras (en Next: EstadoVacio)
                        <View>
                            <Text className="font-display text-2xl text-crema mb-2">Todavía no has comprado ningún libro</Text>
                            <Text className="font-body text-apagado mb-8">Los títulos que compres aparecerán aquí.</Text>
                            <Pressable onPress={() => router.push("/catalogo")} className="rounded py-4 bg-oro active:bg-oro-claro">
                                <Text className="font-body-semibold text-fondo text-center">Explorar el catálogo</Text>
                            </Pressable>
                        </View>
                    ) : (
                        <View>
                            <Text className="font-body text-sm text-apagado mb-6">
                                {librosComprados.length} {librosComprados.length === 1 ? "título comprado" : "títulos comprados"}
                            </Text>
                            {/* Misma rejilla de 2 columnas que el catálogo */}
                            <View className="flex-row flex-wrap -mx-2">
                                {librosComprados.map((libro) => (
                                    <TarjetaLibro key={libro.id} libro={libro} />
                                ))}
                            </View>
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

export default MisLibros;