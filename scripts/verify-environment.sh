#!/usr/bin/env bash
set -euo pipefail

missing=0

check() {
  local name="$1"
  local command="$2"

  if command -v "$command" >/dev/null 2>&1; then
    printf "ok: %s found\\n" "$name"
  else
    printf "missing: %s (%s)\\n" "$name" "$command"
    missing=1
  fi
}

check "git" "git"
check "GitHub CLI" "gh"
check "Bun" "bun"

if gh extension list 2>/dev/null | grep -q "copilot"; then
  printf "ok: GitHub Copilot CLI extension found\\n"
else
  printf "note: GitHub Copilot CLI was not detected by gh extension list\\n"
fi

exit "$missing"
