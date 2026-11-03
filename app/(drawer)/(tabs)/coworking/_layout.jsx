import React from "react";
import { Stack } from "expo-router";
import header, { Logo } from "../../../../components/Header";

const CoworkingLayout = () => {
    return (
        <Stack screenOptions={header}>
            <Stack.Screen name="index" options={{ title: "", headerLeft: () => <Logo /> }} />
            <Stack.Screen name="[id]/index" options={{ title: "Reservar espacio" }} />
        </Stack>
    );
};

export default CoworkingLayout;