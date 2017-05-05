/*
 java-script.js v0.0.0
 (c) 2016-2017 Akash Gautam . http://www.magnifyall.com
 License: MIT
*/

// instance 
var _instance = this;

// Checking arguments
if(arguments && arguments.length>0){
    for(var arugI = 0 ; arugI<arguments.length; arugI++){
        var arguObj = arguments[arugI];
        if(arguObj['@context']){
            this['@context'] = arguObj['@context'];
        }
        if(arguObj['@type']){
            this['@type'] = arguObj['@type'];
        }
    }
}


// get systems
this.__getSystem = function(){
    return __systems[_system];
}
// get data current path
this.__getCurrentPath = function(){
    return _currentPath;
}
// listners, subscribers
var _onChangeListners = {};
// Method to subscribe with unique id
this.subscribe = function(_id, _fnc){
    _onChangeListners[_id] = _fnc;
}
// unsubscribe unique id
this.unsubscribe = function(_id){
    delete _onChangeListners[_id];
}
// trigger update to object and trigger change event to subscriber
this.__update = function(){
    __change(this);
    if(__bindElement){
        this.__render(false);
    }
}

// trigger change events to subscriber
var __change = function(_objectInstance){
    for(var _listner in _onChangeListners){
        _onChangeListners[_listner](_objectInstance);
    }
}
// serialize object
this.serialize = function(){
    var _localInstance = JSON.parse(JSON.stringify(this));
    delete _localInstance.__bind;
    return JSON.stringify(_localInstance);
}
// check if value(serialize) are equal
this.equal = function(_ele){
    return (this.serialize() === _ele.serialize());
}

// default template
var __template = {};
var __bindElement = false;
this.__setTemplate = function(_template){
    __template = _template;
}
// render template
this.__render = function(_bindElement, _isAppend){
    this.__bindElement(_bindElement);
    this.__getSystem().getTemplateProcessor().process(__template, __bindElement, this, _isAppend);
    // render hook
    if(this.__afterRender){
        this.__afterRender(__bindElement);
    }
}

// bind element
this.__bindElement =  function(_bindElement){
    if(_bindElement){
        try{
            __bindElement = document.querySelectorAll(_bindElement)||__bindElement;
        }catch (e){
            if(_bindElement.length && _bindElement.length > 0){
                __bindElement = _bindElement;
            }else{
                __bindElement = [_bindElement];
            }
        }
    }
}
// unbind element
this.__unbindElement = function(){
    __bindElement = false;
}
// get bind element
this.__getBindElement = function(){
    return __bindElement;
}
this.__getReference = function(){
    var returnString = '__systems.';
    returnString += _system;
    returnString += '.getObject(';
    returnString += "'"+this.__UID+"')";
    return returnString;
}
