#!/bin/bash

# 색상 정의
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# 스크립트 디렉토리 경로
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

log_info() {
    echo -e "${GREEN}→ $1${NC}"
}

log_done() {
    echo -e "${YELLOW}✓ $1${NC}"
}

log_error() {
    echo -e "${RED}✖ $1${NC}"
}

# stow 설치 확인
if ! command -v stow &> /dev/null; then
    log_error "GNU Stow가 설치되어 있지 않습니다. 'brew install stow'로 설치해주세요."
    exit 1
fi

echo
log_info "GNU Stow로 심볼릭 링크를 설정합니다..."
echo

stow -d "$SCRIPT_DIR" -t "$HOME" --restow . 2>&1

if [ $? -eq 0 ]; then
    log_done "모든 심볼릭 링크 설정이 완료되었습니다!"
else
    log_error "심볼릭 링크 설정 중 오류가 발생했습니다."
    exit 1
fi
