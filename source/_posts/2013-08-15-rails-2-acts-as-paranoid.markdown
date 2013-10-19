---
layout: post
title: "Rails 2 and acts_as_paranoid"
date: 2013-08-15 16:31
comments: true
categories: [Ruby, Rails]
---
Overrides some basic Active Record methods for the current model so that calling #destroy sets a _deleted_at_ field to the current timestamp.

<!-- more -->

## Setup

__Create migration file__

acts_as_paranoid, by default, assumes the table has a _deleted_at_ date/time field.  Most normal model operations will work, but there will be some oddities.

```
$ script/server generate migration deleted_at:datetime
```

And then modify your migration file (app/db/migrations/000000000000_add_deleted_at…rb)to look something like:

``` ruby
class AddDeletedAtToWidgets < ActiveRecord::Migration
  def self.up
    add_column :widgets, :deleted_at, :datetime, :null => true
  end

  def self.down
    remove_column :widgets, :deleted_at
  end
end
```

__Add the gem source to your Gemfile__ (app/Gemfile)

``` ruby
gem 'acts_as_paranoid', :git => 'git://github.com/technoweenie/acts_as_paranoid.git', :branch => 'integration_gem'
```
__Run bundler__

```
$ bundle install
```
__Add the requestor to your model__ (app/models/widgets.rb)

``` ruby
class Widget < ActiveRecord::Base
  acts_as_paranoid
end
```

If you'd like to set a __custom column for acts_as_paranoid__ just use the following options in your class method:

``` ruby
acts_as_paranoid :with => 'destroyed_at'
```

## Use

``` ruby
Widget.find(:all)
# => SELECT * FROM widgets WHERE widgets.deleted_at IS NULL
```

``` ruby
Widget.find(:first, :conditions => ['title = ?', 'test'], :order => 'title')
# => SELECT * FROM widgets WHERE widgets.deleted_at IS NULL AND title = 'test' ORDER BY title LIMIT 1
```

``` ruby
Widget.find_with_deleted(:all)
# => SELECT * FROM widgets
```

``` ruby
Widget.find(:all, :with_deleted => true)
# => SELECT * FROM widgets
```

``` ruby
Widget.find_with_deleted(1).deleted?
# => Returns true if the record was previously destroyed, false if not 
```

``` ruby
Widget.count
# => SELECT COUNT(*) FROM widgets WHERE widgets.deleted_at IS NULL
```

``` ruby
Widget.count ['title = ?', 'test']
# => SELECT COUNT(*) FROM widgets WHERE widgets.deleted_at IS NULL AND title = 'test'
```

``` ruby
Widget.count_with_deleted
# => SELECT COUNT(*) FROM widgets
```

``` ruby
Widget.delete_all
# => UPDATE widgets SET deleted_at = '2013-08-15 13:01:59'
```

``` ruby
Widget.delete_all!
# => DELETE FROM widgets
```

``` ruby
@widget.destroy
# => UPDATE widgets SET deleted_at = '2013-08-15 13:01:59' WHERE id = 1
```

``` ruby
@widget.destroy!
# => DELETE FROM widgets WHERE id = 1
```

``` ruby
@widget.recover!
# => UPDATE widgets SET deleted_at = NULL WHERE id = 1
```