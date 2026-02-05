#!/bin/bash

# 색상 정의
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# 스크립트 디렉토리 경로
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

log_info() {
    echo -e "${GREEN}→ $1${NC}"
}

log_done() {
    echo -e "${YELLOW}✓ $1${NC}"
}

echo
log_info "심볼릭 링크 설정을 시작합니다..."
echo

# Hammerspoon
log_info "Hammerspoon 심볼릭 링크 생성 중..."
rm -rf ~/.hammerspoon
ln -sf "$SCRIPT_DIR/hammerspoon" ~/.hammerspoon
log_done "Hammerspoon 심볼릭 링크 완료"
echo

# Pet
log_info "Pet 심볼릭 링크 생성 중..."
mkdir -p ~/.config/pet
rm -f ~/.config/pet/snippet.toml
ln -sf "$SCRIPT_DIR/pet/snippet.toml" ~/.config/pet/snippet.toml
log_done "Pet 심볼릭 링크 완료"
echo

# Fig
log_info "Fig 심볼릭 링크 생성 중..."
mkdir -p ~/.fig
rm -f ~/.fig/settings.json
ln -sf "$SCRIPT_DIR/fig/settings.json" ~/.fig/settings.json
log_done "Fig 심볼릭 링크 완료"
echo

log_done "모든 심볼릭 링크 설정이 완료되었습니다!"
