import { View, Text, TextInput, Pressable } from "react-native";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function LoginForm({ onLoginSuccess }) {
    const [usuario, setUsuario] = useState("");
    const [contrasena, setContrasena] = useState("");

    const { login, loginError, loginLoading } = useAuth();

    const handleLogin = async () => {
        const result = await login(usuario, contrasena);
        if (result.success && onLoginSuccess) onLoginSuccess();
    };

    const deshabilitado = loginLoading || !usuario || !contrasena;

    return (
        <View className="w-full px-8">
            <Text className="font-display text-4xl text-crema mb-2">Bienvenido</Text>
            <Text className="font-body text-apagado mb-8">
                Introduce tus credenciales para acceder a la librería y al coworking.
            </Text>

            <View className="mb-4">
                <Text className="font-body text-crema mb-2">Usuario</Text>
                <TextInput
                    className="font-body rounded border border-borde bg-superficie-2 px-4 py-3 text-crema"
                    placeholder="admin"
                    placeholderTextColor="#8a8070"
                    value={usuario}
                    onChangeText={setUsuario}
                    autoCapitalize="none"
                />
            </View>

            <View className="mb-6">
                <Text className="font-body text-crema mb-2">Contraseña</Text>
                <TextInput
                    className="font-body rounded border border-borde bg-superficie-2 px-4 py-3 text-crema"
                    placeholder="••••••••"
                    placeholderTextColor="#8a8070"
                    value={contrasena}
                    onChangeText={setContrasena}
                    secureTextEntry
                />
            </View>

            {loginError && (
                <Text className="font-body text-ocupado mb-4">⚠ {loginError}</Text>
            )}

            <Text className="font-body text-apagado text-sm mb-6">
                Credenciales de demo: admin / admin69
            </Text>

            <Pressable
                onPress={handleLogin}
                disabled={deshabilitado}
                className={`rounded py-4 bg-oro active:bg-oro-claro ${deshabilitado ? "opacity-40" : ""}`}
            >
                <Text className="font-body-semibold text-fondo text-center">
                    {loginLoading ? "Verificando..." : "Entrar →"}
                </Text>
            </Pressable>
        </View>
    );
}