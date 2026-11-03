import React from "react";
import { View, Text, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { useCarrito } from "../context/CarritoContext";
import * as Haptics from "expo-haptics";

const AccionesLibro = ({ libro }) => {
    const router = useRouter();
    const { anadirAlCarrito, enCarrito, estaComprado } = useCarrito();

    // Ya comprado
    if (estaComprado(libro.id)) {
        return (
            <View>
                <Text className="font-body text-libre mb-4">Ya tienes este título.</Text>
                <Pressable onPress={() => router.push("/mis-libros")} className="rounded border border-oro py-4 active:bg-superficie-2">
                    <Text className="font-body-semibold text-oro text-center">Ver mis libros</Text>
                </Pressable>
            </View>
        );
    }

    // Ya en el carrito
    if (enCarrito(libro.id)) {
        return (
            <View>
                <Text className="font-body text-crema mb-4">Está en tu carrito.</Text>
                {/* Next: /compra → aquí vamos primero al carrito */}
                <Pressable onPress={() => router.push("/carrito")} className="rounded py-4 bg-oro active:bg-oro-claro">
                    <Text className="font-body-semibold text-fondo text-center">Ver carrito</Text>
                </Pressable>
            </View>
        );
    }

    // Normal
    return (
        <Pressable
            onPress={() => {
                // Toque medio: algo "se añade" en la cesta
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                anadirAlCarrito(libro);
            }}
            className="rounded py-4 bg-oro active:bg-oro-claro"
        >
            <Text className="font-body-semibold text-fondo text-center">Añadir al carrito</Text>
        </Pressable>
    );
};

export default AccionesLibro;