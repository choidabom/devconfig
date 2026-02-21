# Aliases

# Enhanced ls with eza
if command -v eza &> /dev/null; then
    alias ls='eza -F'
fi

# Search and edit
alias gr='noglob _greps'

# Calculator
alias calc='noglob _calc'

# URL performance testing
alias ecurl='noglob _ecurl'

# UUID generator
alias uuid='noglob _uuid'

# Kubernetes logs
if command -v stern &> /dev/null; then
    alias stern="noglob _stern"
fi

# History with timestamp
alias history='history -i -1000'

# z (jump to directory)
if [ -d ~/.oh-my-zsh ]; then
    alias c=z
fi

# bat (enhanced cat)
if command -v bat &> /dev/null; then
    alias cat='bat --style=plain'
    alias batp='bat --style=plain --paging=never'
fi

# jq (JSON processor)
if command -v jq &> /dev/null; then
    alias json='jq .'
    alias jsonc='jq -C .'  # Colored output
fi
