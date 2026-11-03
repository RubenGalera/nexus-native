import React from "react";
import { Redirect } from "expo-router";
import { useAuth } from "../context/AuthContext";

/**
 * Pantalla raíz: con sesión va a Inicio y sin sesión al login
 * (como el ProtectedRoute de la web).
 */
const NexusApp = () => {
    const { isAuthenticated } = useAuth();

    return <Redirect href={isAuthenticated ? "/inicio" : "/login"} />;
};

export default NexusApp;