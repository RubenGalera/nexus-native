import React from "react";
import { Stack } from "expo-router";
import header, { Logo } from "../../../../components/Header";

const CoworkingLayout = () => {
    return (
        <Stack screenOptions={header}>
            <Stack.Screen name="index" options={{ title: "", headerLeft: () => <Logo /> }} />
        </Stack>
    );
};

export default CoworkingLayout;