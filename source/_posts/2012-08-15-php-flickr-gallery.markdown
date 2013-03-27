---
layout: post
title: "PHP Flickr Gallery"
author: '<a href="/" target="_blank" alt="Homepage" title="Michael Minter">Michael Minter</a>'
date: 2010-03-24 15:23
comments: true
categories: [PHP, API]
---

In my search for finding a simple solution to any problem, I usually cross many and many blogs and articles, discussing whatever topic. But with so much detail that the solution becomes a problem in itself. So I often times end up resolved to research on my own. In this case, I share the simplest programming method for displaying a [Flickr](http://flickr.com "Flickr") gallery, with PHP.

<!--more-->

##Assembling Your Variables

``` perl
$api_key  = 'cr79h3t7g387ghc3fh7338ch87c3ch734';
$user_id  = '33822702%40N08';
$per_page = 10;

$xml      = 'http://api.flickr.com/services/rest/?method=flickr.people.getPublicPhotos&api_key='.$api_key.'&user_id='.$user_id.'&per_page='.$per_page;

$flickr   = simplexml_load_file($xml);
foreach($flickr->photos->photo as $p) {
    echo '<a href="http://www.flickr.com/photos/'.$p['owner'].'/'.$p['id'].'">';
    echo '<img src="http://farm'.$p['farm'].'.static.flickr.com/'.$p['server'].'/'.$p['id'].'_'.$p['secret'].'_s.jpg">';
    echo '</a>';
}
```

**$api_key** is part of an authentication device that allows your server and Flickr to “shake hands” sort of speak. [You can get your Flickr API key here](http://www.flickr.com/services/api/keys/ "Flickr API Key").

**$user_id** is how Flickr identifies you. This value can be found in the URL of your Flickr “photostream”. [Here's mine for reference](http://www.flickr.com/photos/33822702@N08/ "Michael Minter's Flickr").

**$per_page** refers to how many photos will be retrieved from your photostream. Though this limiter is optional, the default count is, “all”. Which means if you have 1,000 plus photos, it could be a very bad thing, for your viewer’s browser load time.

**$xml** is a link to the webfile that renders a list of your available photos based on previously noted variables. This line can be modified later to include even more search parameters. (see: below)

**$flickr** uses a PHP function called, [simplexml_load_file()](http://php.net/manual/en/function.simplexml-load-file.php "simplexml_load_file function"), which parses an XML file into an object.

In today's lesson, **$flickr** becomes an array and we use [foreach()](http://us2.php.net/manual/en/control-structures.foreach.php "foreach function") to extract the values we need, to display the gallery.

##Summary

This method is just what I needed. Something small, easily accessible, and scalable. As you experiment with this script, you’ll be afforded the opportunity to use many different features of the API, which Flickr offers. [Click here to view a full list.](http://www.flickr.com/services/api/ "Flickr API Index")
