<!-- @format -->

# .gitconfig에 alias 설정하기

1. 홈 디렉토리에서 .gitconfig 파일을 확인한다. -> `cat .gitconfig`

- 확인해보면 `[user]` 항목에 GitHub 사용자 이름과 이메일 주소 등의 사용자 정보가 설정되어 있을 것이다. (가장 기본적으로 처음에 진행하기에.)

2. .gitconfig 파일을 열고, 다음의 alias를 추가한다. -> `vi .gitconfig`

```vim
[alias]
    lg = log --graph -15 --abbrev=7 --decorate --date=relative --format=format:'%C(bold red)%h%C(re    set) -%C(bold yellow)%d%C(reset)%C(white)%w(110,1,2)%s%C(reset) %C(reset)%C(bold green)(%ar)%C(rese    t) %C(bold blue)<%an>%Creset' --all
    lgc = log --graph -30 --abbrev=7 --decorate --date=relative --format=format:'%C(bold red)%h%C(r    eset) -%C(bold yellow)%d%C(reset)%C(white)%w(110,1,2)%s%C(reset) %C(reset)%C(bold green)(%ar)%C(res    et) %C(bold blue)<%an>%Creset'
    slg = "!F() { git log --graph --abbrev=7 --decorate --date=relative --format=format:'%C(bold re    d)%h%C(reset) -%C(bold yellow)%d%C(reset)%C(white)%w(110,1,2)%s%C(reset) %C(reset)%C(bold green)(%a    r)%C(reset) %C(bold blue)<%an>%Creset' $1^..HEAD; }; F"
    llg = log --graph -300 --abbrev=7 --decorate --date=relative --format=format:'%C(bold red)%h%C(    reset) -%C(bold yellow)%d%C(reset)%C(white)%w(110,1,2)%s%C(reset) %C(reset)%C(bold green)(%ar)%C(re    set) %C(bold blue)<%an>%Creset' --all
    lgs = log --graph -15 --abbrev=7 --decorate --format=format:'%w(110,1,2)%s' --all
    lg1 = log --graph -15 --abbrev=7 --pretty=format:'%Cred%h%Creset -%C(bold yellow)%d%Creset %n%w    (110,1,2)%s %C(bold green)(%cr) %C(bold blue)<%an>%Creset'
    lg2 = log --graph -15 --abbrev=7 --decorate --format=format:'%C(bold blue)%h%C(reset) -%C(reset    )%C(bold yellow)%d %C(bold cyan)%aD%C(reset) %C(bold green)(%ar) %C(bold blue)<%an>%C(reset)%n''              %C(white)%n%w(110,1,2)%s%C(reset)%C(reset)' --all
    lgme = log --graph -15 --abbrev=7 --decorate --date=relative --format=format:'%C(reset)%s%C(res    et)%Creset' --author=newro --since=6am
    lgyes = log --graph -15 --abbrev=7 --decorate --date=relative --format=format:'%C(reset)%s%C(re    set)%Creset' --author=newro --since=yesterday
    dl = diff --name-only
    list = log --cherry-pick --right-only --decorate --date=relative --format=format:'%C(bold red)%    h%C(reset) -%C(bold yellow)%d%C(reset)%C(white)%w(110,1,2)%s%C(reset) %C(reset)%C(bold green)(%ar)%    C(reset) %C(bold blue)<%an>%Creset'
    dc = diff --cached
    ss = status -uno
    ci = commit -a
    co = checkout
    rollback = reset --hard HEAD
    noff = merge --no-ff
    close = "!f() { git merge --no-ff -m \"Closes $1\" $1; }; f"
    clear = !git branch -d $1 && git remote prune origin
```

3. .gitconfig 파일을 저장하면 완료. -> `:wq`

- alias들은 자주 사용하는 git 명령어들을 단축시키고, git 로그, 차이점(diff) 등을 더 쉽게 확인할 수 있도록 해준다.
- 잘 적용되었는지는 `git llg`같은 명령어를 실행해보면 된다. (원래 없는 명령어이기에 실행된 것 == 적용된 것)

ref. [.gitconfig에 alias 설정하기](https://bo5mi.tistory.com/219)
