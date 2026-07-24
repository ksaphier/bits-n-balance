# bits-n-balance

Blog en Astro organizado por temas (finanzas, recetas, salud, ...), sucesor
de `blog-financiero` (que solo cubría finanzas). Cada post es un archivo
Markdown dentro de su propia carpeta, lo que permite acompañarlo de imágenes
u otros archivos si hace falta.

## 🚀 Estructura de contenido

```text
src/
├── content.config.ts        # define la collection "posts" (loader glob sobre src/posts)
├── layouts/PostLayout.astro
├── pages/
│   ├── index.astro           # portada: agrupa posts por categoría
│   └── [category]/[slug].astro   # ruta dinámica: renderiza cualquier post
└── posts/
    ├── finanzas/
    │   └── que-es-la-bolsa/
    │       └── index.md
    ├── recetas/
    └── salud/
```

Cada carpeta de `src/posts/<categoria>/` es una categoría; cada subcarpeta
dentro de ella es un post, con su `index.md` (y ahí mismo, si hace falta,
imágenes u otros archivos referenciados con ruta relativa). La ruta pública
de un post es `/<categoria>/<slug-de-la-carpeta>` — por ejemplo
`src/posts/finanzas/que-es-la-bolsa/index.md` → `/finanzas/que-es-la-bolsa`.

### Agregar un post nuevo

1. Crear `src/posts/<categoria>/<slug>/index.md` (si la categoría no existe
   todavía, se crea la carpeta y listo — aparece sola en la portada en
   cuanto tiene al menos un post).
2. Frontmatter requerido:
   ```yaml
   ---
   title: "Título del post"
   description: "Descripción corta para la portada y meta tags."
   pubDate: 2026-07-23
   author: "Tu nombre"
   tags: ["tag1", "tag2"]
   ---
   ```
3. Si querés que el nombre de la categoría se muestre bonito en vez del slug
   crudo (p. ej. "Finanzas" en vez de "finanzas"), agregalo al mapeo en
   `src/lib/categories.ts`.

No hace falta build ni reiniciar nada: el servicio corre el dev server de
Astro, que compila cada página bajo demanda y observa `src/posts/`.

## 🧞 Comandos

| Comando                   | Acción                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Instala dependencias                             |
| `npm run dev`             | Levanta el dev server en `localhost:4322`        |
| `npm run build`           | Build de producción a `./dist/`                  |
| `npm run preview`         | Preview del build local                          |
| `npm run astro ...`       | CLI de Astro (`astro add`, `astro check`, etc.)  |

## Acceso y despliegue

Corre 24/7 como servicio `systemd --user` (mismo patrón que
`../financial-projects/dashboard` y el extinto `blog-financiero`) —
accesible por IP:puerto desde cualquier dispositivo en la LAN o la tailnet,
sin túnel SSH:

- LAN: `http://192.168.1.50:4322`
- Tailscale: `http://100.99.8.117:4322`

Sin autenticación: es contenido de estudio, sin datos sensibles.

| Servicio | Qué es | Puerto |
|---|---|---|
| `bits-n-balance.service` | `astro dev --host` | 4322 (`0.0.0.0`) |

Unit file en `~/.config/systemd/user/bits-n-balance.service`. Manejo:

```
systemctl --user status bits-n-balance
systemctl --user restart bits-n-balance
journalctl --user -u bits-n-balance -f   # logs en vivo
```

Se instaló con `systemctl --user enable --now bits-n-balance`. El
`loginctl enable-linger` que permite que los servicios de usuario sigan
corriendo sin sesión activa ya está aplicado a nivel de cuenta — no hace
falta repetirlo.

`blog-financiero` (finanzas, versión anterior de este blog) quedó
retirado: su servicio systemd fue deshabilitado, aunque el código sigue
en `financial-projects/blog-financiero` como referencia.
