import React from "react";
import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import { useEspacios } from "../../../../hooks/useEspacios";
import { getEstado } from "../../../../lib/espacios";
import TarjetaEspacio from "../../../../components/TarjetaEspacio";

// Una zona del plano (en Next: componente Zona)
const Zona = ({ titulo, espacios, ancho }) => {
    if (espacios.length === 0) return null;

    return (
        <View className="rounded-lg border border-dashed border-borde p-5 mb-6">
            <Text className="font-display text-xl text-marron mb-4">{titulo}</Text>
            <View className="flex-row flex-wrap -mx-2">
                {espacios.map((e) => (
                    <TarjetaEspacio key={e.id} espacio={e} ancho={ancho} />
                ))}
            </View>
        </View>
    );
};

const Coworking = () => {
    const { espacios, loading, error } = useEspacios();

    // Igual que en la web: las salas llevan "sala" en el nombre; el resto son mesas
    const salas = espacios.filter((e) => e.nombre?.toLowerCase().includes("sala"));
    const mesas = espacios.filter((e) => !salas.includes(e));
    const libres = espacios.filter((e) => getEstado(e) === "libre").length;

    const fecha = new Date().toLocaleDateString("es-ES", { weekday: "long", day: "numeric", month: "long" });

    return (
        <ScrollView className="flex-1 bg-fondo">
            {/* Bloque de cabecera (en Next: PageHeader) */}
            <View className="bg-superficie border-b border-borde px-4 py-8">
                <Text className="font-body text-sm text-oro mb-2">Planta única</Text>
                <Text className="font-display text-4xl text-crema">Coworking</Text>
                <Text className="font-body text-apagado mt-3">
                    {loading
                        ? "Cargando disponibilidad..."
                        : `Disponibilidad de hoy, ${fecha}: ${libres} de ${espacios.length} espacios libres. Pulsa un espacio para ver su ficha y reservarlo.`}
                </Text>
            </View>

            <View className="px-4 pt-6 pb-6">
                {/* Leyenda */}
                <View className="flex-row mb-6">
                    <View className="flex-row items-center mr-6">
                        <View className="w-3 h-3 rounded-full bg-libre mr-2" />
                        <Text className="font-body text-sm text-crema">Libre</Text>
                    </View>
                    <View className="flex-row items-center">
                        <View className="w-3 h-3 rounded-full bg-ocupado mr-2" />
                        <Text className="font-body text-sm text-crema">Ocupado</Text>
                    </View>
                </View>

                {loading ? (
                    <ActivityIndicator size="large" color="#c9a84c" className="mt-10" />
                ) : error ? (
                    <Text className="font-body text-ocupado text-center">⚠ {error}</Text>
                ) : (
                    <View>
                        <Zona titulo="Salas de reuniones" espacios={salas} ancho="w-full" />
                        <Zona titulo="Mesas de trabajo" espacios={mesas} ancho="w-1/2" />
                        <View className="rounded-lg border border-borde p-4">
                            <Text className="font-body text-sm text-apagado text-center">Entrada principal y cafetería</Text>
                        </View>
                    </View>
                )}
            </View>
        </ScrollView>
    );
};

export default Coworking;