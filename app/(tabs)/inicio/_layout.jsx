import { Stack } from "expo-router";

const InicioLayout = () => {
    return (
        <Stack
            screenOptions={{
                headerShown: true,
                headerStyle: { backgroundColor: "#0f0e0b" }, // fondo
                headerTintColor: "#f0ead6",                  // crema
                headerTitleStyle: { fontFamily: "CormorantGaramond-SemiBold" },
                headerBackTitle: "Atrás",
            }}
        >
            <Stack.Screen name="index" options={{ title: "Inicio" }} />
        </Stack>
    );
};

export default InicioLayout;