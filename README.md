# Flex Layout

[![npm version](https://badge.fury.io/js/%40angular%2Fflex-layout.svg)](https://www.npmjs.com/package/%40angular%2Fflex-layout)
[![Build Status](https://travis-ci.org/angular/flex-layout.svg?branch=master)](https://travis-ci.org/angular/flex-layout)
[![Gitter](https://badges.gitter.im/angular/flex-layout.svg)](https://gitter.im/angular/flex-layout))

Angular Flex Layout provides a sophisticated layout API using FlexBox CSS + mediaQuery. 
This module provides Angular (v4.1 and higher) developers with component layout features using a 
custom Layout API, mediaQuery observables,and injected DOM flexbox-2016 css stylings.  

The Layout engine intelligently automates the process of applying appropriate FlexBox CSS to 
browser view hierarchies. This automation also addresses many of the complexities and workarounds 
encountered with the traditional, manual, CSS-only application of Flexbox CSS. 

The **real** power of Flex Layout, however, is its **responsive** engine. The [Responsive API](https://github.com/angular/flex-layout/wiki/API-Overview#responsive-features) 
enables developers to easily specify different layouts, sizing, visibilities for different 
viewport sizes and display devices.

---

#### Deprecated support for Angular 2.4.x

Support for recent changes to Angular v4.1 AOT and Renderers means that Angular 2.4.x will not be supported after Angular Flex-Layout v2.0.0-beta.7. 

----

### Updated CHANGELOG

Please consult our [CHANGELOG](https://github.com/angular/flex-layout-builds/blob/master/CHANGELOG.md) for latest changes and new features.
  
### Why choose Flex-Layout

While other Flexbox CSS libraries are implementations of:

* pure CSS-only implementations, or 
* the JS+CSS Stylesheets implementation of Angular Material v1.x Layouts.

Angular Flex Layout - in contrast - is a pure-Typescript UI Layout engine with an implementation that: 

*  uses HTML attributes (aka Layout API) to specify the layout configurations
*  is currently only available for Angular (v4.1 or higher) Applications.
*  is independent of Angular Material (v1 or v2).
*  requires no external stylesheets.
*  requires Angular v4.1 or higher.

<br/>

### Browser Support

<a href="http://caniuse.com/#feat=flexbox" target="_blank">
<img src="https://cloud.githubusercontent.com/assets/210413/21288118/917e3faa-c440-11e6-9b08-28aff590c7ae.png">
</a>

<br/>
  


### NPM Install (example)

Playing with the latest changes from [master](https://github.com/angular/flex-layout/tree/master) is also possible

`npm install https://github.com/angular/flex-layout-builds.git`

You can easily install from NPM using:

```terminal
npm install @angular/flex-layout -saveDev
```

Next, modify your `app.module.ts` to use the `FlexLayoutModule`:

```js
import { NgModule }         from '@angular/core';
import { BrowserModule }    from '@angular/platform-browser';
import { FlexLayoutModule } from "@angular/flex-layout";

import { DemoApp }          from './demo-app/demo-app';

@NgModule({
  declarations    : [ DemoApp ],
  bootstrap       : [ DemoApp ],
  imports         : [
    BrowserModule,
    FlexLayoutModule
  ]
})
export class DemoAppModule { }
```


### Quick Links

*  [Wiki Docs](https://github.com/angular/flex-layout/wiki)
*  [License: MIT](https://raw.githubusercontent.com/angular/flex-layout-builds/master/LICENSE)

Developers

*  [API Overview](https://github.com/angular/flex-layout/wiki/API-Overview)
*  [Developer Setup](https://github.com/angular/flex-layout/wiki/Developer-Setup)
*  [Builds + Fast Start](https://github.com/angular/flex-layout/wiki/Fast-Starts)
*  [Integration with Angular CLI](https://github.com/angular/flex-layout/wiki/Integration-with-Angular-CLI)

Demos 

*  [Explore Online](https://tburleson-layouts-demos.firebaseapp.com/)
*  [Source Code](https://github.com/angular/flex-layout/blob/master/src/demo-app/app/demo-app-module.ts)

Templates

*  [Plunkr Template](https://plnkr.co/edit/h8hzyoEyqdCXmTBA7DfK?p=preview)


### License

License: MIT

The sources for this package are in the [Flex-Layout](https://github.com/angular/flex-layout) repository. <br/>
Please file issues and pull requests against that repo.


