import React, { createContext, useContext, useState } from "react";

const CarritoContext = createContext(null);

export const CarritoProvider = ({ children }) => {
    const [carrito, setCarrito] = useState([]); // Next: también en sessionStorage → en RN solo en memoria
    const [librosComprados, setLibrosComprados] = useState([]);

    const anadirAlCarrito = (libro) => {
        if (carrito.some((l) => l.id === libro.id)) return; // no duplicar
        setCarrito([...carrito, libro]);
    };

    const quitarDelCarrito = (id) => {
        setCarrito(carrito.filter((l) => l.id !== id));
    };

    const confirmarCompra = () => {
        const nuevos = carrito.filter((l) => !librosComprados.some((c) => c.id === l.id));
        setLibrosComprados([...librosComprados, ...nuevos]);
        setCarrito([]);
    };

    const enCarrito = (id) => carrito.some((l) => String(l.id) === String(id));
    const estaComprado = (id) => librosComprados.some((l) => String(l.id) === String(id));

    return (
        <CarritoContext.Provider
            value={{ carrito, anadirAlCarrito, quitarDelCarrito, confirmarCompra, enCarrito, librosComprados, estaComprado }}
        >
            {children}
        </CarritoContext.Provider>
    );
};

export const useCarrito = () => {
    const ctx = useContext(CarritoContext);
    if (!ctx) throw new Error("useCarrito debe usarse dentro de <CarritoProvider>");
    return ctx;
};