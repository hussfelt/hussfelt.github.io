---
layout: post
title: Understanding EmberJS and JSONApi 2.0
date: '2015-08-10T21:29:25+01:00'
tags: []
---

### Summary

After working too many hours on a solution that was just wrong I finally figured out how to work with the serializers in Ember 1.1.13+.

The below should work for Ember 2.0 as well.

### Solution

What I do below is let Ember do the magic of converting the payload from the old format to the new,
I just use the new hooks defined in the blog-post <a href="http://emberjs.com/blog/2015/06/18/ember-data-1-13-released.html#toc_transition-to-the-new-jsonserializer-and-restserializer-apis">EMBER DATA V1.13 RELEASED</a>.

This should help you if you want to:

* Change the payload and do some magic before hitting the store/model
* Generally modify data returned from all endpoints in your API

<script src="https://gist.github.com/hussfelt/9c9002f15cc253278edb.js"></script>
