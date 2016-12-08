---
layout: single
title: Command Line Workshop (tutorial)
date: 2014-11-18 15:45:50.000000000 -08:00
type: post
published: true
status: publish
categories:
- Digital Humanities
tags:
- command line
- digital humanities
- tutorial
- workshop
meta:
  _edit_last: '1'
  _thumbnail_id: '395'
  _wpas_done_all: '1'
  slide_template: default
  _wp_old_slug: '394'
author:
  login: kmiyake
  email: keith.miyake@gmail.com
  display_name: Keith Miyake
  first_name: Keith
  last_name: Miyake
excerpt: The tutorial bits from a workshop I led on using the command line while I was a GC Digital Fellow. Don't be scared, give it a try!
featured:
  src: /assets/img/Terminal_003.png
  alt: C-3PO thinks it is improper not to learn the terminal. 
  caption: R2-D2 thinks you should learn to use the terminal.
---

## Intro


I recently gave a workshop on using the command line (a.k.a., terminal, command prompt, shell, etc.) at the Graduate Center as part of my Digital Fellow responsibilities. For the sake of sharing, I'm reposting the tutorial/walkthrough that guided the workshop. It's really basic and pretty sparse, but the resources linked at the bottom provide lots of additional content to help you or your students get started using the \*NIX/BSD/CygWin/busybox command line. Note: everything listed should work with most shells, although iirc, the "apropos" command isn't included in busybox and "man" probably won't have much useful documentation.

## Command Line Walkthrough

1. Setup  

    ```sh
    ./setup.sh
    cd ~
    ```

2. Structure of a command  

    ```grep -r capital etext/*```  

    ```command```, ```flags/options```, ```arguments```

    ```*``` (asterisk) is a *wildcard*, meaning match everything in the etext directory. ```/``` slashes are used to separate directories: ```/home/keith/projects/etext``` might be the full path (location) of the etext folder, which is within the projects folder, which itself is in the keith folder within the home folder located at the root of my drive (filesystem).

3. White spaces in commands

    White spaces separate arguments and options, use quotes to include spaces in things like filenames  

    ```grep -r "they were" etext/*```

4. The file system, files, folders, user folder  

    Common commands: ```pwd```, ```ls```, ```cd```, ```mkdir```, ```touch```, ```rmdir```, ```rm```, ```cp```, ```mv```
    ```sh
    pwd  
    ls  
    ls -l  
    cd mydir  
    cd ~  
    mkdir mynewdir  
    mkdir -p mynewdir/mysubdir/mysubsub/subx3  
    touch goodbye.txt  
    rmdir mynewdir/mysubdir/mysubsub/subx3  
    rm goodbye.txt  
    rm -r mynewdir  
    cp hello.txt mydir/hello_copy.txt  
    mv mydir/hello_copy.txt ./
    mv hello_copy.txt hello_goodbye.txt
    ```

    Use ```mv``` to rename a file (move a file to a new file with a different name)

5. Working with files: cat, less  

    ```sh 
    cat hello.txt  
    cat aesopa10.txt  
    less aesopa10.txt
    ```

6. Pipes and redirection  

    ```|``` pipes take the output from one command and sends it as an argument of the second one

    ```>``` (redirect), ```>>``` (append) sends output as the input to the file/stream  

    ```sh
    echo "hello world." > hello.txt # output "hello world." into a new text file, hello.txt
    cat aesopa10.txt | less # read the aesopa10.txt file and send the output to the less program
    grep -r they etext/* > them.txt # search for 'they' and output results to them.txt
    cat >> them.txt # enter text to be appended to the end of them.txt
    ```  

    *Use ctrl-d to finish entering text*

7. Finding stuff: grep, find

    files: ```find . -name "*.txt" -print```  

    The ```.``` (dot) indicates the current directory. ```..``` (two dots) indicate the directory above the current directory (use ```pwd``` if you forget what directory you're in).

    text:

    ```sh
    grep -r race ./*  
    grep -r " race" ./*
    ```  

    case insensitive: ```grep -ir german ./*```  

    wildcards: ```grep -ir "fr.nc[eh]" ./*```

8. Getting help: man, apropos, --help  

    ```sh
    man grep  
    apropos find  
    grep --help
    ```

9. Autocompletion, bash history

    ```sh
    cat ae<tab> # --> [cat aesopa10.txt]
    <up> # --> scroll through previous commands
    ```

10. Exit  

    ```exit```

## Additional Stuff

1. Keyboard shortcuts

    See: [Wikipedia Bash Keyboard Shortcuts](http://en.wikipedia.org/wiki/Bash_%28Unix_shell%29#Keyboard_shortcuts)

    * ctrl-c: kill the currently running command/program
    * ctrl-d: exit the current program
    * ctrl-z: pause and return to the command line (```%n``` to resume the *n<sup>th</sup>* paused command, e.g., ```%1``` for the first paused command, etc.)
    * ctrl-a: jump to the beginning of a line
    * ctrl-e: jump to the end of a line
    * ctrl-b: move back one character
    * ctrl-f: move forward one character
    * ctrl-w: delete a word backwards
    * up/down/ctrl-p/ctrl-n: previous/next command
    * tab: autocomplete
    * ctrl-l: clear the display

2. Installing command line programs:

    * Debian Linux (Mint, Ubuntu, etc.): [apt](https://help.ubuntu.com/community/AptGet/Howto)
    * Red Hat/Fedora Linux: [yum](http://yum.baseurl.org/)
    * Arch/Manjaro Linux: [pacman](https://www.archlinux.org/pacman/)
    * OS X: [homebrew](http://brew.sh/)
      
      First have to run ```xcode-select --install```

    * Windows: [Chocolatey](https://chocolatey.org/)

      Requires: [cygwin](https://www.cygwin.com/) or [Ubuntu subsystem on Windows 10](https://msdn.microsoft.com/en-us/commandline/wsl/install_guide)

3. Other topics to look into: users, groups, permissions, linking, processes, shell scripts, loops...

4. Google is your friend!!!

## Additional Resources

 * [http://cli.learncodethehardway.org/book/](http://cli.learncodethehardway.org/book/)
 * [http://www.davidbaumgold.com/tutorials/command-line/](http://www.davidbaumgold.com/tutorials/command-line/)
 * [http://learnpythonthehardway.org/book/appendixa.html](http://learnpythonthehardway.org/book/appendixa.html)
 * [http://ryanstutorials.net/linuxtutorial/commandline.php](http://ryanstutorials.net/linuxtutorial/commandline.php)

## Advanced Resources

 * [http://ohmyz.sh/](http://ohmyz.sh/)
 * [https://github.com/revans/bash-it](https://github.com/revans/bash-it)
 * [http://zachholman.com/2010/08/dotfiles-are-meant-to-be-forked/](http://zachholman.com/2010/08/dotfiles-are-meant-to-be-forked/)
 * [http://dotfiles.github.io/](http://dotfiles.github.io/)

