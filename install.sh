#!/bin/bash

# 색상 정의
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
ORANGE='\033[38;5;208m'
NC='\033[0m' # No Color

# 로그 함수
log_info() {
    echo -e "${GREEN}→ $1${NC}"
}

log_set() {
    echo -e "${ORANGE}→ $1${NC}"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Homebrew 설치 확인
check_brew() {
    if ! command -v brew &> /dev/null; then
        log_error "Homebrew가 설치되어 있지 않습니다."
        log_info "Homebrew를 설치하시겠습니까? (y/n)"
        read -r answer
        if [ "$answer" = "y" ]; then
            /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
        else
            log_error "Homebrew가 필요합니다. 설치 후 다시 시도해주세요."
            exit 1
        fi
    fi
}

# 디렉토리 생성
create_directories() {
    log_info "필요한 디렉토리 생성 중..."
    mkdir -p ~/.config/pet
    mkdir -p ~/.fig
}

# Hammerspoon 설치 및 설정
setup_hammerspoon() {
    log_info "Hammerspoon 설치 중..."
    brew install hammerspoon

    log_info "Hammerspoon 설정 파일 복사 중..."
    cp -r hammerspoon ~/.hammerspoon

    log_set "Hammerspoon이 설치되었습니다. 앱을 실행하여 권한을 허용해주세요."
}

# Pet 설치 및 설정
setup_pet() {
    log_info "Pet 설치 중..."
    brew install knqyf263/pet/pet

    log_info "Pet 설정 파일 복사 중..."
    cp pet/snippet.toml ~/.config/pet/snippet.toml

    log_set "Pet이 설치되었습니다."
}

# Fig 설치 및 설정
setup_fig() {
    log_info "Fig 설치 중..."
    brew install fig

    log_info "Fig 설정 파일 복사 중..."
    cp fig/settings.json ~/.fig/settings.json

    log_set "Fig가 설치되었습니다."
}

# Rectangle 설치 및 설정
setup_rectangle() {
    log_info "Rectangle 설치 중..."
    brew install rectangle

    log_set "Rectangle이 설치되었습니다. 앱을 실행하여 권한을 허용해주세요."

}

# 메인 설치 프로세스
main() {
    echo
    log_info "Development Tools (for Mac) 설치를 시작합니다..."

    # Homebrew 확인
    check_brew

    # 디렉토리 생성
    create_directories
    echo

    # 각 도구 설치
    setup_hammerspoon
    echo

    setup_pet
    echo

    setup_fig
    echo
    
    setup_rectangle
    echo

    echo -e "설치가 완료되었습니다!"
    echo
    log_set "Hammerspoon 단축키 설정:"
    log_set "init.lua 설정을 확인하고, 필요한 어플리케이션 단축키를 추가해주세요."
    echo
    log_set "Pet 단축키 설정:"
    log_set "'pet list' 명령어로 설정 확인하고, 'pet new' 혹은 'pet edit' 명령어로 필요한 명령어를 추가해주세요."
    echo
    log_set "Rectangle 단축키 설정:"
    log_set "⌘ + Option + ←: 윈도우를 화면 왼쪽으로 이동"
    log_set "⌘ + Option + →: 윈도우를 화면 오른쪽으로 이동"
    log_set "⌘ + Option + ↑: 윈도우를 최대화"
    log_set "⌘ + Option + ↓: 윈도우를 원래 크기로 복원"
    echo
    log_set "Hammerspoon과 Rectangle을 실행하여 필요한 권한을 허용해주세요."
}

# 스크립트 실행
main 