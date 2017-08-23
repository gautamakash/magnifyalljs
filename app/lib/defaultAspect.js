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

var _instance=this;if(arguments&&arguments.length>0)for(var arugI=0;arugI<arguments.length;arugI++){var arguObj=arguments[arugI];arguObj["@context"]&&(this["@context"]=arguObj["@context"]);arguObj["@type"]&&(this["@type"]=arguObj["@type"])}this.__getSystem=function(){return __systems[_system]};this.__getCurrentPath=function(){return _currentPath};this.__getClassName=function(){return _currentPackage};var _onChangeListners={};this.subscribe=function(e,t){_onChangeListners[e]=t};this.unsubscribe=function(e){delete _onChangeListners[e]};this.__update=function(e){__change(this);__bindElement&&!e&&this.__render(!1)};var __change=function(e){for(var t in _onChangeListners)_onChangeListners[t](e)};this.serialize=function(){var e=JSON.parse(JSON.stringify(this));delete e.__bind;return JSON.stringify(e)};this.equal=function(e){return this.serialize()===e.serialize()};var __template={},__bindElement=!1;this.__setTemplate=function(e){__template=e};this.__render=function(e,t){this.__bindElement(e);this.__getSystem().getTemplateProcessor().process(__template,__bindElement,this,t);this.__afterRender&&this.__afterRender(__bindElement)};this.__bindElement=function(e){if(e)try{__bindElement=document.querySelectorAll(e)||__bindElement}catch(t){__bindElement=e.length&&e.length>0?e:[e]}};this.__unbindElement=function(){__bindElement=!1};this.__getBindElement=function(){return __bindElement};this.__queryChildElements=function(e){var t=[];if(__bindElement&&__bindElement.length&&__bindElement.length>0)for(var n=0;n<__bindElement.length;n++)if(0===n)t=Array.prototype.slice.call(__bindElement[n].querySelectorAll(e));else{var i=Array.prototype.slice.call(__bindElement[n].querySelectorAll(e));t=t.length>0?t.concat(i):i}return t};this.__getReference=function(){var e="__systems.";e+=_system;e+=".getObject(";return e+="'"+this.__UID+"')"};
//# sourceMappingURL=defaultAspect.js.map