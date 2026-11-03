import { useState, useEffect } from "react";
import { getEspacios } from "../lib/api";

export const useEspacios = () => {
    const [espacios, setEspacios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const cargar = async () => {
            setLoading(true);
            setError(null);
            try {
                const datos = await getEspacios();
                setEspacios(datos);
            } catch (e) {
                setError(e.message);
            } finally {
                setLoading(false);
            }
        };
        cargar();
    }, []); // [] = se carga una sola vez al abrir la pantalla

    return { espacios, loading, error };
};