// Funciones de ayuda para los espacios. Igual que en la web de Next (lib/espacios.js).

// Estado del espacio: "libre" u "ocupado"
export const getEstado = (espacio) => {
    if (espacio.estado) return espacio.estado.toLowerCase();
    if (espacio.ocupado_por) return "ocupado";
    return "libre";
};

// "2026-11-03T09:30:00" → "09:30"
export const formatHora = (iso) => {
    if (!iso) return "--:--";
    return iso.split("T")[1]?.substring(0, 5) ?? "--:--";
};

// Precio por hora según la capacidad
export const getPrecio = (capacidad) => {
    if (capacidad <= 2) return "5 €/h";
    if (capacidad <= 4) return "8 €/h";
    if (capacidad <= 6) return "12 €/h";
    if (capacidad <= 8) return "15 €/h";
    return "20 €/h";
};

export const getHorario = (espacio) => {
    const estado = getEstado(espacio);
    if (espacio.hora_inicio) {
        return `${formatHora(espacio.hora_inicio)} – ${formatHora(espacio.hora_fin)}`;
    }
    return estado === "ocupado" ? "Reservado todo el día" : "Libre todo el día";
};