---
layout: post
title: "Database Version Control with MySQL Utilities"
date: 2014-04-13 23:30
comments: true
categories: [SQL, MySQL]
---

The following steps are meant to capture a snapshot of your development database structure and your staging/production database structure, compare the two, and provide SQL to consolidate the differences.

<!-- more -->

This article relates to one of many methods for __database version control__ in a singular or team-based environment.

## MySQL Workbench

Having __MySQL Workbench__ is not mandatory for this process. But it's a nice interface to consolidate the suite of tools that __MySQL__ offers.

Download [http://dev.mysql.com/downloads/tools/workbench/](http://dev.mysql.com/downloads/tools/workbench/)

## MySQL Utilities

__MySQL Utilities__ will install the required programs to finish the fowllowing steps.

Download [http://dev.mysql.com/doc/workbench/en/mysql-utilities.html](http://dev.mysql.com/doc/workbench/en/mysql-utilities.html)

## Verify MySQL Utilities

Open __MySQL Workbench__.

Start __MySQL Utilities__ from __MySQL Workbench__.

<img src="http://dev.mysql.com/doc/workbench/en/images/wb-mysql-utilities-open.png" width="100%" />

The available __MySQL Utilities__ programs can be seen in the console output below with the "help" command executed.

```
~$ mysqluc -e "help utilities"
Launching console ...

Utility           Description
----------------  ---------------------------------------------------------
mysqlauditadmin   audit log maintenance utility
mysqlauditgrep    audit log search utility
mysqldbcompare    compare databases for consistency
mysqldbcopy       copy databases from one server to another
mysqldbexport     export metadata and data from databases
mysqldbimport     import metadata and data from files
mysqldiff         compare object definitions among objects where the
                  difference is how db1.obj1 differs from db2.obj2
mysqldiskusage    show disk usage for databases
mysqlfailover     automatic replication health monitoring and failover
mysqlfrm          show CREATE TABLE from .frm files
mysqlindexcheck   check for duplicate or redundant indexes
mysqlmetagrep     search metadata
mysqlprocgrep     search process information
mysqlreplicate    establish replication with a master
mysqlrpladmin     administration utility for MySQL replication
mysqlrplcheck     check replication
mysqlrplshow      show slaves attached to a master
mysqlserverclone  start another instance of a running server
mysqlserverinfo   show server information
mysqluserclone    clone a MySQL user account to one or more new users
```

The same can be done by entering `mysqluc -e "help utilities"` into your console.

If you receive the following error.

```
Traceback (most recent call last):
  File "/bin/mysqluc", line 23, in <module>
  from mysql.utilities.common.options import license_callback, UtilitiesParser
File "/Library/Python/2.7/site-packages/mysql/utilities/common/options.py", line 34, in     <module>
from mysql.connector.conversion import MySQLConverter
ImportError: No module named connector.conversion
```

> __ImportError: No module named connector.conversion__

__MySQL Utilities__ assumes that the __MySQL Connector__ for __Python__ has been installed.

Download it here [http://dev.mysql.com/downloads/connector/python/](http://dev.mysql.com/downloads/connector/python/)

## Compare Databases with mysqldbcompare

Run __mysqldbcompare__.

```
~$ mysqldbcompare --server1=<user>:<password>@<host> --server2=<user>:<password>@localhost dwh_production:dwh_development --run-all-tests --skip-data-check --difftype=sql
# server1 on localhost: ... connected.
# server2 on localhost: ... connected.
# Checking databases dwh_production on server1 and dwh_development on server2
#
```

If you can't connect to your database directly, but can __SSH__ into the platform that the database server is located on, run:

```
~$ ssh -f -N -L 3307:localhost:3306 <user>@<server>
```

Run __mysqldbcompare__.

```
~$ mysqldbcompare --server1=<user>:<password>@localhost:3307 --server2=<user>:<password>@localhost dwh_production:dwh_development --run-all-tests --skip-data-check --difftype=sql
# server1 on localhost: ... connected.
# server2 on localhost: ... connected.
# Checking databases dwh_production on server1 and dwh_development on server2
#
```

__TIP:__ Generate a file with the above output.

```
~$ mysqldbcompare --server1=<database_user>:<database_password>@localhost:3307 --server2=<user>:<password>@localhost dwh_production:dwh_development --run-all-tests --skip-data-check --difftype=sql >> mysqldbcompare.sql
```

Now you have all the SQL to __ALTER__ your production database structure so that it matches up with your development database structure.

## Import

Import database __ALTER__ statements.

```
~$ mysqlimport -u <user> -p<password> dwh_production mysqldbcompare.sql
```

## Verify

Get a __DIFF__ of the two databases.

```
~$ mysqldbcompare --server1=<database_user>:<database_password>@localhost:3307 --server2=<user>:<password>@localhost dwh_production:dwh_development --run-all-tests --skip-data-check
```

## Resources

* [http://dev.mysql.com/doc/mysql-utilities/1.3/en/mysqldbcompare.html](http://dev.mysql.com/doc/mysql-utilities/1.3/en/mysqldbcompare.html)
