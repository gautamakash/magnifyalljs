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

var Route=function(t,e,o){this.name=t;this.path=e;this.obj=o},Router=function(t){var e=this;this.name=t.name;this.routes={};this.isRoot=t.isRoot||!1;var o=t.debug||!1;if(t.routes)for(var n=0;n<t.routes.length;n++){var r=t.routes[n];this.routes[r.name]=r}this.addRoute=function(t){this.routes[t.name]=t};this.bindElement=t.bindElement||!1;this.bind=function(t){this.bindElement=t||this.bindElement};this.currentRoute=t.defaultRoute||fales;var u=function(t){if(e.routes[t]&&e.bindElement){e.currentRoute&&e.routes[t].__unbindElement&&e.routes[t].__unbindElement();e.currentRoute=t;e.routes[t].obj.__render&&e.routes[t].obj.__render(e.bindElement);var o=-1!=document.location.href.indexOf("#")?document.location.href.split("#")[0]:document.location.href;document.location.href=o+"#"+e.routes[e.currentRoute].path}};this.getRouteByURL=function(t){for(var e in this.routes)if(this.routes[e].path===t)return this.routes[e]};this.refreshRoutes=function(){var t=location.hash.slice(1)||"/",n=e.getRouteByURL(t);if(n){o&&console.log("update routes:"+t,n);try{n.obj.__render(e.bindElement);e.currentRoute&&e.routes[e.currentRoute].obj.__unbindElement();e.currentRoute=n.name}catch(t){o&&console.log(t);throw new Error("Cannot render route:"+n.name+" (route object is not a system object)")}}else u(e.currentRoute)};this.isRoot&&window.addEventListener("hashchange",this.refreshRoutes);this.currentRoute&&this.refreshRoutes()};
//# sourceMappingURL=router-hash-depreciated.js.map