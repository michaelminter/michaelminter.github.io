---
layout: post
title: "Clicked Link Attributes in jQuery Mobile Events"
date: 2013-02-06 18:13
comments: true
categories: [jQuery Mobile]
---
So...are you tired of writing and rewriting (or commenting out) Javascript and want to handle your clicked link attributes inside of a <a href="http://jquerymobile.com/" target="_blank">jQuery Mobile</a> event? Here's how:

<!--more-->

``` perl
var params = {};

$('a').live('click', function(event)
{
  $.each($(event.target)[0].attributes, function(key, value){
    params[value.name] = value.value;
  });
});

$('div[data-role="page"]').live('pageshow',function(event, ui)
{
 console.log(params)
});
```

The click event has to be done separately and parsed before the _pageshow_ event takes place.

Doing things this way you can also take full advantage of the rest of jQuery Mobile's special page responsive <a href="http://jquerymobile.com/test/docs/api/events.html" target="_blank">events</a> that happen throughtout the life of your application.

Please, if you have any ideas for an alternative method of injecting clicked link attributes into event functions, comment below.