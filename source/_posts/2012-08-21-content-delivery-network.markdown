---
layout: post
title: "Dynamically Render Images with PHP"
date: 2010-04-22 10:48
author: '<a href="/" target="_blank" alt="Homepage" title="Michael Minter">Michael Minter</a>'
comments: true
categories: [PHP]
---

If you’ve been frustrated with having to resize images for the sake of continuity or load time and don’t want to develop an entire caching system than this post will be of great value to you.

<!--more-->

Today I will discusses the theory and resolve of applying a system to autonomously resize images, with the GD library for PHP, before they get requested by the browser.

This practice presents many benefits to its use.

* Save loads of hard drive space
* Easy to resize div backgrounds
* Faster to call than the use of [JavaScript](/blog/server-vs-client).

<br style="clear:both;" />

##Calling the Application With HTML

``` html
<img src="image.php?i=image.jpg&s=500" />
```

Calling the php script is this easy. You can place this tag anywhere on any page and be able to display an image, with exact value constraints, and as many times as you need.

##Developing the image.php Application

``` perl
header("Content-Type: image/jpeg");
```

header() will make sure that the browser is aware how to handle the applicaton. Here it enables the page to be viewed as a jpeg source.

``` perl
if (!isset($_GET['s'])) {
    $size = 160;
} else {
    $size = $_GET['s'];
}
$image = $_GET['i'];

list($width, $height) = getimagesize($image);

$ratio = $width/$height;

if ($ratio > 1) {
    $newWidth  = $size;
    $newHeight = $size/$ratio;
} else {
    $newHeight = $size;
    $newWidth  = $size*$ratio;
}
# creates a copy of the loaded image
$create = imagecreatefromjpeg($image);
# creates a blank template to work from
$template = imagecreatetruecolor($newWidth,$newHeight);
# copies the original onto the new template
imagecopyresized($template, $create, 0, 0, 0, 0, $newWidth, $newHeight, $width, $height);
# displays the image
ImageJpeg($template);
```

Usually I break this larger portion of my post up into smaller pieces so I can reference all the code being used and what it does. But the fundamentals are so well noted and easy to navigate, that I figured even if I left it as so, that you should have no problem implementing this into your own work.

##Error catching

If source material is not working properly. Issue the following:

``` perl
if(!function_exists('imagecreatetruecolor')) {
    exit('Err, function : imagecreatetruecolor does not exist');
}
```

function_exists() will check the currently active Apache function repository, both internal and user-defined, to see if the listed function matches anything available.

If you’re receiving the error message than the server you’re running this code on does not support the GD library and you must either set it up manually or contact an administrator to do so for you.

Also note that only Jpeg formats are acceptable by this set up. Extending is not a difficult task. I only wanted you to understand the basics and be able to evolve with PHP from my writings.

##Summary

Hopefully I’ve left more than enough room for you to adapt this into your own projects. You can add on to this with many of the GD library features documented by the PHP network.

If you develop an extension or even a class, from these tips, please feel free to share by commenting back and letting me know what you’ve done.
