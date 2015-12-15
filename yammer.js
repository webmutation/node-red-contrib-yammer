module.exports = function (RED) {
    var yam = require('yammer-rest-api-client');
    var YammerAPIClient = require('yammer-rest-api-client/lib/api.js');

    function YammerNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;

        node.endpoint = config.endpoint;
        node.method = config.method;
        node.token = config.token;
        node.parameters = config.parameters;
        node.restid = config.restid;

        var client = new YammerAPIClient({token: node.token});

        this.on('input', function (msg, cpnfig) {
                if(msg.parameters!=undefined){
                    node.parameters = msg.parameters;
                }

                //TODO: Abstract this function call away to a request helper

                client.users.in_group(node.restid, node.parameters, function (error, data) {
                    if (error)
                        console.log("There was an error retrieving the data");
                    else
                        msg.payload = data;
                    node.send(msg);
                });
        });
    }
    RED.nodes.registerType("yammer", YammerNode);
}