import "../global.css";
import { Slot, SplashScreen } from "expo-router";
import { useFonts } from "expo-font";
import React, { useEffect } from "react";
import { AuthProvider } from "../context/AuthContext";

// Ocultamos el SplashScreen hasta que las fuentes estén cargadas
SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
    // Cargamos las fuentes necesarias para la aplicación
    const [fontsLoaded, error] = useFonts({
        "CormorantGaramond-SemiBold": require("../assets/fonts/CormorantGaramond-SemiBold.ttf"),
        "PlusJakartaSans-Regular": require("../assets/fonts/PlusJakartaSans-Regular.ttf"),
        "PlusJakartaSans-SemiBold": require("../assets/fonts/PlusJakartaSans-SemiBold.ttf"),
    });
    // Ocultamos el SplashScreen cuando las fuentes estén cargadas
    useEffect(() => {
        if (error) throw error;

        if (fontsLoaded) SplashScreen.hideAsync();
    }, [fontsLoaded, error]);

    if (!fontsLoaded && !error) return null;
    return (
        <AuthProvider>
            <Slot />
        </AuthProvider>
    );
};

export default RootLayout;