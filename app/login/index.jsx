import React from "react";
import { StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import LoginView from "../../views/LoginView";

/**
 * Ruta /login - Pantalla de inicio de sesión
 * Es la pantalla inicial antes de autenticarse
 */
export default function LoginScreen() {
    return (
        <SafeAreaView className="flex-1 bg-fondo">
            <StatusBar barStyle="light-content" />
            <LoginView />
        </SafeAreaView>
    );
}