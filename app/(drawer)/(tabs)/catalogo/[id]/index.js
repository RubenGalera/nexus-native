import React from "react";
import { View, Text, ScrollView, Image, ActivityIndicator } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useLibro } from "../../../../../hooks/useLibro";
import portadas from "../../../../../lib/portadas";
import AccionesLibro from "../../../../../components/AccionesLibro";

const DetalleLibro = () => {
    // Lee el id de la URL /catalogo/3 (como el ejemplo de clase idMovie)
    const { id } = useLocalSearchParams();
    const { libro, loading, error } = useLibro(id);

    if (loading) {
        return (
            <View className="flex-1 bg-fondo items-center justify-center">
                <ActivityIndicator size="large" color="#c9a84c" />
            </View>
        );
    }

    if (error || !libro) {
        return (
            <View className="flex-1 bg-fondo items-center justify-center px-6">
                <Text className="font-body text-ocupado text-center">⚠ No se ha encontrado el libro.</Text>
            </View>
        );
    }

    const anio = libro.anio || libro.anio_publicacion;
    const resumen = libro.descripcion || libro.sinopsis;

    return (
        <ScrollView className="flex-1 bg-fondo">
            <View className="px-4 py-6">
                {/* Portada (en Next: aspect-[3/4] con borde) */}
                <View className="rounded-lg border border-borde overflow-hidden mb-8">
                    <Image
                        source={portadas[libro.id]}
                        style={{ width: "100%", height: undefined, aspectRatio: 3 / 4 }}
                        resizeMode="cover"
                    />
                </View>

                <Text className="font-body text-sm text-oro">{libro.categoria || "General"}</Text>
                <Text className="font-display text-4xl text-crema mt-2">{libro.titulo}</Text>
                <Text className="font-body text-lg text-marron mt-2">{libro.autor}</Text>

                {/* Ficha (en Next: <dl> en 2 columnas) */}
                <View className="border-y border-borde py-6 mt-8">
                    {anio && (
                        <View className="flex-row mb-3">
                            <Text className="font-body text-sm text-apagado w-1/2">Año</Text>
                            <Text className="font-body text-sm text-crema">{anio}</Text>
                        </View>
                    )}
                    {libro.tipo && (
                        <View className="flex-row mb-3">
                            <Text className="font-body text-sm text-apagado w-1/2">Tipo</Text>
                            <Text className="font-body text-sm text-crema capitalize">{libro.tipo}</Text>
                        </View>
                    )}
                    <View className="flex-row">
                        <Text className="font-body text-sm text-apagado w-1/2">Disponibilidad</Text>
                        <Text className="font-body text-sm text-libre">En tienda</Text>
                    </View>
                </View>

                {resumen && (
                    <View className="mt-8">
                        <Text className="font-display text-2xl text-crema">Sinopsis</Text>
                        <Text className="font-body text-apagado mt-3 leading-6">{resumen}</Text>
                    </View>
                )}

                <Text className="font-display text-4xl text-crema mt-10 mb-6">
                    {libro.precio ? `${libro.precio} €` : "Consultar"}
                </Text>
                <AccionesLibro libro={libro} />
            </View>
        </ScrollView>
    );
};

export default DetalleLibro;