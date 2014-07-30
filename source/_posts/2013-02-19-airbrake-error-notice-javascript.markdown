---
layout: post
title: "Airbrake: Send Error Notices using Javascript"
date: 2013-02-19 12:46
comments: true
categories: ['Javascript','Airbrake','Ruby','Rails','Sinatra']
---
Right now you may be saying to yourself, "but why not just use an AJAX request inside of my Javascript application or use the Image().src hack..."

<!--more-->

Well they don't work across all medias.

You cannot issue requests through the XMLHttpRequest to other domains or subdomains. If you are issuing the request from www.foo.com you also need to target the request at www.foo.com and make certain to remember the www.

If you really need to hit another domain you can use <a href="http://en.wikipedia.org/wiki/JSONP" target="_blank">JsonP</a> where the browser utilizes the `<script>` tags ability to load scripts from a different domain. The loaded script then executes a callback function to give you the data. But for regular AJAX calls you cannot leave the source domain at all.

See the Wiki article on <a href="http://en.wikipedia.org/wiki/Same_origin_policy" target="_blank">Same Origin Policy</a>

In your Rails/Sinatra application controller file:

``` javascript
notice = params[:notice]
url    = URI.parse('http://api.airbrake.io/notifier_api/v2/notices')

request              = Net::HTTP::Post.new(url.path)
request.content_type = 'text/xml'
request.body         = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>
                      <notice version=\"2.3\">
                        <api-key>948fhc4h9f98f190a4d69fee945d8b133cc11</api-key>
                        <notifier>
                          <name>Airbrake Notifier</name>
                          <version>3.1.6</version>
                          <url>http://api.airbrake.io</url>
                        </notifier>
                        <error>
                          <class>RuntimeError</class>
                          <message>#{notice}</message>
                          <backtrace>
                            <line method=\"public\" file=\"/testapp/app/models/user.rb\" number=\"53\"/>
                            <line method=\"index\" file=\"/testapp/app/controllers/users_controller.rb\" number=\"14\"/>
                          </backtrace>
                        </error>
                        <request>
                          <url>#{request.url}</url>
                          <component/>
                          <action/>
                          <cgi-data>
                            <var key=\"SERVER_NAME\">example.org</var>
                            <var key=\"HTTP_USER_AGENT\">Mozilla</var>
                          </cgi-data>
                        </request>
                        <server-environment>
                          <project-root>/testapp</project-root>
                          <environment-name>production</environment-name>
                          <app-version>1.0.0</app-version>
                        </server-environment>
                      </notice>"
response = Net::HTTP.start(url.host, url.port) {|http| http.request(request)}
```

In your javascript:

``` javascript
function airbrake(notice){
  var airbrake = $.ajax({ url: '/api/v1/error', context: document.body, cache: false, type: 'POST', data: { notice: notice } });
}
```

To call this function, simply:

``` javascript
airbrake ("This goose won't cook.");
```

Some alternative error/message handlers include: <a href="http://loggly.com" target="_blank">Loggly</a>, <a href="https://papertrailapp.com/" target="_blank">Papertrail</a>, <a href="https://logentries.com/" target="_blank">Log Entries</a>, or better yet create your own with <a href="https://github.com/flyingmachine/whoops" target="_blank">Whoops</a> which later I'd like to research and develop upon for my own error catching application.
