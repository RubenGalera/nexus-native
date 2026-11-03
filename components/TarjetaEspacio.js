import React from "react";
import { View, Text, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { getEstado, getPrecio } from "../lib/espacios";

// ancho: "w-full" (salas, 1 por fila) o "w-1/2" (mesas, 2 por fila), como en la web
const TarjetaEspacio = ({ espacio, ancho }) => {
    const router = useRouter();
    const ocupado = getEstado(espacio) === "ocupado";

    return (
        <View className={`${ancho} px-2 mb-4`}>
            <Pressable
                onPress={() => router.push(`/coworking/${espacio.id}`)}
                className={`rounded-lg border p-4 min-h-32 justify-between ${
                    ocupado ? "border-ocupado/50 bg-ocupado/10 active:border-ocupado" : "border-libre/50 bg-libre/10 active:border-libre"
                }`}
            >
                <View>
                    <Text className="font-display text-xl text-crema">{espacio.nombre}</Text>
                    <Text className={`font-body text-sm mt-1 ${ocupado ? "text-ocupado" : "text-libre"}`}>
                        {ocupado ? "Ocupado" : "Libre"}
                    </Text>
                </View>
                <View className="flex-row justify-between mt-3">
                    <Text className="font-body text-xs text-apagado">{espacio.capacidad} personas</Text>
                    <Text className="font-body text-xs text-apagado">{getPrecio(espacio.capacidad)}</Text>
                </View>
            </Pressable>
        </View>
    );
};

export default TarjetaEspacio;