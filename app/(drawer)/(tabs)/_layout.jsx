import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const TabsLayout = () => {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: "#1a1814", // superficie
                    borderTopColor: "#2e2b24",  // borde
                },
                tabBarActiveTintColor: "#c9a84c",   // oro
                tabBarInactiveTintColor: "#8a8070", // apagado
                tabBarLabelStyle: {
                    fontFamily: "PlusJakartaSans-Regular",
                },
            }}
        >
            <Tabs.Screen
                name="inicio"
                options={{
                    title: "Inicio",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="home" size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="catalogo"
                options={{
                    title: "Catálogo",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="book" size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="coworking"
                options={{
                    title: "Coworking",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="business" size={size} color={color} />
                    ),
                }}
            />
        </Tabs>
    );
};

export default TabsLayout;