exports.handler = (event, context, callback) => {
    
    let AWS = require('aws-sdk');
    
    AWS.config.update({accessKeyId: '', secretAccessKey: '', region: 'us-east-1'});
    
    let ddb = new AWS.DynamoDB({apiVersion: '2012-10-08'});
    
    let name = '';
    
    if (event  && event.queryStringParameters && event.queryStringParameters.name) {
        name = event.queryStringParameters.name;
    }
    
    var params = {
        Key: {
            "firstName": {
                S: name
            }
        },
        TableName: 'testTable'
    };
    
    ddb.getItem(params, function(err, data) {
        
        if (err) {
            console.log("Error", err);
        } else {
    
            if (data != null && data != '' && data.Item) {
                console.log("Success", data.Item);
                let lastName = {"lastName":data.Item.lastName.S};
                const response = {
                    statusCode: 200,
                    body: JSON.stringify(lastName),
                    headers: {
            			"Content-Type": "text/html",
            			"Access-Control-Allow-Methods":"*",
            			"Access-Control-Allow-Headers":"*",
            			"Access-Control-Allow-Origin":"*"
            		}
                };
                return callback(null, response);
            } else {
                const response = {
                    statusCode: 200,
                    body: 'User not Found',
                    headers: {
            			"Content-Type": "text/html",
            			"Access-Control-Allow-Methods":"*",
            			"Access-Control-Allow-Headers":"*",
            			"Access-Control-Allow-Origin":"*"
            		}
                };
                return callback(null, response);
            }
    
        }
    
    });
};
