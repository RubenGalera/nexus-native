import { useState, useEffect } from "react";
import { getLibros } from "../lib/api";

export const useLibros = (filtros = {}) => {
    const [libros, setLibros] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const cargar = async () => {
            setLoading(true);
            setError(null);
            try {
                const datos = await getLibros(filtros);
                setLibros(datos);
            } catch (e) {
                setError(e.message);
            } finally {
                setLoading(false);
            }
        };
        cargar();
    }, [filtros.categoria, filtros.anio, filtros.tipo]); // se vuelve a cargar si cambia un filtro

    return { libros, loading, error };
};