import React, { useState } from "react";
import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import { useLibros } from "../../../../hooks/useLibros";
import TarjetaLibro from "../../../../components/TarjetaLibro";
import FiltrosCatalogo from "../../../../components/FiltrosCatalogo";

const Catalogo = () => {
    const [filtros, setFiltros] = useState({});
    const { libros, loading, error } = useLibros(filtros);

    // Mismo título que en la web según el filtro activo
    const titulo =
        filtros.categoria ||
        (filtros.anio && `Publicados en ${filtros.anio}`) ||
        (filtros.tipo && (filtros.tipo === "revista" ? "Revistas" : "Libros")) ||
        "Todo el catálogo";

    return (
        <ScrollView className="flex-1 bg-fondo">
            {/* Bloque de cabecera (en Next: componente PageHeader) */}
            <View className="bg-superficie border-b border-borde px-4 py-8">
                <Text className="font-body text-sm text-oro mb-2">Librería universitaria</Text>
                <Text className="font-display text-4xl text-crema">Catálogo</Text>
                <Text className="font-body text-apagado mt-3">
                    Filtra por categoría, año o tipo de publicación.
                </Text>
            </View>

            <View className="px-4 pt-6 pb-6">
                <FiltrosCatalogo filtros={filtros} alCambiar={setFiltros} />

                <View className="flex-row justify-between items-baseline mb-4">
                    <Text className="font-display text-2xl text-crema">{titulo}</Text>
                    <Text className="font-body text-sm text-apagado">
                        {libros.length} {libros.length === 1 ? "título" : "títulos"}
                    </Text>
                </View>

                {loading ? (
                    <ActivityIndicator size="large" color="#c9a84c" className="mt-10" />
                ) : error ? (
                    <Text className="font-body text-ocupado text-center">⚠ {error}</Text>
                ) : libros.length === 0 ? (
                    <Text className="font-body text-apagado text-center mt-6">No hay títulos con este filtro.</Text>
                ) : (
                    // Rejilla de 2 columnas (en la web: grid grid-cols-2)
                    <View className="flex-row flex-wrap -mx-2">
                        {libros.map((libro) => (
                            <TarjetaLibro key={libro.id} libro={libro} />
                        ))}
                    </View>
                )}
            </View>
        </ScrollView>
    );
};

export default Catalogo;