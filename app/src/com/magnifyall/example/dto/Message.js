/**
 * Message Class
 */
Message = function(_config){
    this.str = _config.str;
    this.from = _config.from;
    this.to = _config.to;

    this.getClassName = function(){
        return _system;
    }
}