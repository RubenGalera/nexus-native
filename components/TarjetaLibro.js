import React from "react";
import { View, Text, Pressable, Image } from "react-native";
import { useRouter } from "expo-router";
import portadas from "../lib/portadas";

const TarjetaLibro = ({ libro }) => {
    const router = useRouter();

    return (
        // w-1/2: dos tarjetas por fila (en la web: grid-cols-2)
        <View className="w-1/2 px-2 mb-4">
            <Pressable
                onPress={() => router.push(`/catalogo/${libro.id}`)}
                className="bg-superficie border border-borde rounded-lg overflow-hidden active:border-oro"
            >
                {/* Next: aspect-[3/4] → RN: aspectRatio (height: undefined para que no use la altura original de la imagen) */}
                <Image
                    source={portadas[libro.id]}
                    style={{ width: "100%", height: undefined, aspectRatio: 3 / 4 }}
                    resizeMode="cover"
                />
                <View className="p-3">
                    <Text className="font-body text-xs text-oro">{libro.categoria || "General"}</Text>
                    <Text className="font-display text-lg text-crema mt-1" numberOfLines={2}>
                        {libro.titulo || "Sin título"}
                    </Text>
                    <Text className="font-body text-xs text-apagado mt-1" numberOfLines={1}>
                        {libro.autor || "Autor desconocido"}
                    </Text>
                    <Text className="font-body-semibold text-crema mt-3">
                        {libro.precio ? `${libro.precio} €` : "Consultar precio"}
                    </Text>
                </View>
            </Pressable>
        </View>
    );
};

export default TarjetaLibro;