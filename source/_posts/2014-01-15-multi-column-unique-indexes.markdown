---
layout: post
title: "Multi Column Unique Indexes"
date: 2014-01-15 13:45
comments: true
categories: [SQL]
---

When a database key is created from a combination of two or more columns, the key is called a __composite key__. Each column may not be unique by itself within the database table but when combined with the other column(s) in the composite key, the combination is unique.

<!-- more -->

The following data is taken from the __Google DFP Report API__ example source code.

``` sql
CREATE TABLE `src_dfp` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `ad_unit_1` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `ad_unit_2` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `ad_unit_id_1` int(11) DEFAULT NULL,
  `ad_unit_id_2` int(11) DEFAULT NULL,
  `advertiser_id` int(11) DEFAULT NULL,
  `advertiser_name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `creative_id` bigint(11) DEFAULT NULL,
  `creative_name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `date` date DEFAULT NULL,
  `line_item_cost_per_unit` int(11) DEFAULT NULL,
  `line_item_cost_type` varchar(11) COLLATE utf8_unicode_ci DEFAULT NULL,
  `line_item_end_date_time` datetime DEFAULT NULL,
  `line_item_id` int(11) DEFAULT NULL,
  `line_item_name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `line_item_start_date_time` datetime DEFAULT NULL,
  `line_item_type` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `merged_ad_server_clicks` int(11) DEFAULT NULL,
  `merged_ad_server_impressions` int(11) DEFAULT NULL,
  `order_end_date_time` datetime DEFAULT NULL,
  `order_id` int(11) DEFAULT NULL,
  `order_name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `order_start_date_time` datetime DEFAULT NULL,
  `created_at` datetime DEFAULT NOW(),
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `composite_dfp` (`date`,`ad_unit_id_1`,`ad_unit_id_2`,`advertiser_id`,`creative_id`,`line_item_id`,`order_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
```

Or to modify an existing table:

``` sql
ALTER TABLE src_dfp ADD UNIQUE index composite_dfp (date, ad_unit_id_1, ad_unit_id_2, advertiser_id, creative_id, line_item_id, order_id);
```

<p></p>

Which will generate these keys:

``` bash
+------------+---------------+-------------------+---------------+-----------+-------------+----------+--------+
| Non Unique |   Key Name    | Sequence in Index |  Column Name  | Collation | Cardinality | Sub Part | Packed |
+------------+---------------+-------------------+---------------+-----------+-------------+----------+--------+
|          0 | PRIMARY       |                 1 | id            | A         |           0 | NULL     | NULL   |
|          0 | composite_dfp |                 1 | date          | A         |           1 | NULL     | NULL   |
|          0 | composite_dfp |                 2 | ad_unit_id_1  | A         |           2 | NULL     | NULL   |
|          0 | composite_dfp |                 3 | ad_unit_id_2  | A         |           3 | NULL     | NULL   |
|          0 | composite_dfp |                 4 | advertiser_id | A         |           4 | NULL     | NULL   |
|          0 | composite_dfp |                 5 | creative_id   | A         |           5 | NULL     | NULL   |
|          0 | composite_dfp |                 6 | line_item_id  | A         |           6 | NULL     | NULL   |
|          0 | composite_dfp |                 7 | order_id      | A         |           7 | NULL     | NULL   |
+------------+---------------+-------------------+---------------+-----------+-------------+----------+--------+
```

_Don't let the color highlighting above fool you. __date__ is another column in the table._

Now, if you try to rerun the same import against existing data, you'll receive the following error message: `Duplicate entry '2014-01-14-83243539-236269939-15980539-32298017059-67086499-1643' for key 'composite_dfp'`

A __UNIQUE__ index creates a constraint such that all values in the index must be distinct. An error occurs if you try to add a new row with a key value that matches an existing row. This constraint does not apply to NULL values __except for the BDB storage engine__. For other engines, a UNIQUE index allows multiple NULL values for columns that can contain NULL. [Document Source][1]

## MySQL Workbench

__1.__ Go to the edit window for the table you're working on

<img src="/images/posts/mysql-workbench.jpg" alt="MySQL Workbench" width="100%" />

__2.__ Add a new index in the far-left screen by clicking on the new index row and giving the new index a name<br />
__3.__ Select the __UNIQUE__ type<br />
__4.__ Check all of the corresponding index columns to the right



[1]: http://dev.mysql.com/doc/refman/5.0/en/create-index.html
