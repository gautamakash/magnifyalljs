
var system = new System({
    src: 'src',
    lib: 'lib',
    /*beanFactory:{
        "com.magnifyall.example.dto.Message":{
            sync:{
                fetchService: function(_query){
                    return JSON.stringify({
                        str: "Hello World!",
                        from: "Admin",
                        to: "Akash"
                    });
                },
                updateService : function(_obj){
                    console.log(_obj);
                    return true;
                }
            },
            async:{
                fetchService: function(_query, _callback){
                    setTimeout(function(){
                        _callback(JSON.stringify({
                            str: "Hello World!",
                            from: "Admin",
                            to: "Akash"
                        }));
                    },5000);
                },
                updateService : function(_obj, _callback){
                    setTimeout(function(){
                        _callback(true);
                    },2000);
                }
            }
        }
    }*/
});
system.import("com.magnifyall.example.dto.ApiConnector");
system.import("com.magnifyall.example.dto.ApiConnectorAsync");
if(!system.beanFactoryConfiguration){
    system.beanFactoryConfiguration = {};
}
system.beanFactoryConfiguration["com.magnifyall.example.dto.Message"] = {
    sync: new com.magnifyall.example.dto.ApiConnector(),
    async: new com.magnifyall.example.dto.ApiConnectorAsync()
}
/**
var message = system.getBean("com.magnifyall.example.dto.Message", "1");
system.updateBean(message);
// * 
var message;
system.onGetBean("com.magnifyall.example.dto.Message", "1", function(_message){console.log("message", message);message = _message;});
system.onUpdateBean(message, function(status){console.log("Update Status", status);});
 */

system.import("com.magnifyall.example.HelloWorld");
var helloWorld = new com.magnifyall.example.HelloWorld({
    name: "Akash"
});
var helloWorld1 = new com.magnifyall.example.HelloWorld({
    name: "Rinki"
});
console.log(helloWorld.greet());
var router = new Router(
{
    id: 'root',
    routes: [
        new Route({
          name: 'home',
          obj: helloWorld,
          onLeave: function(_currentRoute, _nextRoute, _callback){
            console.log("-----------------:OnLeave");
            _callback(true);
          }
        }),
        new Route({
          name: 'about-us',
          obj: helloWorld1,
          onEnter: function(_currentRoute, _nextRoute, _callback){
            console.log("-----------------:OnEnter");
            _callback(true);
          }
        })
    ],
    defaultRoute: 'home',
    bindElement: document.getElementById('route'),
    debug: true
});
