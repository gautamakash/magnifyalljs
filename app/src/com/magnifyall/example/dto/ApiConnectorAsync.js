/**
 * ApiConnectorAsync
 */

ApiConnectorAsync = function(_config){    
    this.fetchService = function(_query, _callback){
        setTimeout(function(){
            _callback(JSON.stringify({
                str: "Hello World!",
                from: "Admin",
                to: "Akash"
            }));
        },5000);
    };
    this.updateService = function(_obj, _callback){
        setTimeout(function(){
            _callback(true);
        },2000);
    };
}