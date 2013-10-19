---
layout: post
title: "Android Javascript Debugging"
date: 2013-08-12 11:23
comments: true
categories: [Javascript]
---
As a web developer, I have to use `console.log` a lot to see what's going on with Javascript in my web applications, and Android Browser does __not__ make this __an easy task__.

<!-- more -->

Initial searches brought up articles suggesting use of the Android SDK, plugging my phone into my computer, setting up the debug bridge, et cetera. That's a lot of work.

There is a way to do __Javascript debugging__ entirely on your phone __without the Android SDK__.

__Install__ a log viewer from the Android Market (example: _logcat_). This shows all of your systems log messages. Most log viewers will let you search/filter. __Search__ for the term, "_browser_". All `console.log` messages will show up using this keyword.

One difference from desktop web inspectors: Android Browser __only prints the first argument__ from `console.log`. So instead of:

``` javascript
console.log("here's my variable ", var);
```

you should write it like:

``` javascript
console.log("here's my variable " + var);
```