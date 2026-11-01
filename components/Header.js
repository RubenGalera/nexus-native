/*
 * Cabecera común de la app (equivale al Navbar de la web).
 * En la web el header se pone una vez en el layout raíz; en React Native
 * la cabecera pertenece a cada Stack, y cada pestaña tiene el suyo
 * para conservar su historial. Por eso este archivo se importa en los 3 _layout.
 * No sustituimos la cabecera entera: usamos los huecos headerLeft/headerRight
 * para conservar la flecha de volver automática del Stack en el detalle [id].
 */

import React from "react";
import { View, Text, Pressable } from "react-native";
import { useNavigation, useRouter } from "expo-router";
import { DrawerActions } from "expo-router/react-navigation";
import { Ionicons } from "@expo/vector-icons";

// Izquierda: logo (mismo estilo que el login)
export const Logo = () => (
    <Text className="font-display text-2xl text-crema">
        NEX<Text className="text-oro">U</Text>S
    </Text>
);

// Derecha: carrito + perfil
const Acciones = () => {
    const navigation = useNavigation();
    const router = useRouter();

    return (
        <View className="flex-row items-center gap-4">
            <Pressable onPress={() => router.push("/carrito")} className="active:opacity-70">
                <Ionicons name="cart-outline" size={26} color="#c9a84c" />
            </Pressable>
            {/* Para abrir el Drawer de perfil. Arrastrar compite con el gesto atrás de Android */}
            <Pressable
                onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
                className="active:opacity-70"
            >
                <Ionicons name="person-circle-outline" size={28} color="#c9a84c" />
            </Pressable>
        </View>
    );
};

// Opciones comunes de la cabecera de los 3 Stacks
const header = {
    headerShown: true,
    headerStyle: { backgroundColor: "#0f0e0b" },          // fondo
    headerTintColor: "#f0ead6",                           // crema
    headerTitleStyle: { fontFamily: "CormorantGaramond-SemiBold" },
    headerBackTitle: "Atrás",
    headerRight: () => <Acciones />,
};

export default header;