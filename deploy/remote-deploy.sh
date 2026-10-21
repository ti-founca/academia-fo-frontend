#!/usr/bin/env bash
# Se ejecuta EN EL VPS (lo invoca el workflow por SSH) después de subir el build.
#   Uso: remote-deploy.sh <sha>
# Estructura:
#   /var/www/academia-fo/current -> releases/<sha>   (DocumentRoot de Apache)
#   /var/www/academia-fo/releases/<sha>/             (archivos de cada versión)
#   /var/www/academia-fo/releases/<sha>.files        (manifiesto, fuera del DocumentRoot)
set -euo pipefail

BASE="${DEPLOY_BASE:-/var/www/academia-fo}"
KEEP="${KEEP_RELEASES:-5}"
SHA="${1:?Falta el SHA del release}"

RELEASES="$BASE/releases"
NEW="$RELEASES/$SHA"

[ -f "$NEW/index.html" ] || { echo "No existe $NEW/index.html"; exit 1; }

# 1. Manifiesto con los archivos propios de esta versión
(cd "$NEW" && find . -type f | sed 's#^\./##' | sort) > "$RELEASES/$SHA.files"

# 2. Conservar los chunks JS/CSS de la versión anterior, para que quien tenga
#    la app abierta durante el despliegue no reciba errores al cargar secciones.
#    Solo se copian los archivos propios de esa versión (no se acumulan indefinidamente).
if [ -L "$BASE/current" ]; then
  PREV_SHA="$(basename "$(readlink "$BASE/current")")"
  if [ "$PREV_SHA" != "$SHA" ] && [ -f "$RELEASES/$PREV_SHA.files" ]; then
    grep -E '\.(js|css)$' "$RELEASES/$PREV_SHA.files" | while read -r f; do
      [ -e "$NEW/$f" ] || { mkdir -p "$NEW/$(dirname "$f")"; cp -p "$RELEASES/$PREV_SHA/$f" "$NEW/$f"; }
    done
  fi
fi

# 3. Cambio atómico de versión
ln -sfn "releases/$SHA" "$BASE/current.tmp"
mv -Tf "$BASE/current.tmp" "$BASE/current"
echo "Activo: $SHA"

# 4. Borrar versiones viejas (se conservan las $KEEP más recientes)
ls -1dt "$RELEASES"/*/ | tail -n +"$((KEEP + 1))" | while read -r old; do
  old="${old%/}"
  [ "$old" = "$NEW" ] && continue
  rm -rf "$old" "$old.files"
  echo "Eliminado: $(basename "$old")"
done