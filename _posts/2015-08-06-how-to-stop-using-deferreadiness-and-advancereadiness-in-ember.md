---
layout: post
title: How to stop using deferReadiness and advanceReadiness in Ember
date: '2015-08-06T20:29:25+01:00'
tags: []
---

### Summary

Several times I have read comments from @tomdale trying to explain to people why one should avoud deferReadiness of the application inside initializers of an application. I did use it until just a couple of days ago when I finally understood how to implement at better way of reaching a set application state before showing our application to the customer.

### Problem

When building a single-page application and it’s loaded for the users you most probably want to do stuff before actually serving the application to the user. This could be things like:

* Setting up a websocket
* Authenticating the user
* Preloading a set of data

Your first bet would be to ask yourself the question “How do I stop loading the application until I do X?” and after that you find the deferReadiness and advanceReadiness. It does not take that long until you actually implement an initializer with the above functionality in something like this:

{% highlight javascript %}
/**
Session Service Initializer
@class initializers.sessionService
@extends Ember.Initializer
*/


export function initialize(container, application) {
    // Wait until all of the following promises are resolved
    application.deferReadiness();

    // Get session-service
    var session = container.lookup('service:session');

    // Find the current customer, use promise to reflect to other controllers
    if (session.hasSession()) {

        // Get the store
        var store = container.lookup('store:main');

        // Fetch the user
        store.find('Customer', session.get('userId')).then(function(customer) {
            // Set customer to application controller
            session.set('user', customer);

            // preload the application
            session.preloadApplication();

            // Continue the Application boot process, allowing other Initializers to run
            application.advanceReadiness();
        }, function() {
            // Kill sesion object
            session.set('user', '');
            session.set('authToken', '');

            // Continue the Application boot process, allowing other Initializers to run
            application.advanceReadiness();
        });
	} else {
        // Continue the Application boot process, allowing other Initializers to run
        application.advanceReadiness();
    }
}
{% endhighlight %} 

Yaay! Success! Problem is if you ever forget to advanceReadiness, if you do it more than once or if your application breaks somewhere in between - which will lead to very unexpected behaviors. @tomdale wrote “asynchronous instance initializers are a very bad idea (because they don't participate in the router promise chain) “ which makes a valid point.

So how do you solve this issue?

Use the beforeModel() hook in the route, with a returned promise on all the things you want to preload!

First I moved the setups I wanted into my service, returning a promise.

{% highlight javascript %}
import Ember from 'ember';

export default Ember.Service.extend({

    /**
     * This is run from the route after the applciation has loaded
     * @return {[type]} [description]
     */
    setup: function() {
        return new Ember.RSVP.Promise(function(resolve, reject) {
            // Do something that either resolves or reject
            if (true) {
                resolve();
            } else {
                reject();
            }
        });
    }
});


import Ember from 'ember';

export default Ember.Service.extend({

    /**
     * This is run from the route after the applciation has loaded
     * @return {[type]} [description]
     */
    setup: function() {
        return new Ember.RSVP.Promise(function(resolve, reject) {
            // Do something that either resolves or reject
            if (true) {
                resolve();
            } else {
                reject();
            }
        });
    }
});
{% endhighlight %} 

Then I simply made sure that these where triggered in my application beforeModel.

{% highlight javascript %}
import Ember from 'ember';

export default Ember.Route.extend({
    /**
     * Before anything proceeds in the application, resolve these promises
     * @return {[type]} [description]
     */
    beforeModel: function() {
        return Ember.RSVP.all([this.get('sessionService').setup(), this.get('cordovaService').setup()]);
    },
{% endhighlight %} 

This way your application will always load and your application-template will render letting your users see something else but a blank broken page, and still preload the things you need done before your model is triggered.