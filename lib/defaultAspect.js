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

var _instance=this;if(arguments&&arguments.length>0)for(var arugI=0;arugI<arguments.length;arugI++){var arguObj=arguments[arugI];arguObj["@context"]&&(this["@context"]=arguObj["@context"]);arguObj["@type"]&&(this["@type"]=arguObj["@type"])}this.__getSystem=function(){return __systems[_system]};this.__getCurrentPath=function(){return _currentPath};var _onChangeListners={};this.subscribe=function(a,b){_onChangeListners[a]=b};this.unsubscribe=function(a){delete _onChangeListners[a]};this.__update=function(){__change(this);__bindElement&&this.__render(!1)};var __change=function(a){for(var b in _onChangeListners)_onChangeListners[b](a)};this.serialize=function(){var a=JSON.parse(JSON.stringify(this));delete a.__bind;return JSON.stringify(a)};this.equal=function(a){return this.serialize()===a.serialize()};var __template={},__bindElement=!1;this.__setTemplate=function(a){__template=a};this.__render=function(a,b){this.__bindElement(a);this.__getSystem().getTemplateProcessor().process(__template,__bindElement,this,b);this.__afterRender&&this.__afterRender(__bindElement)};this.__bindElement=function(a){if(a)try{__bindElement=document.querySelectorAll(a)||__bindElement}catch(b){__bindElement=a.length&&a.length>0?a:[a]}};this.__unbindElement=function(){__bindElement=!1};this.__getBindElement=function(){return __bindElement};this.__getReference=function(){var a="__systems.";a+=_system;a+=".getObject(";a+="'"+this.__UID+"')";return a};
//# sourceMappingURL=defaultAspect.js.map