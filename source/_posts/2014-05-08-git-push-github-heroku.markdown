---
layout: post
title: "Git Push to Github and Heroku"
date: 2014-05-08 22:58
comments: true
categories: [git]
---

Group assign any git repository, on any git provider, and for as many remotes as you wish.

<!-- more -->

<img src="/images/posts/remotes.jpg" alt="Remotes Funny" />

From your terminal, `cd` into where your repository is located and run:

```
$> git remote -v
```

Should look something like:

```
heroku  git@heroku.com:activezoo.git (fetch)
heroku  git@heroku.com:activezoo.git (push)
openshift ssh://5340404b5973ca1ff800034d@ruby-activezoo.rhcloud.com/~/git/ruby.git (push)
openshift ssh://5340404b5973ca1ff800034d@ruby-activezoo.rhcloud.com/~/git/ruby.git (fetch)
origin  git@github.com:michaelminter/active_zoo.git (push)
origin  git@github.com:michaelminter/active_zoo.git (fetch)
```

Find the Github repo. Usually set up under the __origin__ label.

To create the group remote, add the following command, with your Github repo address switched out with the one listed.

```
$> git remote add all git@github.com:michaelminter/test.git
```

Find the Heroku git repo address and switch it out with the repo in this command. Run the command.

```
$> git remote set-url --add all git@heroku.com:test.git
```

Keep executing the previous command, switching out the git address, to add more repos to the new "all" remote.

```
$> git remote -v
all git@github.com:michaelminter/active_zoo.git (fetch)
all git@heroku.com:activezoo.git (push)
all git@github.com:michaelminter/active_zoo.git (push)
heroku  git@heroku.com:activezoo.git (fetch)
heroku  git@heroku.com:activezoo.git (push)
openshift ssh://5340404b5973ca1ff800034d@ruby-activezoo.rhcloud.com/~/git/ruby.git (push)
openshift ssh://5340404b5973ca1ff800034d@ruby-activezoo.rhcloud.com/~/git/ruby.git (fetch)
origin  git@github.com:michaelminter/active_zoo.git (push)
origin  git@github.com:michaelminter/active_zoo.git (fetch)
```

Now you can push the same code to multiple remotes with one command.

```
$> git push all [branch]
```
