---
layout: post
title: Understanding and converting to new JSONApi 2.0 in EmberJS
date: '2015-08-10T21:29:25+01:00'
tags: []
---

### Summary

The documentation on how to work with the new JSONApi 2.0 standard required by Ember-data 2.0 is still a bit rusty, and converting all your API's to conform with this new standard might not be an option...

Where I am currently working we have a backend team and a frontend team and asking them to change all the formats whilst beeing in a major rewrite simply isn't cutting it...

Our only option is to make sure that the old format returned from our internal API's is converted to JSONApi 2.0 format in our own EmberJS appllication.

Enter Serializers!

### New custom Serialier

The solution is to use the new hooks described in the blog-post covering Ember Data 1.13.

Below is a rough implementation where the data is converted from the old EmberData format to return the new JSONApi 2.0 format.
The serializer-mixin also has a custom extra-hook in case you'd want to adjust the formatted json even more - in case you have side-loaded data for instance - this function is called **normalizeArrayResponseExtra**.

It's still work in progress so make sure you test it properly before using in a production environment!


The mixin you need, including an example implementation using the **normalizeArrayResponseExtra** method.
<script src="https://gist.github.com/hussfelt/064506796c7e94e85e47.js"></script>