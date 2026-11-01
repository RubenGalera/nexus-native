import React from "react";
import { Drawer } from "expo-router/drawer";
import MenuPerfil from "../../components/MenuPerfil";

const DrawerLayout = () => {
    return (
        <Drawer //hemos añadido el drawer para el perfil. Y ya de paso la información asociada: mis datos, mis libros y cerrar sesión.
            drawerContent={MenuPerfil}
            screenOptions={{
                headerShown: false,
                drawerPosition: "right",                    // se abre desde la derecha, junto al icono de perfil
                overlayColor: "rgba(0,0,0,0.6)",
                drawerStyle: { backgroundColor: "#1a1814" }, // superficie
            }}
        />
    );
};

export default DrawerLayout;