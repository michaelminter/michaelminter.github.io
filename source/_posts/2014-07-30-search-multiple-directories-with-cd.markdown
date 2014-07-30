---
layout: post
title: "Search Multiple Directories with cd"
date: 2014-07-30 10:32
comments: true
categories: [Bash]
---

If you use the command line and frequent a particular directory you can set __cd__ to scan, not just current, but other directories as well.

<!-- more -->

Modify __~/.bash_profile__ by appending directories to the __CDPATH__ environment variable.

```bash
# define base directory for cd command
export CDPATH=$CDPATH:$HOME/Repos
```

Restart your terminal session and now you can `cd projectDir`. __cd__ will reference any subdirectories in the current directory&mdash;as well as __$HOME/Repos__.

## Autotabbing Custom Base Directories

You can install an additonal library; __bash-completion__ to use the __[tab]__ key to autocomplete from the __cd__ command.

```bash
brew install bash-completion
```

Add the following to __~/.bash_profile__.

```bash
# add bash-completion
if [ -f `brew --prefix`/etc/bash_completion ]; then
  . `brew --prefix`/etc/bash_completion
fi
```

To install __bash-completion__ on other systems and more resources: [https://github.com/bobthecow/git-flow-completion/wiki/Install-Bash-git-completion](https://github.com/bobthecow/git-flow-completion/wiki/Install-Bash-git-completion)

## Case Insensitive Completion

Update __~/.inputrc__ file to include the following line:

```bash
set completion-ignore-case on
```

For hyphens and underscores as well:

```bash
set completion-map-case on
```
