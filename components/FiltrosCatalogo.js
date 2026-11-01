import React, { useState } from "react";
import { View, Text, Pressable } from "react-native";

// Mismas opciones que en la web de Next
const CATEGORIAS = ["Fantasia", "Aprender", "Thriller", "Entretenimiento"].map((c) => ({ valor: c, texto: c }));
const ANIOS = ["2024", "2023", "2022", "2021"].map((a) => ({ valor: a, texto: a }));
const TIPOS = [{ valor: "libro", texto: "Libros" }, { valor: "revista", texto: "Revistas" }];

// Un grupo de opciones (Categorías, Año, Tipo)
const GrupoFiltro = ({ titulo, clave, opciones, filtros, alElegir }) => {
    const activo = filtros[clave];

    return (
        <View className="mb-6">
            <Text className="font-display text-lg text-crema mb-2">{titulo}</Text>
            <Pressable onPress={() => alElegir({})} className="rounded px-3 py-2">
                <Text className={`font-body text-sm ${!activo ? "text-oro" : "text-apagado"}`}>Todos</Text>
            </Pressable>
            {opciones.map(({ valor, texto }) => (
                <Pressable
                    key={valor}
                    onPress={() => alElegir({ [clave]: valor })}
                    className={`rounded px-3 py-2 ${activo === valor ? "bg-superficie-2" : ""}`}
                >
                    <Text className={`font-body text-sm ${activo === valor ? "text-oro" : "text-apagado"}`}>
                        {texto}
                    </Text>
                </Pressable>
            ))}
        </View>
    );
};

const FiltrosCatalogo = ({ filtros, alCambiar }) => {
    const [abierto, setAbierto] = useState(false);

    // Al elegir un filtro: lo aplicamos y plegamos el menú
    const elegir = (nuevo) => {
        alCambiar(nuevo);
        setAbierto(false);
    };

    return (
        <View className="mb-6">
            <Pressable
                onPress={() => setAbierto(!abierto)}
                className="rounded border border-oro py-3 active:bg-superficie-2"
            >
                <Text className="font-body-semibold text-oro text-center">
                    {abierto ? "Ocultar categorías y filtros" : "Mostrar categorías y filtros"}
                </Text>
            </Pressable>

            {abierto && (
                <View className="mt-6">
                    <GrupoFiltro titulo="Categorías" clave="categoria" opciones={CATEGORIAS} filtros={filtros} alElegir={elegir} />
                    <GrupoFiltro titulo="Año de publicación" clave="anio" opciones={ANIOS} filtros={filtros} alElegir={elegir} />
                    <GrupoFiltro titulo="Tipo" clave="tipo" opciones={TIPOS} filtros={filtros} alElegir={elegir} />
                </View>
            )}
        </View>
    );
};

export default FiltrosCatalogo;