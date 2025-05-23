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

## Cautions

- Verify necessary permissions before running the installation script
- Hammerspoon and Rectangle require system permissions - run them after installation to grant access
- Recommended to backup existing configuration files before installation

## Troubleshooting

- Check individual tool logs if installation issues occur
- Use `brew doctor` to diagnose Homebrew-related problems
- Check System Preferences > Security & Privacy for permission-related issues

## License

MIT License
