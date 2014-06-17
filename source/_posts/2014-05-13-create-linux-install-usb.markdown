---
layout: post
title: "Create Linux Install USB on Mac"
date: 2014-05-13 11:14
comments: true
categories: [linux]
---

Create a bootable USB drive, for installing Linux, on your Mac.

<!-- more -->

Picking a Linux distro is like picking your favorite flavor of ice cream. 

Find an awesome Linux distribution here [distrowatch.com](http://distrowatch.com)

## Prepare

Convert the .iso file to .img using the convert option of hdiutil

```
hdiutil convert -format UDRW -o ~/path/to/target.img ~/path/to/ubuntu.iso
```

__Note:__ OS X tends to put the .dmg ending on the output file automatically.

Remove the USB drive from your machine if it's currently inserted.

Run `diskutil list` to get the current list of devices.

```
diskutil list
```

Insert your flash drive.

Run `diskutil list` again to determine the device node assigned to your flash media (e.g. /dev/disk1).

```
diskutil list
```

_insert example output_

```
diskutil unmountDisk /dev/diskN
```

Replace _N_ with the disk number from the last command; in the previous example, _N_ would be 1.

```
sudo dd if=/path/to/downloaded.img of=/dev/rdiskN bs=1m
```

Execute sudo dd if=/path/to/downloaded.img of=/dev/rdiskN bs=1m (replace /path/to/downloaded.img with the path where the image file is located; for example, ./ubuntu.imgor ./ubuntu.dmg).

* Using /dev/rdisk instead of /dev/disk may be faster
* If you see the error dd: Invalid number '1m', you are using GNU dd. Use the same command but replace bs=1m with bs=1M
* If you see the error dd: /dev/diskN: Resource busy, make sure the disk is not in use. Start the 'Disk Utility.app' and unmount (don't eject) the drive

```
diskutil eject /dev/diskN
```

and remove your flash media when the command completes.

## Install

Restart your computer and press alt/option key while the Mac is restarting to choose the USB drive.
