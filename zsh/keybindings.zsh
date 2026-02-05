# Key bindings

# Only set keybindings if oh-my-zsh is installed
if [ -d ~/.oh-my-zsh ]; then
    # History substring search (up/down arrows)
    bindkey "^[[A" history-substring-search-up
    bindkey "^[[B" history-substring-search-down

    # Alt+k/j for history search
    bindkey "^[k" history-substring-search-up
    bindkey "^[j" history-substring-search-down

    # Alt+Enter to accept autosuggestion
    bindkey "^[^M" autosuggest-accept
fi
