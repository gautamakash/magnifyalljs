var Route = function(_config){
    this.name = _config.name;
    this.obj = _config.obj;
    this.onEnter = _config.onEnter;
    this.onLeave = _config.onLeave;
}

var Router = function(_config){
  var _instance = this;
  this.id = _config.id;
  this.routes = {};
  var _nextRoute = false;
  var _prevRoute = false;
  var _currentRoute = false;
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

  var _onEnterHookCallBack = function(_isAllow){
    if(_isAllow){
      _instance.currentRoute = _nextRoute.name;
      _currentRoute = _nextRoute;
      _nextRoute = false;
      _currentRoute.obj.__render(_instance.bindElement);
    }
  }

  var _onLeaveHookCallBack = function(_isAllow){
    if(_isAllow){
      if(_nextRoute
        && _nextRoute.onEnter){
        _nextRoute.onEnter(_currentRoute, _nextRoute, _onEnterHookCallBack);
      }else{
        _onEnterHookCallBack(true);
      }
    }
  }

  this.loadRoute = function(_routeName){
    if(_instance.routes[_routeName]
    && _instance.bindElement){
      _nextRoute = _instance.routes[_routeName];
      if(_currentRoute
      && _currentRoute.onLeave){
        _currentRoute.onLeave(_currentRoute, _nextRoute, _onLeaveHookCallBack);
      }else{
        _onLeaveHookCallBack(true);
      }
    }
  }
  if(_config.defaultRoute){
    this.loadRoute(_config.defaultRoute);
    this.currentRoute = _config.defaultRoute;
    if(this.currentRoute){
      _currentRoute = this.routes[this.currentRoute] || false;
    }
  }
}
