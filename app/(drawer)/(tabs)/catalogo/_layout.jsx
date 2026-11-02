import React from "react";
import { Stack } from "expo-router";
import header, { Logo } from "../../../../components/Header";

// Si se llega al detalle desde otra pestaña (Inicio, Mis libros),
// el listado (index) queda debajo para que exista la flecha de volver
export const unstable_settings = {
    anchor: "index",
};

const CatalogoLayout = () => {
    return (
        <Stack screenOptions={header}>
            <Stack.Screen name="index" options={{ title: "", headerLeft: () => <Logo /> }} />
            <Stack.Screen name="[id]/index" options={{ title: "Detalle" }} />
        </Stack>
    );
};

export default CatalogoLayout;