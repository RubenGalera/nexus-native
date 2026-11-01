import React from "react";
import { View, Text, FlatList, ActivityIndicator } from "react-native";
import { useLibros } from "../../../../hooks/useLibros";
import TarjetaLibro from "../../../../components/TarjetaLibro";

const Catalogo = () => {
    const { libros, loading, error } = useLibros();

    // Mientras llega la respuesta de la API (como en el Tema 6)
    if (loading) {
        return (
            <View className="flex-1 bg-fondo items-center justify-center">
                <ActivityIndicator size="large" color="#c9a84c" />
            </View>
        );
    }

    if (error) {
        return (
            <View className="flex-1 bg-fondo items-center justify-center px-6">
                <Text className="font-body text-ocupado text-center">⚠ {error}</Text>
            </View>
        );
    }

    return (
        <View className="flex-1 bg-fondo px-4 pt-4">
            <View className="flex-row justify-between items-baseline mb-4">
                <Text className="font-display text-3xl text-crema">Todo el catálogo</Text>
                <Text className="font-body text-sm text-apagado">{libros.length} títulos</Text>
            </View>
            <FlatList
                data={libros}
                keyExtractor={(libro) => String(libro.id)}
                renderItem={({ item }) => <TarjetaLibro libro={item} />}
            />
        </View>
    );
};

export default Catalogo;