# Tmux integration

# Set tmux window title to current directory
precmd() {
    if [[ "$TERM" = "screen" || "$TERM" = "xterm-256color" ]]; then
        local SHORTPWD="`basename $PWD`"
        local HOMEDIR="`basename $HOME`"
        if [[ "${SHORTPWD}" = "${HOMEDIR}" ]]; then
            SHORTPWD="~"
        fi
        if [[ -n "$TMUX" ]]; then
            tmux setenv TMUXPWD_$(tmux display -p "#I") $SHORTPWD
        fi
        echo -ne "\ek${SHORTPWD}/\e\\"
    fi
}

# Set tmux window title to running command
preexec() {
    if [[ "$TERM" = "screen" || "$TERM" = "xterm-256color" ]]; then
        local CMD="${1}"
        if [[ "${${(z)CMD}[1]}" = "vi" ]]; then
            CMD="${${(z)CMD}[2]}"
        fi
        if [[ ${#CMD} -ge 20 ]]; then
            CMD="${${(z)CMD}[1]}${${(z)CMD}[2]}${${(z)CMD}[3]} _"
        fi
        echo -ne "\ek${CMD}\e\\"
    fi
}
