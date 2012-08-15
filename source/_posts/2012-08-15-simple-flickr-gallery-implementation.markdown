---
layout: post
title: "Simple Flickr Gallery Implementation"
author: '<a href="http://github.com/michaelminter" target="_blank" class="github_link">Michael Minter</a>'
date: 2010-03-24 15:23
comments: true
categories: [PHP, API]
---

In my search for finding a simple solution to any problem, I usually cross many and many blogs and articles, discussing my queried topic. But with so much detail that the solution becomes a problem in itself. So I often times end up resolved to research on my own. In this case, I share how to build the most simple method of displaying a Flickr gallery, with PHP.
Assembling Your Variables

``` ruby
$api      = 'your-32-byte-api-key-courtesy-Flickr';
$user_id  = '33822702%40N08';
$per_page = 10;

$xml = 'http://api.flickr.com/services/rest/?method=flickr.people.getPublicPhotos&api_key='.$api.'&user_id='.$user_id.'&per_page='.$per_page;

$flickr = simplexml_load_file($xml);
foreach($flickr->photos->photo as $p) {
    echo '<a href="http://www.flickr.com/photos/'.$p['owner'].'/'.$p['id'].'">';
    echo '<img src="http://farm'.$p['farm'].'.static.flickr.com/'.$p['server'].'/'.$p['id'].'_'.$p['secret'].'_s.jpg">';
    echo '</a>';
}
```

The $api key allows your server and Flickr to “shake hands” sort of speak. You can get your Flickr API key here.

Your $user_id is a static variable that Flickr uses to identify you. This value can be found in the URL of your “photostream”. I’ve left mine for reference (flickr.com).

$per_page refers to how many photos will be retrieved from your photostream. Though this limiter is optional, the default count is, “all”. Which means if you have 1,000 plus photos, it could be a very bad thing, for you or your viewer’s load time.

$xml stores the link, that gets called on to retrieve a list of your photos, as XML. This will also be a part of the script you modify to extend the features of your application based on what’s available in the Flickr API.

$flickr uses a PHP function called, simplexml_load_file(), which interprets an XML file into an object. In this case, $flickr, becomes an array, and we use foreach() to extract the values we need, to display the gallery.

##Summary

This method is just what I needed. Something small, easily accessible, and scalable. As you experiment with this script, you’ll afford the opportunity to use many tools, which Flickr offers. You can view a full list here if or when you’re ready.