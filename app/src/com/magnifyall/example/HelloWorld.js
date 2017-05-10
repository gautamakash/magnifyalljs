/*

*/
HelloWorld = function(_config){
    this.name = _config.name;
    this.properties = [
        {
            key: "Gender",
            value: "Male",
            test: ["One","Two"]
        },
        {
            key: "Location",
            value: "Sydney",
            test: ["Three","Four"]
        }
    ];
    this.greet = function(){
        return "hello "+this.name;
    };
    this.goNext = function(_route){
      if(router){
        router.loadRoute(_route);
      }
    };
    this.__setTemplate([{
        div: {
            childs: [
                {
                    div:{
                        childs:[
                            {
                                a:{
                                    prop:{
                                        href: 'javascript:void(0);',
                                        onclick: {
                                          fn: "goNext",
                                          arg:["home"]
                                        }
                                    },
                                    childs:[
                                        {'#text': 'Home'}
                                    ]
                                }
                            },
                            {
                                a:{
                                    prop:{
                                        href: 'javascript:void(0);',
                                        onclick: {
                                          fn: "goNext",
                                          arg:["about-us"]
                                        }
                                    },
                                    childs:[
                                        {'#text': 'About Us'}
                                    ]
                                }
                            }
                        ]
                    }
                },
                {'#text':'Hi {{show:name}}'},
                {'#for':{
                    data: 'properties',
                    template: {
                        div:{
                            childs:[
                                {'#text':'<b>{{show:key}}</b>:{{show:value}}'},
                                {
                                    ul:{
                                        childs: [
                                            {
                                                '#for': {
                                                    data: "test",
                                                    template: {
                                                        li: {
                                                            childs:[
                                                                {'#text':'{{show:@}}'}
                                                            ]
                                                        }
                                                    }
                                                }
                                            }
                                        ]
                                    }
                                }
                            ]
                        }
                    }
                }}
            ]
        }
    }]);
}
