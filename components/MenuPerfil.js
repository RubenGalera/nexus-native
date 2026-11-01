import React from "react";
import { View, Text } from "react-native";
import { DrawerContentScrollView, DrawerItem } from "expo-router/drawer";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../context/AuthContext";

const MenuPerfil = () => {
    const router = useRouter();
    const { user, logout } = useAuth();

    const cerrarSesion = () => {
        logout();
        // replace: vuelve al login sin dejar historial
        router.replace("/login");
    };

    return (
        <DrawerContentScrollView scrollEnabled={true}>
            {/* Cabecera con el usuario */}
            <View className="items-center py-8 mb-4 border-b border-borde">
                <Ionicons name="person-circle-outline" size={64} color="#c9a84c" />
                <Text className="font-display text-2xl text-crema mt-2">
                    {user ? user.nombre : "Usuario"}
                </Text>
            </View>

            <DrawerItem
                label="Mis libros"
                labelStyle={{ fontFamily: "PlusJakartaSans-Regular", color: "#f0ead6" }}
                icon={({ size }) => <Ionicons name="library-outline" size={size} color="#c9a84c" />}
                onPress={() => router.push("/mis-libros")}
            />
            <DrawerItem
                label="Mis datos"
                labelStyle={{ fontFamily: "PlusJakartaSans-Regular", color: "#f0ead6" }}
                icon={({ size }) => <Ionicons name="settings-outline" size={size} color="#c9a84c" />}
                onPress={() => router.push("/mis-datos")}
            />

            <View className="border-t border-borde mt-4 pt-4">
                <DrawerItem
                    label="Cerrar sesión"
                    labelStyle={{ fontFamily: "PlusJakartaSans-Regular", color: "#d06a5a" }}
                    icon={({ size }) => <Ionicons name="log-out-outline" size={size} color="#d06a5a" />}
                    onPress={cerrarSesion}
                />
            </View>
        </DrawerContentScrollView>
    );
};

export default MenuPerfil;