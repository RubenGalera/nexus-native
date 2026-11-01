import React from "react";
import { View, Text, ScrollView, Pressable, Image, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { useLibros } from "../../../../hooks/useLibros";
import TarjetaLibro from "../../../../components/TarjetaLibro";

// Mismos servicios que en la web de Next (imagen con require: ruta fija)
const SERVICIOS = [
    {
        titulo: "Librería universitaria",
        texto: "Libros de texto, revistas académicas y recursos de derecho, ciencias, humanidades y tecnología.",
        imagen: require("../../../../assets/img/libreria-nexus-horizontal.jpg"),
        ruta: "/catalogo",
        accion: "Ver el catálogo",
    },
    {
        titulo: "Coworking y salas",
        texto: "Mesas individuales y salas de reuniones con wifi, proyector y pizarra. Reserva por horas.",
        imagen: require("../../../../assets/img/coworking-nexus-horizontal.jpg"),
        ruta: "/coworking",
        accion: "Reservar un espacio",
    },
];

const Inicio = () => {
    const router = useRouter();
    const { libros, loading, error } = useLibros();

    // Los 10 más vendidos (igual que en la web: ordenados por ventas)
    const top = [...libros].sort((a, b) => (b.ventas ?? 0) - (a.ventas ?? 0)).slice(0, 10);

    return (
        <ScrollView className="flex-1 bg-fondo">
            {/* 1 · Portada */}
            <View className="border-b border-borde px-4 py-12">
                <Text className="font-display text-5xl text-crema">Donde el conocimiento cobra vida.</Text>
                <Text className="font-body text-lg text-apagado mt-6">
                    Librería universitaria, coworking y cafetería junto al campus. Todo lo que necesitas para estudiar, crear y conectar.
                </Text>
                <Pressable onPress={() => router.push("/catalogo")} className="rounded py-4 bg-oro active:bg-oro-claro mt-10">
                    <Text className="font-body-semibold text-fondo text-center">Explorar el catálogo</Text>
                </Pressable>
                <Pressable onPress={() => router.push("/coworking")} className="rounded border border-oro py-4 active:bg-superficie-2 mt-4">
                    <Text className="font-body-semibold text-oro text-center">Reservar un espacio</Text>
                </Pressable>
            </View>

            {/* 2 · Los 10 más vendidos */}
            <View className="px-4 py-12">
                <Text className="font-display text-4xl text-crema">Los 10 más vendidos</Text>
                <Text className="font-body text-apagado mt-2 mb-8">Los títulos más comprados en las últimas semanas.</Text>

                {loading ? (
                    <ActivityIndicator size="large" color="#c9a84c" />
                ) : error ? (
                    <Text className="font-body text-ocupado text-center">⚠ No se han podido cargar los libros.</Text>
                ) : (
                    <View className="flex-row flex-wrap -mx-2">
                        {top.map((libro) => (
                            <TarjetaLibro key={libro.id} libro={libro} />
                        ))}
                    </View>
                )}

                <Pressable onPress={() => router.push("/catalogo")} className="mt-4 active:opacity-70">
                    <Text className="font-body-semibold text-oro">Ver el catálogo completo →</Text>
                </Pressable>
            </View>

            {/* 3 · Servicios */}
            <View className="border-t border-borde bg-superficie px-4 py-12">
                {SERVICIOS.map((s) => (
                    <View key={s.ruta} className="rounded-lg border border-borde bg-fondo overflow-hidden mb-8">
                        {/* Next: aspect-[16/9] */}
                        <Image source={s.imagen} style={{ width: "100%", height: undefined, aspectRatio: 16 / 9 }} resizeMode="cover" />
                        <View className="p-6">
                            <Text className="font-display text-2xl text-crema">{s.titulo}</Text>
                            <Text className="font-body text-apagado mt-3">{s.texto}</Text>
                            <Pressable onPress={() => router.push(s.ruta)} className="rounded border border-oro py-3 active:bg-superficie-2 mt-6">
                                <Text className="font-body-semibold text-oro text-center">{s.accion}</Text>
                            </Pressable>
                        </View>
                    </View>
                ))}
            </View>
        </ScrollView>
    );
};

export default Inicio;