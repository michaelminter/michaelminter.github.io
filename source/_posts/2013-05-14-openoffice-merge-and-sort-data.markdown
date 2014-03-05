---
layout: post
title: "OpenOffice: Merge and Sort Data"
date: 2013-05-14 22:55
comments: true
categories: [data]
---

You need to __construct an array using a list of pre-existing values__ but firstly have to __sort the order__ of that list.

<!--more-->

There are plenty of alternatives but I enjoy using <a href="http://www.openoffice.org/" target="_blank" title="OpenOffice"><strong>OpenOffice</strong></a> for these simple string inclusions.

OpenOffice is __open source__ and available for use on __all major operating systems__.

<!--## Let's Get Started-->

### Collect Data

Copy your list of values.

Select the top cell in the column you want your list to reside.

_When you paste the values in OpenOffice, as long as they're separated by a line break, OpenOffice will automatically separate each value into a new row of whichever column you've designated._

### Sort

Sort the list by hilighting the data and perform the following:

`Data > Sort > Options`

Unselect the checkbox labeled "_Range contains column labels._"

Click `OK`

_This option prevents column headers from being sorted with the rest of the data. Since we don't have any column headers, like in a CSV file, we need to deactivate this feature._

<img src="/images/posts/openoffice-1.jpg" alt="OpenOffice" width="100%" />

### Prepare

Create the prepending or appending content at the top of the column to the left or right of the working list.

Point your cursor to the bottom-right corner of the cell you just filled, hold down your left mouse button, and move downwards to the bottom of the working column.

_This action will copy the active cell to all of the other cells touched by your hover action. Do this over again for further columns._

### Merge

Use the following Calc function in the column that you want the new data to be returned.

> <a href="http://wiki.openoffice.org/wiki/Documentation/How_Tos/Calc:_CONCATENATE_function" target="_blank" alt="CONCATENATE Documentation"><strong>Concatenate</strong></a>: Combines several text strings into one string.

```
=CONCATENATE( A1; ":"; B1; ":"; C1 )
```

or you can use the simple version:

```
= A1 & ":" & B1 & ":" & C1
```

<img src="/images/posts/openoffice-2.jpg" alt="OpenOffice" width="100%" />

Where cell __A1__ contains `"`, cell __B1__ contains `actionmailer`, and cell __C1__ contains `",` returns `"actionamailer",`.

Hit `return`

Just like when you copied the prep data, grab the bottom-right corner of the working cell and drag it directly down to the target end point.

_This will copy the concatenation function across all of the modified cells. So if you change a value in another column, from its row, OpenOffice will generate new content for the concatenated cell._

Your column is now ready for inclusion in production-ready code. Just highlight the readied cells, copy, and paste into your program editor of choice.

### Further Reading

When you paste the new column into your text editor you might notice special quotes that OpenOffice magicly replaces upon creation. You can disable the automatic conversion of ASCII "straight" quotes into typographic “curly” quotes by going to:

`Tools > AutoCorrect Options > Localized Options`

Scan down to the container marked "Double Quotes" and make sure the checkbox labeled "Replace" is unchecked.

Click `OK`

<img src="/images/posts/openoffice-3.jpg" alt="OpenOffice" width="100%" />
