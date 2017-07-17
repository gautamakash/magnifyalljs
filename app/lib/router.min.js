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

var Route=function(t){this.name=t.name;this.obj=t.obj;this.onEnter=t.onEnter;this.onLeave=t.onLeave},Router=function(t){var e=this;this.id=t.id;this.routes={};var n=!1,o=!1;t.debug;if(t.routes)for(var i=0;i<t.routes.length;i++){var u=t.routes[i];this.routes[u.name]=u}this.addRoute=function(t){this.routes[t.name]=t};this.bindElement=t.bindElement||!1;this.bind=function(t){this.bindElement=t||this.bindElement};var r=function(t){if(t){e.currentRoute=n.name;o=n;n=!1;o.obj.__render(e.bindElement)}},s=function(t){t&&(n&&n.onEnter?n.onEnter(o,n,r):r(!0))};this.loadRoute=function(t){if(e.routes[t]&&e.bindElement){n=e.routes[t];o&&o.onLeave?o.onLeave(o,n,s):s(!0)}};if(t.defaultRoute){this.loadRoute(t.defaultRoute);this.currentRoute=t.defaultRoute;this.currentRoute&&(o=this.routes[this.currentRoute]||!1)}};
//# sourceMappingURL=router.js.map