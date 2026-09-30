# amocitos-page ♥

Una página web estática hecha como regalo. Muestra cronómetros en tiempo real
que cuentan cuánto tiempo llevan juntos, y una sección con historias.

Sin backend, sin frameworks, sin build. Solo **HTML + CSS + JavaScript**.

## Estructura

```
amocitos-page/
├── index.html            Página principal (cronómetros + historias)
├── css/
│   ├── styles.css        Estilos de la página principal
│   └── story.css         Estilos de las páginas de historia
├── js/
│   └── main.js           Cronómetros y animaciones de scroll
└── stories/
    ├── historia-1.html   Cómo nos conocimos
    ├── historia-2.html   Nuestra primera cita
    └── historia-3.html   Nuestros viajes
```

## Cómo verla en local

Necesitas Python instalado. Desde esta carpeta, ejecuta uno de estos comandos:

```powershell
python3 -m http.server 8000
```

o, según cómo tengas instalado Python en Windows:

```powershell
py -m http.server 8000
```

Luego abre el navegador en: <http://localhost:8000>

Para detener el servidor, pulsa `Ctrl + C` en la terminal.

## Cómo personalizar

### Fechas de los cronómetros

Están en `index.html`, en el atributo `data-start` de cada `.timer`
(formato `AAAA-MM-DDTHH:MM:SS`):

- Novios: `2019-02-16`
- Nos conocimos: `2018-10-09`
- Primer beso: `2018-10-26`

### Fotos de fondo (ahora son colores placeholder)

Los fondos usan gradientes de color como marcador de posición. Para poner una
foto real, edita el CSS.

En `css/styles.css`, reemplaza cada regla `--bg-N` o el selector correspondiente.
Por ejemplo, para la primera pantalla (novios):

```css
.hero[data-bg="1"]::before {
  background-image: url("../assets/nosotros.jpg");
}
```

(crea una carpeta `assets/` y guarda ahí tus imágenes).

Las tarjetas de historias usan `[data-bg="4"]`, `[data-bg="5"]`, `[data-bg="6"]`
y las cabeceras de cada historia usan los mismos valores en `css/story.css`.

### Texto de las historias

Edita los archivos en `stories/`. El texto es un placeholder listo para que lo
reemplaces con tus recuerdos.

## Cómo desplegar en tu dominio

Como es una página 100% estática, puedes subir la carpeta completa a cualquier
hosting estático. Opciones gratis o baratas:

- **Netlify** o **Vercel**: arrastra la carpeta o conecta este repo de Git.
- **GitHub Pages**: activa Pages en el repositorio.
- **Cloudflare Pages**.
- Cualquier hosting tradicional: sube los archivos por FTP a la carpeta pública
  (normalmente `public_html`).

En todos los casos, apunta tu dominio comprado al hosting siguiendo su guía de
DNS. `index.html` debe quedar en la raíz del sitio.
