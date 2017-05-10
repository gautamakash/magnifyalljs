/*
MIT License

Copyright (c) 2017 Akash Gautam

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

var Route=function(a){this.name=a.name;this.obj=a.obj;this.onEnter=a.onEnter;this.onLeave=a.onLeave},Router=function(a){var b=this;this.id=a.id;this.routes={};var c=!1,d=!1;a.debug;if(a.routes)for(var e=0;e<a.routes.length;e++){var f=a.routes[e];this.routes[f.name]=f}this.addRoute=function(a){this.routes[a.name]=a};this.bindElement=a.bindElement||!1;this.bind=function(a){this.bindElement=a||this.bindElement};var g=function(a){if(a){b.currentRoute=c.name;d=c;c=!1;d.obj.__render(b.bindElement)}},h=function(a){a&&(c&&c.onEnter?c.onEnter(d,c,g):g(!0))};this.loadRoute=function(a){if(b.routes[a]&&b.bindElement){c=b.routes[a];d&&d.onLeave?d.onLeave(d,c,h):h(!0)}};if(a.defaultRoute){this.loadRoute(a.defaultRoute);this.currentRoute=a.defaultRoute;this.currentRoute&&(d=this.routes[this.currentRoute]||!1)}};
//# sourceMappingURL=router.js.map