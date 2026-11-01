import { useState, useEffect } from "react";
import { getLibro } from "../lib/api";

export const useLibro = (id) => {
    const [libro, setLibro] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const cargar = async () => {
            setLoading(true);
            setError(null);
            try {
                const datos = await getLibro(id);
                setLibro(datos);
            } catch (e) {
                setError(e.message);
            } finally {
                setLoading(false);
            }
        };
        cargar();
    }, [id]); // se vuelve a cargar si cambia el id

    return { libro, loading, error };
};