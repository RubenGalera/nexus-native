import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { useCarrito } from "../context/CarritoContext";
import ResumenPedido from "./ResumenPedido";
import * as Haptics from "expo-haptics";

// Mismos pasos, campos y validaciones que el CheckoutForm de Next
const PASOS = ["Datos personales", "Envío", "Pago"];
const VACIO = { nombre: "", apellidos: "", email: "", direccion: "", ciudad: "", cp: "", titular: "", tarjeta: "", caducidad: "", cvv: "" };

const VALIDACIONES = [
    (f) => ({ nombre: !f.nombre.trim(), apellidos: !f.apellidos.trim(), email: !f.email.includes("@") }),
    (f) => ({ direccion: !f.direccion.trim(), ciudad: !f.ciudad.trim(), cp: !/^\d{5}$/.test(f.cp) }),
    (f) => ({ titular: !f.titular.trim(), tarjeta: f.tarjeta.replace(/\s/g, "").length < 16, caducidad: !/^\d{2}\/\d{2}$/.test(f.caducidad), cvv: f.cvv.length < 3 }),
];

const MENSAJES = {
    email: "Escribe un correo válido.", cp: "El código postal tiene 5 cifras.",
    tarjeta: "El número tiene 16 cifras.", caducidad: "Usa el formato MM/AA.", cvv: "El CVV tiene 3 o 4 cifras.",
};

// Campos de cada paso: [id, etiqueta, props extra del TextInput]
// Next: type="email", inputMode="numeric"... → RN: keyboardType
const CAMPOS = [
    [["nombre", "Nombre", {}], ["apellidos", "Apellidos", {}], ["email", "Correo electrónico", { keyboardType: "email-address", autoCapitalize: "none" }]],
    [["direccion", "Dirección", {}], ["ciudad", "Ciudad", {}], ["cp", "Código postal", { keyboardType: "numeric", maxLength: 5 }]],
    [["titular", "Titular de la tarjeta", {}], ["tarjeta", "Número de tarjeta", { keyboardType: "numeric", maxLength: 19 }],
    ["caducidad", "Caducidad (MM/AA)", { maxLength: 5 }], ["cvv", "CVV", { keyboardType: "numeric", maxLength: 4, secureTextEntry: true }]],
];

// Un campo con su etiqueta y su mensaje de error (en Next: componente Campo)
const Campo = ({ id, etiqueta, valor, alCambiar, error, extra }) => (
    <View className="mb-5">
        <Text className="font-body text-sm text-marron mb-2">{etiqueta}</Text>
        <TextInput
            value={valor}
            onChangeText={alCambiar}
            placeholderTextColor="#8a8070"
            className={`font-body rounded border bg-superficie-2 px-4 py-3 text-crema ${error ? "border-ocupado" : "border-borde"}`}
            {...extra}
        />
        {error && (
            <Text className="font-body text-xs text-ocupado mt-1">{MENSAJES[id] || "Este campo es obligatorio."}</Text>
        )}
    </View>
);

const FormularioCompra = () => {
    const router = useRouter();
    const { carrito, confirmarCompra } = useCarrito();
    const [paso, setPaso] = useState(0);
    const [form, setForm] = useState(VACIO);
    const [errores, setErrores] = useState({});
    const [pedido, setPedido] = useState(null);

    const total = carrito.reduce((suma, l) => suma + (parseFloat(l.precio) || 0), 0).toFixed(2);

    // Las pantallas del Drawer no se destruyen al salir: el formulario recordaba el pedido anterior.
    // Si tras un pedido vuelve a haber libros en el carrito, empieza una compra nueva desde cero.
    useEffect(() => {
        if (pedido && carrito.length > 0) {
            setPedido(null);
            setPaso(0);
            setForm(VACIO);
            setErrores({});
        }
    }, [carrito.length]);


    // Next: onChange recibe un evento (e.target.value) → RN: onChangeText recibe el texto directamente
    const cambiar = (campo, valor) => {
        if (campo === "tarjeta") valor = valor.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
        setForm({ ...form, [campo]: valor });
        setErrores({ ...errores, [campo]: false });
    };

    const siguiente = () => {
        const resultado = VALIDACIONES[paso](form);
        setErrores(resultado);
        if (Object.values(resultado).some(Boolean)) {
            // Háptica de aviso: hay campos que corregir (Warning, no Error: no ha fallado nada)
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
            return;
        }
        if (paso < 2) {
            setPaso(paso + 1);
            return;
        }
        // Último paso: se guarda el pedido y los libros pasan a "comprados"
        setPedido({ nombre: form.nombre, email: form.email, unidades: carrito.length, total });
        confirmarCompra();
        // Háptica de éxito: el pedido está confirmado (con el resultado, no al pulsar)
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    };


    // Pedido confirmado
    if (pedido) {
        return (
            <View>
                <Text className="font-display text-3xl text-crema mb-4">Pedido confirmado</Text>
                <Text className="font-body text-apagado mb-8">
                    Gracias, {pedido.nombre}. Has comprado {pedido.unidades} {pedido.unidades === 1 ? "título" : "títulos"} por {pedido.total} €. Te enviaremos el resumen a {pedido.email}.
                </Text>
                <Pressable onPress={() => router.push("/mis-libros")} className="rounded py-4 bg-oro active:bg-oro-claro">
                    <Text className="font-body-semibold text-fondo text-center">Ver mis libros</Text>
                </Pressable>
            </View>
        );
    }

    // Carrito vacío
    if (carrito.length === 0) {
        return (
            <View>
                <Text className="font-display text-3xl text-crema mb-4">Tu carrito está vacío</Text>
                <Text className="font-body text-apagado mb-8">Añade títulos desde su ficha del catálogo para comprarlos.</Text>
                <Pressable onPress={() => router.push("/catalogo")} className="rounded py-4 bg-oro active:bg-oro-claro">
                    <Text className="font-body-semibold text-fondo text-center">Explorar el catálogo</Text>
                </Pressable>
            </View>
        );
    }

    return (
        <View>
            {/* Indicador de pasos: 1 · 2 · 3 */}
            <View className="flex-row mb-8">
                {PASOS.map((nombre, i) => (
                    <View key={nombre} className="flex-1 items-center">
                        <View className={`w-8 h-8 rounded-full border items-center justify-center ${i <= paso ? "border-oro" : "border-borde"}`}>
                            <Text className={`font-body text-xs ${i === paso ? "text-oro" : i < paso ? "text-crema" : "text-apagado"}`}>
                                {i < paso ? "✓" : i + 1}
                            </Text>
                        </View>
                        <Text className={`font-body text-xs mt-2 ${i === paso ? "text-oro" : i < paso ? "text-crema" : "text-apagado"}`}>
                            {nombre}
                        </Text>
                    </View>
                ))}
            </View>

            <Text className="font-display text-3xl text-crema mb-6">{PASOS[paso]}</Text>

            {CAMPOS[paso].map(([id, etiqueta, extra]) => (
                <Campo
                    key={id}
                    id={id}
                    etiqueta={etiqueta}
                    valor={form[id]}
                    alCambiar={(texto) => cambiar(id, texto)}
                    error={errores[id]}
                    extra={extra}
                />
            ))}

            <Text className="font-body text-xs text-apagado mb-6">No se realiza ningún cobro: es una compra de demostración.</Text>

            <Pressable onPress={siguiente} className="rounded py-4 bg-oro active:bg-oro-claro">
                <Text className="font-body-semibold text-fondo text-center">
                    {paso < 2 ? "Continuar" : `Pagar ${total} €`}
                </Text>
            </Pressable>
            {paso > 0 && (
                <Pressable onPress={() => setPaso(paso - 1)} className="rounded border border-oro py-4 mt-3 active:bg-superficie-2">
                    <Text className="font-body-semibold text-oro text-center">Volver al paso anterior</Text>
                </Pressable>
            )}

            {/* En la web va al lado del formulario; en móvil, debajo */}
            <View className="mt-10">
                <ResumenPedido />
            </View>
        </View>
    );
};

export default FormularioCompra;