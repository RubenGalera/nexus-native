import React, { useState } from "react";
import { View, Text, ScrollView, Pressable, ActivityIndicator } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useEspacios } from "../../../../../hooks/useEspacios";
import { getEstado, getHorario } from "../../../../../lib/espacios";
import { reservarEspacio } from "../../../../../lib/api";
import * as Haptics from "expo-haptics";

// Mismos datos que el SpaceModal de Next
const MESES = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
const DIAS = ["L", "M", "X", "J", "V", "S", "D"];
const HORAS = ["09:00", "10:00", "11:00", "12:00", "13:00", "15:00", "16:00", "17:00", "18:00", "19:00"];

const FichaEspacio = () => {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const { espacios, loading } = useEspacios();

    const hoy = new Date();
    const [mes, setMes] = useState(hoy.getMonth());
    const [anio, setAnio] = useState(hoy.getFullYear());
    const [dia, setDia] = useState(null);
    const [hora, setHora] = useState(null);
    const [enviando, setEnviando] = useState(false);
    const [confirmada, setConfirmada] = useState(false);

    if (loading) {
        return (
            <View className="flex-1 bg-fondo items-center justify-center">
                <ActivityIndicator size="large" color="#c9a84c" />
            </View>
        );
    }

    // Como en la web: el espacio se busca en la lista por su id
    const espacio = espacios.find((e) => String(e.id) === String(id));
    if (!espacio) {
        return (
            <View className="flex-1 bg-fondo items-center justify-center px-6">
                <Text className="font-body text-ocupado text-center">⚠ No se ha encontrado el espacio.</Text>
            </View>
        );
    }

    const libre = getEstado(espacio) === "libre";

    const cambiarMes = (delta) => {
        const fecha = new Date(anio, mes + delta, 1);
        setMes(fecha.getMonth());
        setAnio(fecha.getFullYear());
        setDia(null);
        setHora(null);
    };

    const reservar = async () => {
        setEnviando(true);
        try {
            await reservarEspacio({ espacio_id: espacio.id, dia, mes: mes + 1, anio, hora });
        } catch (e) {
            // La API simulada puede no responder: la reserva se da por hecha (igual que en Next)
        }
        setEnviando(false);
        setConfirmada(true);
        // Háptica de éxito: misma sensación que al pagar (un patrón por significado, Nielsen H4)
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    };

    // Cálculos del calendario (igual que en Next)
    const desfase = (new Date(anio, mes, 1).getDay() + 6) % 7; // huecos antes del día 1 (semana empieza en lunes)
    const totalDias = new Date(anio, mes + 1, 0).getDate();   // días que tiene el mes
    const inicioHoy = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate());
    const esMesActual = anio === hoy.getFullYear() && mes === hoy.getMonth();

    return (
        <ScrollView className="flex-1 bg-fondo">
            <View className="px-4 py-6">
                <View className="rounded-lg border border-borde bg-superficie p-6">
                    <Text className="font-display text-3xl text-crema">{espacio.nombre}</Text>
                    {espacio.descripcion && (
                        <Text className="font-body text-sm text-apagado mt-2">{espacio.descripcion}</Text>
                    )}

                    {/* Ficha (en Next: <dl>) */}
                    <View className="mt-4">
                        <View className="flex-row mb-2">
                            <Text className="font-body text-sm text-apagado w-1/3">Estado</Text>
                            <Text className={`font-body text-sm ${libre ? "text-libre" : "text-ocupado"}`}>{libre ? "Libre" : "Ocupado"}</Text>
                        </View>
                        <View className="flex-row mb-2">
                            <Text className="font-body text-sm text-apagado w-1/3">Horario</Text>
                            <Text className="font-body text-sm text-crema">{getHorario(espacio)}</Text>
                        </View>
                        <View className="flex-row mb-2">
                            <Text className="font-body text-sm text-apagado w-1/3">Capacidad</Text>
                            <Text className="font-body text-sm text-crema">{espacio.capacidad} personas</Text>
                        </View>
                        {espacio.ocupado_por && (
                            <View className="flex-row mb-2">
                                <Text className="font-body text-sm text-apagado w-1/3">Reservado por</Text>
                                <Text className="font-body text-sm text-crema">{espacio.ocupado_por}</Text>
                            </View>
                        )}
                    </View>

                    {confirmada ? (
                        // Reserva confirmada
                        <View className="mt-6 rounded border border-libre/50 bg-libre/10 p-4">
                            <Text className="font-body-semibold text-libre">Reserva confirmada</Text>
                            <Text className="font-body text-sm text-crema mt-1">
                                {espacio.nombre}, {dia} de {MESES[mes]} de {anio} a las {hora}.
                            </Text>
                        </View>
                    ) : libre ? (
                        <View className="mt-6">
                            {/* Cambio de mes */}
                            <View className="flex-row items-center justify-between">
                                <Pressable onPress={() => cambiarMes(-1)} disabled={esMesActual} className={`p-2 ${esMesActual ? "opacity-30" : ""}`}>
                                    <Ionicons name="chevron-back" size={22} color="#f0ead6" />
                                </Pressable>
                                <Text className="font-display text-xl text-crema capitalize">{MESES[mes]} {anio}</Text>
                                <Pressable onPress={() => cambiarMes(1)} className="p-2">
                                    <Ionicons name="chevron-forward" size={22} color="#f0ead6" />
                                </Pressable>
                            </View>

                            {/* Calendario: 7 columnas (en Next: grid-cols-7) */}
                            <View className="flex-row flex-wrap mt-2">
                                {DIAS.map((d) => (
                                    <View key={d} style={{ width: "14.2857%" }} className="py-1">
                                        <Text className="font-body text-xs text-apagado text-center">{d}</Text>
                                    </View>
                                ))}
                                {Array.from({ length: desfase }, (_, i) => (
                                    <View key={`v${i}`} style={{ width: "14.2857%" }} />
                                ))}
                                {Array.from({ length: totalDias }, (_, i) => i + 1).map((d) => {
                                    const pasado = new Date(anio, mes, d) < inicioHoy;
                                    const elegido = dia === d;
                                    // selectionAsync: "tic" sutil de cambio de selección (como los selectores de fecha nativos).
                                    // Los días pasados y las horas ocupadas están disabled: no hay háptica porque no se pueden elegir.
                                    return (
                                        <View key={d} style={{ width: "14.2857%" }} className="p-0.5">
                                            <Pressable
                                                disabled={pasado}
                                                onPress={() => { Haptics.selectionAsync(); setDia(d); setHora(null); }}
                                                style={{ aspectRatio: 1 }}
                                                className={`rounded items-center justify-center ${elegido ? "bg-oro" : "active:bg-superficie-2"} ${pasado ? "opacity-25" : ""}`}
                                            >
                                                <Text className={`font-body text-sm ${elegido ? "text-fondo" : "text-crema"}`}>{d}</Text>
                                            </Pressable>
                                        </View>
                                    );
                                })}
                            </View>

                            {/* Horas: aparecen al elegir un día */}
                            {dia !== null && (
                                <View className="mt-6">
                                    <Text className="font-body text-sm text-apagado mb-2">Hora de inicio</Text>
                                    <View className="flex-row flex-wrap -mx-1">
                                        {HORAS.map((h, i) => {
                                            // Igual que en Next: simula que algunas horas ya están reservadas
                                            const ocupada = (dia * 7 + i * 3) % 10 < 3;
                                            const elegida = hora === h;
                                            return (
                                                <View key={h} className="w-1/5 px-1 mb-2">
                                                    <Pressable
                                                        disabled={ocupada}
                                                        onPress={() => { Haptics.selectionAsync(); setHora(h); }}
                                                        className={`rounded border py-2 ${elegida ? "border-oro bg-oro" : ocupada ? "border-transparent" : "border-borde active:border-oro"}`}
                                                    >
                                                        <Text className={`font-body text-xs text-center ${elegida ? "text-fondo" : ocupada ? "text-apagado line-through" : "text-crema"}`}>
                                                            {h}
                                                        </Text>
                                                    </Pressable>
                                                </View>
                                            );
                                        })}
                                    </View>
                                </View>
                            )}
                        </View>
                    ) : (
                        <Text className="font-body text-sm text-apagado mt-6">Este espacio no admite reservas hasta que se libere.</Text>
                    )}

                    {/* Botones */}
                    <View className="mt-8">
                        {libre && !confirmada && (
                            <Pressable
                                onPress={reservar}
                                disabled={!dia || !hora || enviando}
                                className={`rounded py-4 bg-oro active:bg-oro-claro mb-3 ${!dia || !hora || enviando ? "opacity-40" : ""}`}
                            >
                                <Text className="font-body-semibold text-fondo text-center">
                                    {enviando ? "Reservando…" : "Confirmar reserva"}
                                </Text>
                            </Pressable>
                        )}
                        <Pressable onPress={() => router.back()} className="rounded border border-oro py-4 active:bg-superficie-2">
                            <Text className="font-body-semibold text-oro text-center">{confirmada ? "Cerrar" : "Cancelar"}</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
};

export default FichaEspacio;