var system = new System({
    src: 'src',
    lib: 'lib'
});

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
