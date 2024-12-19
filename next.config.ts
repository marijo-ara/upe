import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true, // Por defecto está activado en las nuevas versiones
  trailingSlash: true, // Añade una barra al final de cada ruta estática
  async redirects() {
    return [
      {
        source: "/",
        destination: "/es", // Redirige la raíz al idioma predeterminado
        permanent: false,   // Redirección temporal
      },
    ];
  },
};

export default nextConfig;
