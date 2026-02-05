# History configuration

# Make sure history directory exists
mkdir -p ~/.zsh

# History settings
HISTSIZE=100000
SAVEHIST=100000
HISTFILE=~/.zsh/history
ZLE_RPROMPT_INDENT=0

# History options
setopt append_history
setopt inc_append_history
setopt extended_history
setopt hist_find_no_dups
setopt hist_ignore_all_dups
setopt hist_reduce_blanks
setopt hist_ignore_space
setopt hist_no_store
setopt hist_no_functions
setopt no_hist_beep
setopt hist_save_no_dups
