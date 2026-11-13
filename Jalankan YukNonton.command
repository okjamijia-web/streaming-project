#!/bin/zsh
# Klik dua kali untuk menyalakan YukNonton. Tutup jendela Terminal (atau Ctrl+C) untuk mematikan.
cd "$(dirname "$0")"

if lsof -ti tcp:5050 >/dev/null 2>&1; then
  echo "YukNonton sudah berjalan."
  open "http://localhost:5050"
  exit 0
fi

[ -d node_modules ] || npm install

(sleep 3 && open "http://localhost:5050") &
npm start
