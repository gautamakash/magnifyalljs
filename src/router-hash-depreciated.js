var Route = function(_name,_path, _obj){
    this.name = _name;
    this.path = _path;
    this.obj = _obj;
}

var Router = function(_config){
    var _instance = this;
    this.name = _config.name;
    this.routes = {};
    this.isRoot = _config.isRoot || false;
    var _debug = _config.debug || false;
    if(_config.routes){
        for(var _routeI = 0; _routeI < _config.routes.length; _routeI++){
            var _route = _config.routes[_routeI];
            this.routes[_route.name] = _route;
        }
    }
    this.addRoute = function(_route){
        this.routes[_route.name] = _route;
    }
    this.bindElement = _config.bindElement || false;
    this.bind = function(_ele){
         this.bindElement = _ele || this.bindElement;
    }
    this.currentRoute = _config.defaultRoute || fales;
    var _loadRoute = function(_routeName){
        if(_instance.routes[_routeName]
        && _instance.bindElement){
            if(_instance.currentRoute && _instance.routes[_routeName].__unbindElement){
                _instance.routes[_routeName].__unbindElement();
            }
            _instance.currentRoute = _routeName;
            if(_instance.routes[_routeName].obj.__render){
                _instance.routes[_routeName].obj.__render(_instance.bindElement);
            }
            var _url = (document.location.href.indexOf('#')!=-1)?document.location.href.split('#')[0]:document.location.href;
            
            document.location.href = _url+'#'+_instance.routes[_instance.currentRoute].path;
        }
    }
    this.getRouteByURL = function(_url){
        for(var _routeName in this.routes){
            if(this.routes[_routeName].path === _url){
                return this.routes[_routeName];
            }
        }
    }
    this.refreshRoutes = function(){
        var routeUrl =location.hash.slice(1) || '/';
        var _route = _instance.getRouteByURL(routeUrl);
        if(_route){
            if(_debug){            
                console.log('update routes:'+routeUrl, _route);
            }
            try{
                _route.obj.__render(_instance.bindElement);
                if(_instance.currentRoute){                    
                    _instance.routes[_instance.currentRoute].obj.__unbindElement();
                }
                _instance.currentRoute = _route.name;
            }catch (e){                
                if(_debug){ 
                    console.log(e);
                }
                throw new Error('Cannot render route:'+_route.name+' (route object is not a system object)');
            }
        }else{
            _loadRoute(_instance.currentRoute);
        }
    }

    if(this.isRoot){
        // Listen on hash change:
        window.addEventListener('hashchange', this.refreshRoutes);
        // Listen on page load:
        //window.addEventListener('load', this.refreshRoutes);
    }
    
    if(this.currentRoute){
        this.refreshRoutes();
        //_loadRoute(this.currentRoute);
    }
}
