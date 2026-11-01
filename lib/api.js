// API simulada (Apidog). Mismo archivo que en la web de Next.js, adaptado a React Native.
export const BASE_URL = "https://mock.apidog.com/m1/1265024-1262848-default";

const obtener = async (ruta) => {
    const res = await fetch(`${BASE_URL}${ruta}`); // Next: { cache: 'no-store' } → en RN no hay servidor, se quita
    if (!res.ok) throw new Error(`La API respondió con ${res.status} en ${ruta}`);
    return res.json();
};

// Filtros admitidos por la API: categoria, anio_publicacion, tipo
export const getLibros = ({ categoria, anio, tipo } = {}) => {
    const filtros = []; // Next: URLSearchParams → en RN se monta a mano (no siempre está completo)
    if (categoria) filtros.push(`categoria=${encodeURIComponent(categoria)}`);
    if (anio) filtros.push(`anio_publicacion=${anio}`);
    if (tipo) filtros.push(`tipo=${encodeURIComponent(tipo)}`);
    const query = filtros.length > 0 ? `?${filtros.join("&")}` : "";
    return obtener(`/libros${query}`);
};

export const getLibro = (id) => obtener(`/libros/${id}`);

export const getEspacios = () => obtener("/espacios");