#!/usr/bin/env bash
# Prettier sur les seuls fichiers modifiés par rapport à la branche de base.
# Le dépôt n'est pas encore entièrement formaté : on ne bloque l'agent que sur
# ce qu'il a touché.
#
# Usage : bash scripts/agent/format-changed.sh [--check|--write]   (défaut : --check)
# Env   : BASE_REF (défaut : origin/main)
set -euo pipefail

mode="${1:---check}"
base="${BASE_REF:-origin/main}"

mapfile -t files < <(
  {
    git diff --name-only --diff-filter=ACMR "$base" -- 2>/dev/null || true
    git ls-files --others --exclude-standard
  } | sort -u | grep -E '\.(ts|html|scss|css|json|md|mjs|js|yml|yaml)$' | grep -v '^\.github/' || true
)

if [ "${#files[@]}" -eq 0 ]; then
  echo "Aucun fichier modifié à vérifier."
  exit 0
fi

npx prettier "$mode" --ignore-unknown "${files[@]}"
