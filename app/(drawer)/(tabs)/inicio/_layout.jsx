import React from "react";
import { Stack } from "expo-router";
import header, { Logo } from "../../../../components/Header";

const InicioLayout = () => {
    return (
        <Stack screenOptions={header}>
            <Stack.Screen name="index" options={{ title: "", headerLeft: () => <Logo /> }} />
        </Stack>
    );
};

export default InicioLayout;