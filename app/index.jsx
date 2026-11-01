import React from "react";
import { Redirect } from "expo-router";

/**
 * Pantalla raíz: redirige al login.
 * Más adelante, si ya hay sesión, redirigirá a /inicio.
 */
const NexusApp = () => {
    return <Redirect href="/login" />;
};

export default NexusApp;