# Utility Functions

# ripgrep + fzf + vim integration
_greps() {
    local line
    line=`rg --column --line-number --no-heading --color=always --sort path -g "$2" --smart-case "$1" | fzf --ansi` \
        && vim $(cut -d':' -f1 <<< "$line") +$(cut -d':' -f2 <<< "$line")
}

# Calculator using bc
_calc() {
    echo "${1}" | bc
}

# Measure curl performance (3 times)
_ecurl() {
    if [[ "${1}" = "" ]]; then
        echo "ecurl <url>"
    else
        for i in {1..3}; do curl -s -w "lookup[%{time_namelookup}] connect[%{time_connect}] app_conn[%{time_appconnect}] pre_trans[%{time_pretransfer}] redirect[%{time_redirect}] start_trans[%{time_starttransfer}] total[%{time_total}]\n" -o /dev/null "${1}"; done
    fi
}

# Generate lowercase UUID
_uuid() {
    uuidgen | tr '[:upper:]' '[:lower:]'
}

# Stern wrapper for Kubernetes (exclude healthCheck)
_stern() {
    if [[ "${2}" = "" ]]; then
        command stern -e healthCheck --template '{{color .PodColor .PodName}} {{.Message}}' $1
    else
        command stern -e healthCheck --template '{{color .PodColor .PodName}} {{.Message}}' -E $2 $1
    fi
}
