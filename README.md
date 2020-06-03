# Coding Exercise 

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) for simplicity.
To run the project, you can use `yarn start`.

## General approach

Uses MaterialUI so I didn't need to write a bunch of arbitrary components.

Uses a very basic ServiceWorker with a 
[Cache-Network-fallback strategy](https://developers.google.com/web/fundamentals/instant-and-offline/offline-cookbook#cache-falling-back-to-network) 
for both Assets and API content. 

## Improvements

The app is not currently isomorphic, that is, server-side rendering is not used.

Deployment build / pipeline.

Browser-driven tests (Selenium, Cypress, etc.)

The service worker strategy is little clunky; if a customer is reading a product description, and an updated description
comes through after, content might be updated. Work out a better way of handling this.

i18n (Language picker, etc -- code is mostly in place to handle this already)

Config could be created at runtime based on various environments.

It seems like GraphQL would be a great fit here -- the API is quite dense.

Navigation -- you can't get back without using the browser navigation buttons :)

I'd probably spend a little longer to improve the look and feel of the Product Detail page

## General Observations

I was initially going with a very basic bare-bones approach for a website. Once I'd called the API and seen some of the
available fields, I realised that it should be a bit flashier.

I was treating the exercise as 'build a website' -- I then transitioned to thinking of it as an app, rather than a site.

I spent a while trying out lots of different carousels - I wasn't happy with any, so built one. It could be better, but
I'm actually pretty happy with it, given how long I spent on it :)

I'd probably have 5 tiles on the desktop carousel; I've done 4 just to show the carousel-ness of it.

The app depends on there being sufficient contrast between the accent, background and text colours.

IRL, the primary CTA would be to purchase a product. In the absence of an ordering flow, I've made the CTA the 'Details'
page.

I'm not mad keen on the ProductRow styling. I'd probably revisit this.

I've gone with a couple of different approaches; one is to just pass Props between components. The other is to pass
an ID (e.g. Product ID on Detail Page + Product Detail Heading), and used a Memoized API request to let the component
fetch data itself. I've avoided bringing in a store to keep it simple.

In practice, I'd carefully consider whether or not to have the fallback for "Fetch Price from Product Details if it's 
not present in the Product List". This is more suited to a backend fix, IMO.

I don't use `@testing-library/react` day-to-day, so I'm not too confident in the tests, but I'm short on time, so wanted
to get something quick and easy in. In pratice, I favour snapshot tests for component tests, and E2E (Cypress) tests.
I usually reserve Unit Tests for testing specific logic-heavy functions.