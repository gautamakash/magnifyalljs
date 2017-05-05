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
    name: 'root',
    routes: [
        new Route('home','/',helloWorld),            
        new Route('about-us','/about-us',helloWorld1)
    ],
    defaultRoute: 'home',
    bindElement: document.getElementById('route'),
    isRoot: true,
    debug: true
});