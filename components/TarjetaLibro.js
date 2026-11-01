import React from "react";
import { View, Text, Pressable, Image } from "react-native";
import { useRouter } from "expo-router";
import portadas from "../lib/portadas";

const TarjetaLibro = ({ libro }) => {
    const router = useRouter();

    return (
        <Pressable
            onPress={() => router.push(`/catalogo/${libro.id}`)}
            className="flex-row bg-superficie border border-borde rounded-lg p-3 mb-4 active:border-oro"
        >
            {/* Next: <Image fill /> en un hueco 3:4 → RN: ancho y alto fijos */}
            <Image
                source={portadas[libro.id]}
                style={{ width: 90, height: 120, borderRadius: 6 }}
                resizeMode="cover"
            />
            <View className="flex-1 ml-4">
                <Text className="font-body text-xs text-oro">{libro.categoria || "General"}</Text>
                <Text className="font-display text-xl text-crema mt-1" numberOfLines={2}>
                    {libro.titulo || "Sin título"}
                </Text>
                <Text className="font-body text-sm text-apagado mt-1" numberOfLines={1}>
                    {libro.autor || "Autor desconocido"}
                </Text>
                <Text className="font-body-semibold text-crema mt-auto">
                    {libro.precio ? `${libro.precio} €` : "Consultar precio"}
                </Text>
            </View>
        </Pressable>
    );
};

export default TarjetaLibro;