#!/bin/bash
# Block commits that hardcode the current user's home directory. Use $HOME or ~ instead.
# Runs from .githooks/pre-commit. Paths under .claude/ and .serena/ are skipped because
# Claude Code writes absolute paths there on purpose.

FILES_WITH_PATHS=$(git diff --cached --name-only --diff-filter=ACMR \
    | grep -v "^\.claude/" \
    | grep -v "^\.serena/" \
    | grep -v "SECURITY.md" \
    | xargs grep -l "$HOME" 2>/dev/null || true)

if [ -n "$FILES_WITH_PATHS" ]; then
    echo "Error: hardcoded home path ($HOME) found. Use \$HOME or ~ instead."
    echo "Files with hardcoded paths:"
    echo "$FILES_WITH_PATHS"
    exit 1
fi

exit 0
