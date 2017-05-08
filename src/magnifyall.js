/**
*/

var __systems = {};
var __aops = {};

var System = function(_settings){
    
    /*
    Public Variables
    */
    
    //System Name
    this.name = _settings.name || "default";
    // Check if System is already initialized then return the System
    if(__systems[this.name]){
        return __systems[this.name];
    }else{
        // Store System reffrence for external reffrence
        __systems[this.name] = this;
    }
    // Define source folder for System
    this.src = _settings.src || "src";
    // Define Lib Url for magnifyall System
    this.lib = _settings.lib || "lib";
    // System Cache
    this.__cache = {};
    // storing debug points
    this.debug = (_settings && _settings.debug)?_settings.debug:false;
    // BeanFactory Configuration
    this.beanFactoryConfiguration = (_settings && _settings.beanFactory)?_settings.beanFactory:false;
    // AOP Configuration
    this.aopConfiguration = (_settings && _settings.aop)?_settings.aop:false;
    // template processor
    this.templateProcessor = _settings.templateProcessor || false;
    // UID
    this.uids = {};
    this.getUID = function(){
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    };
    this.registerObject = function(_obj){
        if(_obj && _obj.__UID){
            this.uids[_obj.__UID] = _obj;
        }
    };

    this.getObject = function(_guid){
        return this.uids[_guid];
    }

    // Bean factory beans
    this.beans = {};
    
    
    
    /*
    Private Variables
    */
    var _instance = this;
    
    
    
    /*
    Public Methods
    */
    /*
    Import method for current System
    */
    this.import = function(_package){
        var _fileString = this.getFile(_extractPath(_package, this.src)+".js", false);        
        _fileString = _initiatePackage(_package, _fileString);
        if(this.aopConfiguration){
            _fileString = _initiateAspect(_fileString, _package);
        }
        _fileString = _initiateProxy(_fileString, this.lib, this.src, _package, this);
        //console.log(_fileString);        
        eval(_fileString);
        return this;
    };
    
    
    
    // Create object and return from string class
    this.createObject = function(_class, _data){
        this.import(_class);
        var _classObj = window;
        var _classArr = _class.split('.');
        for(var _classI = 0; _classI < _classArr.length; _classI++){
            _classObj = _classObj[_classArr[_classI]];
        }
        var _bean = new _classObj(_data);
        return _bean;
    };
    // Create object from JSONLD COnfig and return from string class
    this.createObjectFromJsonDL = function(_type, _data){
        return this.createObject(this.jsonDL[_type], _data);
    };
    
    
    // return/create Bean which is configure in beanFactory, must has package and id of pojo
    this.getBean = function(_class, _id){
        if(this.beanFactoryConfiguration && this.beanFactoryConfiguration[_class]){
            this.import(_class);
            var _beanConfig = this.beanFactoryConfiguration[_class];
            var _data = {};
            var _dataUrl = false;
            if(_beanConfig.fetch){
                _dataUrl = _beanConfig.fetch;
                _dataUrl = _dataUrl.replace("{{id}}", _id);
                var _dataString = this.getFile(_dataUrl, true);
                _data = JSON.parse(_dataString);
                _data.__url = _dataUrl;
            }
            if(_dataUrl && this.beans[_dataUrl]){
                return this.beans[_dataUrl];
            }else if(this.beans[_class+'_'+_id]){
                return this.beans[_class+'_'+_id];
            }
            var _classObj = window;
            var _classArr = _class.split('.');
            for(var _classI = 0; _classI < _classArr.length; _classI++){
                _classObj = _classObj[_classArr[_classI]];
            }
            var _bean = new _classObj(_data);
            if(_dataUrl){
                this.beans[_dataUrl] = _bean;
            }else{
                this.beans[_class+'_'+_id] = _bean;
            }
            return _bean;
        }
    };
    
    // Create new thread and execute code.
    this.run = function(_fnc){
        setTimeout(_fnc, 0);
    };
    
    /* 
    return String value from response take file path, should cache, system
    */
    this.getFile = function(_filePath, uncached){
        var _returnString = "";
        if(!uncached && _instance.__cache[_filePath]){
            _returnString = _instance.__cache[_filePath];
        }else{
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    _returnString =  this.responseText;
                }
            };
            xhttp.open("GET", _filePath, false);
            xhttp.send();
            if(!uncached){
                _instance.__cache[_filePath] = _returnString;
            }
        }
        return _returnString;
    };
    /**
     * Template Processor
     */
    var TemplateProcessor = function(_config){
        var _instanceTemplateProcessor = this;
        var __template = '';
        this.setTemplate = function(_template){
            __template = _template;
        }
        this.elements = false;
        this.rootElement = false;
        var __data = {};
        this.setData = function(_data){
            __data = _data;
        }
        this.process = function(_template, _ele, _data, _isAppend){
            this.setTemplate (_template);
            this.setData(_data);
            for(var _eleIndex = 0; _eleIndex<_ele.length; _eleIndex++ ){
                this.render(_ele[_eleIndex], _isAppend);
            }
        }
        this.render = function(_ele, isAppend){
            this.rootElement = _ele;
            if(!this.elements){
                this.elements = {};
            } 
            if(!isAppend){
                while (this.rootElement.firstChild) {
                    this.rootElement.removeChild(this.rootElement.firstChild);
                }
            }
            for(var _templateIndex = 0; _templateIndex<__template.length; _templateIndex++){           
                var _childTemplate = __template[_templateIndex];
                var _childElement = this.populateElement(this.rootElement,_childTemplate, __data);
                if(_childElement){
                    this.rootElement.appendChild(_childElement);
                }
            }
        }
        this.populateElement = function(_ele, _template, _data){
            var _retObj = '';
            for(var _eleName in _template){                
                if(_eleName === 'render'){
                    if(_data.__render){
                        var _isRenderAppend = false;
                        if(_template[_eleName].append){
                            _isRenderAppend = true;
                        }
                        _data.__render(_ele, _isRenderAppend);
                        return;
                    }
                }
                if(_eleName === '#text'){
                    var _bind = this.getBindInfo(_template[_eleName], _data);
                    //console.log(_bind);
                    var _wrapElement = document.createElement('div');
                    _wrapElement.innerHTML = _bind.value;
                    //var _textNode = document.createTextNode(_bind.value);
                    for(var _wrapI = 0; _wrapI < _wrapElement.childNodes.length; _wrapI++){
                        _ele.appendChild(_wrapElement.childNodes[_wrapI]);
                    }
                    //_ele.appendChild();
                    return;
                }
                if(_eleName === '#for'){
                    var _forConfig = _template[_eleName];
                    var _dataArr = this.getDataValue(_data, _forConfig.data);
                    if(_dataArr && _dataArr.length > 0){
                        for(var _dataArrIndex = 0; _dataArrIndex<_dataArr.length; _dataArrIndex++ )
                        {
                            var _childData = _dataArr[_dataArrIndex];
                            _childData['@root']=_data;
                            _childData[_forConfig.index||'@index'] = _dataArrIndex+1;
                            var _childElement = this.populateElement(_ele, _forConfig.template, _childData);
                            if(_childElement){
                                _ele.appendChild(_childElement);
                            }
                        }
                    }
                    return;
                }
                _retObj = document.createElement(_eleName);
                if(_template[_eleName].prop){
                    // add prop
                    for(var _propName in _template[_eleName].prop){
                        //console.log(_propName);
                        if(_propName === "style"){
                            var _styleString = '';
                            for(var _styleName in _template[_eleName].prop[_propName]){
                                _styleString += _styleName+':'+this.getBindInfo(_template[_eleName].prop[_propName][_styleName],_data).value+'; '
                            }
                            _retObj.setAttribute("style", _styleString);
                            //console.log(_styleString);
                        }else if(_propName.indexOf('on') == -1){                        
                            _retObj.setAttribute(_propName, this.getBindInfo(_template[_eleName].prop[_propName],_data).value);
                        }else if(_propName.indexOf('on') == 0){
                            // bind methods
                            var _bindEvent = _template[_eleName].prop[_propName];
                            //console.log(_bindEvent);
                            /*var _args = [];
                            for(var _argIndex = 0; _argIndex < _bindEvent.arg.length; _argIndex++){
                                var _arg = _bindEvent.arg[_argIndex];
                                if(_arg.match(/^{{[a-zA-Z._@-]{1,}}}$/g)){
                                    _arg = this.getDataValue(_data, _arg.substring(2,_arg.length-2));
                                }
                                _args.push(_arg);
                            }*/
                            var _fn = this.getDataValue(_data, _bindEvent.fn);
                            _retObj.addEventListener(_propName.substring(2,_propName.length), function(){
                                var _args = [];
                                for(var _argIndex = 0; _argIndex < _bindEvent.arg.length; _argIndex++){
                                    var _arg = _bindEvent.arg[_argIndex];
                                    if(_arg.match(/^{{[a-zA-Z._@-]{1,}}}$/g)){
                                        _arg = _instanceTemplateProcessor.getDataValue(_data, _arg.substring(2,_arg.length-2));
                                    }
                                    _args.push(_arg);
                                }
                                _fn.apply(_fn,_args);
                            })
                        }
                    }
                }
                if(_template[_eleName].childs){
                    // add child
                    for(var _childIndex = 0; _childIndex<_template[_eleName].childs.length; _childIndex++){
                        var _child = _template[_eleName].childs[_childIndex]
                        var _childElement = this.populateElement(_retObj, _child, _data);
                        if(_childElement){
                            _retObj.appendChild(_childElement);
                        }
                    }
                }
            }
            return _retObj;
        }
        this.getBindInfo = function(_template, _data){
            var _retObj = {
                value: '',
                type: 'show'
            }
            var _directives = _template.match(/{{[a-zA-Z]{0,}:[a-zA-Z._@-]{1,}}}/g);
            //console.log(_directives);
            if(_directives){
                for(var _directiveIndex = 0; _directiveIndex < _directives.length; _directiveIndex++){
                    var _directive = _directives[_directiveIndex];
                    var _stringArr = _directive.substring(2,_directive.length-2).split(":");
                    _retObj.type = _stringArr[0];
                    var _value = this.getDataValue(_data,_stringArr[1]);
                    if(_retObj.type != '' && _data[_retObj.type]){
                        _value = _data[_retObj.type](_value);
                    }else if(_retObj.type != '' && _data['@root'] && _data['@root'][_retObj.type]){
                        _value = _data['@root'][_retObj.type](_value);
                    }
                    _template = _template.replace(_directive, _value);
                }            
            }
            _retObj.value = _template;
            return _retObj;
        }
        this.getDataValue = function(_data, _nameSpace){
            if(_nameSpace === '@'){
                return _data;
            }
            if(_nameSpace.indexOf('.') != -1){
                var _parentNameSpace = _nameSpace.split('.')[0];
                if(_data[_parentNameSpace]){                
                    return this.getDataValue(_data[_parentNameSpace], _nameSpace.substring(_parentNameSpace.length+1,_nameSpace.length));
                }
            }
            return _data[_nameSpace];
        }
    }; 

    this.templateProcessor = false;
    this.getTemplateProcessor = function(){
        if(this.templateProcessor){
            return this.templateProcessor;
        }
        return new TemplateProcessor({});
    }
    /*
    Private Methods
    */
    // Extract and return path from package
    var _extractPath = function(_filePath, _basePath){
        var _fileArr = _filePath.split('.');
        var _retObj = _basePath;
        for(var _fileArrI = 0; _fileArrI < _fileArr.length; _fileArrI++){
            _retObj+= "/"+_fileArr[_fileArrI];
        }
        return _retObj;
    };
    
        
    // create package and update package in string class defination
    var _initiatePackage = function(_filePath, _fileString){
        var _fileArr = _filePath.split('.');
        var _baseObj = window;
        var _className = "";
        for(var _fileArrI = 0; _fileArrI < _fileArr.length; _fileArrI++){
            if(_fileArr.length>1 && _fileArrI < _fileArr.length-1){
                _baseObj[_fileArr[_fileArrI]] = _baseObj[_fileArr[_fileArrI]] || {};
                _baseObj = _baseObj[_fileArr[_fileArrI]];
            }else{
                _className = _fileArr[_fileArrI];
            }            
        }
        var _methodRegEx = new RegExp("([^a-zA-Z_.]|^)"+_className+"[ ]{0,}=", "g");
        _fileString = _fileString.replace(_methodRegEx, "\n"+_filePath+" =");
        
        return _fileString;
    };
    
    // Update String function with Aspects
    var _initiateAspect = function(_fileString, _package){
        
        //var _aopRegEx = new RegExp("(this.|var ( ){0,})[a-zA-Z_0-9.]{0,}( ){0,}=( ){0,}function\([a-zA-Z_0-9 ,]{0,}\)( ){0,}{", "g");
        var _functionsStrArr = _fileString.match(/(this.|var ( ){0,})[a-zA-Z_0-9.]{0,}( ){0,}=( ){0,}function\([a-zA-Z_0-9 ,]{0,}\)( ){0,}{/g);
        if(_functionsStrArr && _functionsStrArr.length && _functionsStrArr.length>0){
            
            for(var _functionStrI = 0; _functionStrI< _functionsStrArr.length; _functionStrI++){
                var _functionStr = _functionsStrArr[_functionStrI];
                var _aopConfig = _getAOPDetail(_functionStr, _package);
                if(_aopConfig){
                    //console.log(_aopConfig);
                    var _fnStringArr = _fileString.split(_functionStr);
                    var _fnDefination = _functionStr+"";
                    var _aopKey = _instance.name+"_"+_aopConfig.scope+"_"+_aopConfig.package+"_"+_aopConfig.functionName;
                    __aops[_aopKey] = _aopConfig;
                    var _aopData = JSON.stringify(_aopConfig);
                    if(_aopConfig.before){
                        _fnDefination += "\n";
                        _fnDefination += "__aops['"+_aopKey+"'].before("+_aopData+", arguments);\n";
                    }
                    
                    _fileString = _fnStringArr[0]+_fnDefination+_fnStringArr[1];
                }
            }
            
        }
        //console.log(_functionsStrArr);
        
        return _fileString;
    };
    
    var _getAOPDetail = function(_fnStr, _package){
        var _aopDetail = false;
        for(var _aopI = 0; _aopI< _instance.aopConfiguration.length; _aopI++){
            var _localFnStr = _fnStr+"";
            var _aop = _instance.aopConfiguration[_aopI];
            var _isPublic = false;
            var _localExecution = _aop.execution+"";
            if(_localExecution.indexOf("public ") == 0){
                _isPublic = true;
                _localExecution = _localExecution.split("public ")[1];
            }
            if(!_isPublic || (_isPublic && _fnStr.indexOf("this.") == 0)){
                // got Scope
                _localExecution = _localExecution.substr(2,_localExecution.length);
                var _pkExecution = _localExecution.split("(..)")[0];
                var _fncPart = _fnStr.match(/[a-zA-Z_0-9]{0,}( ){0,}=/g)[0];
                _fncPart = _fncPart.split("=")[0].replace(/ /g, "");
                var _callaopMatch = _package+"."+_fncPart;
                _callaopMatch = _callaopMatch.match(_pkExecution);
                if(_callaopMatch && _callaopMatch.length && _callaopMatch.length>0){
                    _aopDetail = _aop;
                    _aopDetail.functionName = _fncPart;
                    _aopDetail.package = _package;
                    _aopDetail.scope = (_fnStr.indexOf("this.") == 0)?"public":"private";
                    _hasAOP = true;
                }
            }
        }
        
        return _aopDetail;
    };
    
    // Update String function with Aspects
    var _initiateProxy = function( _fileString, _libPath, _basePath, _filePath){
        
        var _aspectString = _instance.getFile(_libPath+"/defaultAspect.js", false, _instance);
        var _currentPackage = _filePath;
        var _currentPath = _extractPath(_filePath, _basePath);
        _aspectString += ' var _currentPackage = "'+_currentPackage+'"; \n';
        _aspectString += ' var _currentPath = "'+_currentPath+'"; \n';
        _aspectString += ' var _system = "'+_instance.name+'"; \n';
        _aspectString += ' this.__UID = this.__getSystem().getUID(); \n';
        _aspectString += '  this.__getSystem().registerObject(this); \n';
        var _aspectRegex = new RegExp("function[ ]{0,}([^{]*){", "");
        var _functionArr = _fileString.match(_aspectRegex);
        var _preFunctionString = _fileString.substring(0,_functionArr.index+_functionArr['0'].length);        
        var _postFunctionString = _fileString.substring(_functionArr.index+_functionArr['0'].length, _fileString.length);
        _fileString = _preFunctionString+" \n"+_aspectString+" \n"+_postFunctionString;
        return _fileString;
    };
    
    /*
    Execute System after decleration
    */
    //Is JSONDL available
    this.jsonDL = _settings.jsonDL || false;
    if(this.jsonDL && document.querySelector('script[type="application/ld+json"]')){
        try{
            this.jsonDLDefination = JSON.parse(document.querySelector('script[type="application/ld+json"]').innerHTML);
        }catch(e){
            this.jsonDLDefination = {};
        }
        // if jsonDlProvieded load application
        
        this.mainApp = {};
        this.mainAppElements = [];
        if(this.jsonDLDefination.push){
            for(var _appIndex = 0; _appIndex < this.jsonDLDefination.length; _appIndex++){
                if(this.jsonDLDefination[_appIndex]['@type'] && this.jsonDL[this.jsonDLDefination[_appIndex]['@type']]){
                    var _appClass = this.jsonDL[this.jsonDLDefination[_appIndex]['@type']];
                    this.mainAppElements.push(this.createObject(_appClass, this.jsonDLDefination[_appIndex]));
                    this.mainApp[this.jsonDLDefination[_appIndex]['@type']] = this.mainAppElements[_appIndex];
                }
            }
        }
        else if(this.jsonDLDefination['@type'] && this.jsonDL[this.jsonDLDefination['@type']]){
            var _appClass = this.jsonDL[this.jsonDLDefination['@type']];
            this.mainAppElements.push(this.createObject(_appClass, this.jsonDLDefination));
            this.mainApp[this.jsonDLDefination['@type']] = this.mainAppElements[0];
        }
    }
}