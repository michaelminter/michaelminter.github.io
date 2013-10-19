---
layout: post
title: "Send Text Message Through Email"
date: 2013-03-27 17:20
comments: true
categories: [Text Messaging, Email, API]
---

If you'd like to send a TXT message through email rather than use a SaaS application, such as <a href="http://twilio.com" target="_blank" alt="Twilio" title="Twilio">Twilio</a>, you can send SMS messages through SMTP.

<!--more-->

Below is a list of some common gateway email handlers to turn emails into TXTs. Just switch out the default phone number for the one you want to communicate with:

__AT&T__  
1234567890@txt.att.net

__Metro PCS__  
1234567890@mymetropcs.com

__T-Mobile__  
1234567890@tmomail.net

__U.S. Cellular__  
1234567890@email.uscc.net

__Cricket Wireless__  
1234567890@sms.mycricket.com

__Sprint__  
1234567890@messaging.sprintpcs.com

__TracFone__  
1234567890@mmst5.tracfone.com

__Verizon__  
1234567890@vtext.com

_If you know any handlers I haven't included, please leave a note in the comments section below, and I'll update the above list as soon as possible. Thanks_

Some caveats to this transaction method:

* All mobile carriers format the message to their own liking. Some just include the sender's email address, while other carriers will return the entire email header (which can be quite costly to small viewing areas.) 
* You'll have to know which subscriber your target is using. But use a service like <a href="http://twilio.com" target="_blank" alt="Twilio" title="Twilio" style="color:red;">Twilio</a> and you don't need to know how you're sending the message &mdash; Just so long as you use a valid phone number.

&nbsp;

## Twilio

<img src="/images/posts/twilio.jpg" alt="Twilio Logo" title="Twilio Logo" />

Try out <a href="http://twilio.com" target="_blank" alt="Twilio" title="Twilio" style="color:red;">Twilio</a>. They offer a <a href="http://twilio.com" target="_blank" alt="Twilio Free Plan" title="Twilio Free Plan" style="color:red;font-weight:bold;">free plan</a> that includes 200 messages to send each month and maintains a series of APIs that are <a href="http://www.twilio.com/blog/2012/02/adding-twilio-sms-messaging-to-your-rails-app.html" target="_blank" alt="Adding Twilio SMS Messaging to your Rails App" title="Adding Twilio SMS Messaging to your Rails App">easy to use</a> and <a href="https://github.com/twilio" target="_blank" alt="Twilio Github" title="Github Twilio">open source</a>.