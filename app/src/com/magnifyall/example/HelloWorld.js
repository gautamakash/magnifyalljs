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
    this.goNext = function(_url){
        window.location = _url;
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
                                        href: '#/'
                                    },
                                    childs:[
                                        {'#text': 'Home'}
                                    ]
                                }
                            },
                            {
                                a:{
                                    prop:{
                                        href: '#/about-us'
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