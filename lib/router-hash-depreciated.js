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

var Route=function(a,b,c){this.name=a;this.path=b;this.obj=c},Router=function(a){var b=this;this.name=a.name;this.routes={};this.isRoot=a.isRoot||!1;var c=a.debug||!1;if(a.routes)for(var d=0;d<a.routes.length;d++){var e=a.routes[d];this.routes[e.name]=e}this.addRoute=function(a){this.routes[a.name]=a};this.bindElement=a.bindElement||!1;this.bind=function(a){this.bindElement=a||this.bindElement};this.currentRoute=a.defaultRoute||fales;var f=function(a){if(b.routes[a]&&b.bindElement){b.currentRoute&&b.routes[a].__unbindElement&&b.routes[a].__unbindElement();b.currentRoute=a;b.routes[a].obj.__render&&b.routes[a].obj.__render(b.bindElement);var c=-1!=document.location.href.indexOf("#")?document.location.href.split("#")[0]:document.location.href;document.location.href=c+"#"+b.routes[b.currentRoute].path}};this.getRouteByURL=function(a){for(var b in this.routes)if(this.routes[b].path===a)return this.routes[b]};this.refreshRoutes=function(){var a=location.hash.slice(1)||"/",d=b.getRouteByURL(a);if(d){c&&console.log("update routes:"+a,d);try{d.obj.__render(b.bindElement);b.currentRoute&&b.routes[b.currentRoute].obj.__unbindElement();b.currentRoute=d.name}catch(a){c&&console.log(a);throw new Error("Cannot render route:"+d.name+" (route object is not a system object)")}}else f(b.currentRoute)};this.isRoot&&window.addEventListener("hashchange",this.refreshRoutes);this.currentRoute&&this.refreshRoutes()};
//# sourceMappingURL=router-hash-depreciated.js.map