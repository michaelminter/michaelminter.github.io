---
layout: post
title: "Server vs Client"
author: '<a href="/" target="_blank" alt="Homepage" title="Michael Minter">Michael Minter</a>'
date: 2010-03-25 21:11
comments: true
categories: ['Javascript', 'PHP', 'Ruby']
---

My presumption is that it’s because of the passionate advent of JQuery, that there has been an increasing rise of using Javascript, in precedence of a server side language like PHP or Ruby. This circumstance is arguably the sole cause to how and why, _mostly designers_, are simply not learning a better way. I’m here to enlighten you.

<!--more-->

<a href="/images/posts/versus.jpg"><img src="/images/posts/versus.jpg" alt="Versus" width="100%" /></a>

In opening, I’d like to express, that I hold no animosity for Javascript. Actually I quite often fancy a touch of its elegant lure and almost regularly indulge my viewers with its properties to control aesthetics at a dynamic fashion. But it has its place. If PHP can serve the same purpose, than its obvious strengths, should not be taken for granted.

One prominent example of this that I seem to notice more often in use than others, is the  application of color alternating rows with HTML tables, or also favorably known as the “zebra” effect. Which I’ll be using for my reference material.

##PHP

``` perl
for ($i = 1;$i < 10;$i++) {
    if (($i % 2) == 0) {
        echo '<tr class="zebra">';
    } else {
        echo '<tr>';
    }
}
```

The for() loop, does the accumulating work. It exponentially raises the default value ($i) by one, each iteration, so that the modulus operator (%) can equate the remainder of $i divided by two. So every instance of an even number represented by $i would evaluate to zero.

##Ruby on Rails

``` ruby
<% @items.each do |item| %>
  <tr class="<%= cycle("even", "odd") %>">
    <!-- use item -->
  </tr>
<% end %>
```

##JQuery

``` perl
$(document).ready(function(){
    $("tr:even").css("background-color", "#EFEFEF");
    $("tr:odd").css("background-color", "#FFFFFF");
});
```

The JQuery even and odd filters are used as index selectors. This method can be used on any page element with just a little bit of reverse engineering.

##Discovering the Front-End

If you were to analyze the speed of using only Javascript, you would find that it is 16% slower, compared to PHP [1]. Though that number might seem relatively low in scale, because it is, consider all of the other factors when developing for the web.

80% of the average user’s response time is spent on the front-end [2]. This time, is composed of downloading all of the elements necessary to make up the page (Images, libraries, scripts, stylesheets and more). Reducing the number of elements, in turn, reduces the number of HTTP requests required to render the page.

With PHP everything is rendered before any HTTP requests are sent by the server.

<img src="https://chart.googleapis.com/chart?cht=bvs&chs=714x100&chd=t:13,20|87,80&chco=4d89f9,c6d9fd&chbh=20&chds=0,160" style="float:left;" />
<br style="clear:both;" />

Graphically interpreted above are the details associated with load times. This analysis completes the HTTP request cycle from initialization. The darker portion, of each representation, shows the percentage of work involved by the server. As consistency shows, a lot of web design and development, relies mostly on what’s being delivered to the browser.

_in order of appearance: Google, PHP Rockstar_

##Summary

It’s certain that a professional web server is going to best the average home network set-up, in performance, any day. It’s your responsibility to take advantage of that, by running some server-side code, to save your guests the frustration of dealing with an idle load time.

##References

[1] http://www.timestretch.com/FractalBenchmark.html  
[2] http://developer.yahoo.net/blog/archives/2007/03/high_performanc.html