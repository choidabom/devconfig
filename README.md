# Development Tools Setup

This repository contains tools for quickly setting up a Mac development environment.

## Included Tools

- [hammerspoon](https://github.com/choidabom/dev-config/tree/main/hammerspoon)

  - keyboard shortcut (for mac)
  - Configuration file: `~/.hammerspoon/`

- [pet](https://github.com/choidabom/dev-config/tree/main/pet)

  - Store and quickly execute frequently used commands
  - Configuration file: `~/.config/pet/snippet.toml`

- fig

  - Provides autocomplete for commands, arguments, and file paths
  - Configuration file: `~/.fig/settings.json`

- rectangle
  - Adjust window size and position using keyboard shortcuts
  - Key shortcuts:
    - ⌘ + Option + ←: Move window to left half of screen
    - ⌘ + Option + →: Move window to right half of screen
    - ⌘ + Option + ↑: Maximize window
    - ⌘ + Option + ↓: Restore window to original size

## Installation

1. Clone the repository:

```bash
git clone https://github.com/choidabom/dev-config.git
cd dev-config
```

2. Run the installation script:

```bash
chmod +x install.sh
./install.sh
```

## Installation Process

- Automatically installs Homebrew if not present
- Creates necessary directories
- Installs tools and copies configuration files
- Requires running Hammerspoon and Rectangle after installation to grant permissions

---

- Homebrew가 설치되어 있지 않은 경우 자동으로 설치
- 필요한 디렉토리 생성
- 각 도구 설치 및 설정 파일 복사
- 설치 완료 후 Hammerspoon과 Rectangle 실행하여 권한 허용 필요

## Cautions

- Verify necessary permissions before running the installation script
- Hammerspoon and Rectangle require system permissions - run them after installation to grant access
- Recommended to backup existing configuration files before installation

---

- 설치 스크립트 실행 전에 필요한 권한이 있는지 확인
- Hammerspoon과 Rectangle은 시스템 권한이 필요하므로 설치 후 반드시 실행하여 권한을 허용해야 함
- 기존 설정 파일이 있는 경우 백업 후 설치 진행 권장

## Troubleshooting

- Check individual tool logs if installation issues occur
- Use `brew doctor` to diagnose Homebrew-related problems
- Check System Preferences > Security & Privacy for permission-related issues

---

- 설치 중 문제가 발생한 경우 각 도구의 로그를 확인
- Homebrew 관련 문제는 `brew doctor` 명령어로 진단 가능
- 권한 관련 문제는 시스템 환경설정 > 보안 및 개인 정보 보호에서 확인

## Contribution

버그 수정이나 기능 추가를 원하시는 경우 Pull Request를 보내주세요.

## License

MIT License
