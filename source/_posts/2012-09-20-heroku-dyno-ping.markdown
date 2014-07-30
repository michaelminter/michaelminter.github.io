---
layout: post
title: "Keeping Your Heroku Dyno Awake"
author: '<a href="/" target="_blank" alt="Homepage" title="Michael Minter">Michael Minter</a>'
date: 2012-09-20 16:23
comments: true
categories: [API]
---

Apps that have scaled the number of web dynos (dynos running the web process type) so that only a single web dyno is running, will have that web dyno idled out after one hour of inactivity. When this happens, you’ll see the following in your logs:

<!--more-->

    2011-05-30T19:11:09+00:00 heroku[web.1]: Idling
    2011-05-30T19:11:17+00:00 heroku[web.1]: Stopping process with SIGTERM

When you access the app in your web browser or by some other means of sending an HTTP request, the routing mesh will signal the dyno manifold to unidle (or "wake up") your dyno to run the web process type:

    2011-05-30T22:17:43+00:00 heroku[web.1]: Unidling
    2011-05-30T22:17:43+00:00 heroku[web.1]: State changed from created to starting

This causes a few second delay for this first request. Subsequent requests will perform normally.

*Apps that have more than 1 web dyno running are never idled out. Workers dynos are never idled out.*

##The Good News
Overcome this nuisance by touching the site at least every hour so that the dyno doesn't have time to begin idling.

<img src="/images/posts/console_ping.png" alt="console preview" style="width:100%;" />

You can sign up for a service provider, **free** at <a href="http://pingdom.com" target="_blank" style="font-weight:bold;">Pingdom</a>, that will ping your application at designated intervals.

**Ping** is a network protocol that sends ICMP *echo request* packets to the target host and waits for a response.

<a href="http://pingdom.com" target="_blank"><img src="/images/posts/pingdom_dashboard.png" alt="Pingdom" style="width:100%;" /></a>

<a href="http://pingdom.com" target="_blank" style="font-weight:bold;">Pingdom</a> is loaded with features; including availability to a public page to view when the last time your host was checked, alerts via email or SMS, and many other features.

<a href="http://pingdom.com" target="_blank"><img src="/images/posts/pingdom_public.png" style="border:none;width:100%;" alt="Pingdom" /></a>

I chose to sample <a href="http://pingdom.com" target="_blank" style="font-weight:bold;">Pingdom</a> because it affords the least amount of work in setting up at a free price. Please post any alternatives you can think of in the comments below.
