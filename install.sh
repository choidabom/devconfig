#!/bin/bash

# 스크립트 디렉토리 경로
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

# 색상 정의
RED='\033[0;31m'      # 오류 메시지용
GREEN='\033[0;32m'    # 진행 상태용
YELLOW='\033[1;33m'   # 경고 메시지용
ORANGE='\033[38;5;208m' # 설정 정보용
NC='\033[0m'          # 색상 초기화

# 로그 함수
log_info() {
    # 진행 상태 표시 (설치, 복사 등 진행 중인 작업)
    echo -e "${GREEN}→ $1${NC}"
}

log_set() {
    # 설정 정보나 중요한 결과 표시
    echo -e "${ORANGE}• $1${NC}"
}

log_warn() {
    # 주의가 필요한 경고 메시지
    echo -e "${YELLOW}⚠ $1${NC}"
}

log_error() {
    # 오류 메시지
    echo -e "${RED}✖ $1${NC}"
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

    log_set "Hammerspoon이 설치되었습니다. 앱을 실행하여 권한을 허용해주세요."
}

# Pet 설치 및 설정
setup_pet() {
    log_info "Pet 설치 중..."
    brew install knqyf263/pet/pet

    log_set "Pet이 설치되었습니다. (키바인딩은 zsh 모듈에서 자동 로드됨)"
}

# Fig 설치 및 설정
setup_fig() {
    log_info "Fig 설치 중..."
    brew install fig

    log_set "Fig가 설치되었습니다."
}

# Rectangle 설치 및 설정
setup_rectangle() {
    log_info "Rectangle 설치 중..."
    brew install rectangle

    log_set "Rectangle이 설치되었습니다. 앱을 실행하여 권한을 허용해주세요."
}

# Tmux 설치
setup_tmux() {
    log_info "Tmux 설치 중..."
    brew install tmux

    log_set "Tmux가 설치되었습니다."
}

# Zsh 설정
setup_zsh() {
    log_info "Zsh devconfig 모듈 설정 중..."

    # .zshrc에 devconfig 모듈 로딩이 이미 있는지 확인
    if ! grep -q "# Load devconfig zsh modules" ~/.zshrc; then
        cat >> ~/.zshrc << 'EOF'

# Load devconfig zsh modules
for config_file in ~/devconfig/zsh/*.zsh; do
    source $config_file
done
EOF
        log_set "devconfig zsh 모듈이 .zshrc에 추가되었습니다."
    else
        log_warn "devconfig zsh 모듈이 이미 .zshrc에 존재합니다."
    fi

    log_set "Zsh 설정이 완료되었습니다. 터미널을 재시작하면 적용됩니다."
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

    setup_tmux
    echo

    setup_zsh
    echo

    # 심볼릭 링크 자동 생성
    log_info "설정 파일 심볼릭 링크 생성 중..."
    "$SCRIPT_DIR/sync.sh"
    echo

    log_set "설치가 완료되었습니다!"
    echo

    log_info "다음 단계:"
    log_set "• 터미널을 재시작하여 zsh 설정을 적용하세요."
    echo

    log_info "Hammerspoon 단축키 설정:"
    log_set "• init.lua 설정을 확인하고, 필요한 어플리케이션 단축키를 추가해주세요."
    echo

    log_info "Rectangle 단축키 설정:"
    log_set "• ⌘ + Option + ←: 윈도우를 화면 왼쪽으로 이동"
    log_set "• ⌘ + Option + →: 윈도우를 화면 오른쪽으로 이동"
    log_set "• ⌘ + Option + ↑: 윈도우를 최대화"
    log_set "• ⌘ + Option + ↓: 윈도우를 원래 크기로 복원"
    echo

    log_info "Pet 단축키 설정:"
    pet list
    log_set "• 'pet list' 명령어로 설정 확인하고, 'pet new' 혹은 'pet edit' 명령어로 필요한 명령어를 추가해주세요."
    echo

    # 설치 이후 앱 자동으로 실행되도록
    log_info "설치된 앱들을 실행합니다..."
    open ~/.hammerspoon/init.lua 
    open -a Hammerspoon
    open -a Rectangle
    echo
    
    log_set "앱들이 실행되었습니다. 각 앱의 권한 요청 창이 나타나면 허용해주세요."
}

# 스크립트 실행
main 