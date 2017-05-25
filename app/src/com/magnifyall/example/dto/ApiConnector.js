/**
 * ApiConnector
 */

ApiConnector = function(_config){
    this.fetchService = function(_query){
        return JSON.stringify({
            str: "Hello World!",
            from: "Admin",
            to: "Akash"
        });
    };
    this.updateService = function(_obj){
        console.log(_obj);
        return true;
    };
    
    this.asyncFetchService = function(_query, _callback){
        setTimeout(function(){
            _callback(JSON.stringify({
                str: "Hello World!",
                from: "Admin",
                to: "Akash"
            }));
        },5000);
    };
    this.asyncUpdateService = function(_obj, _callback){
        setTimeout(function(){
            _callback(true);
        },2000);
    };
}