// En Next la portada era `/img/libro${id}.png` (carpeta public).
// En RN las imágenes locales necesitan require() con ruta fija: Metro las empaqueta
// al compilar y no admite rutas construidas con variables. Por eso usamos un mapa id → imagen.
const portadas = {
    1: require("../assets/img/libro1.png"),
    2: require("../assets/img/libro2.png"),
    3: require("../assets/img/libro3.png"),
    4: require("../assets/img/libro4.png"),
    5: require("../assets/img/libro5.png"),
    6: require("../assets/img/libro6.png"),
    7: require("../assets/img/libro7.png"),
    8: require("../assets/img/libro8.png"),
    9: require("../assets/img/libro9.png"),
    10: require("../assets/img/libro10.png"),
    11: require("../assets/img/libro11.png"),
    12: require("../assets/img/libro12.png"),
};

export default portadas;