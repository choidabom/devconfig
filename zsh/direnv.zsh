# direnv - Directory-specific environment variables

if command -v direnv &> /dev/null; then
    eval "$(direnv hook zsh)"

    # Suppress direnv output (optional)
    export DIRENV_LOG_FORMAT=""
fi
