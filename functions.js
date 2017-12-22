const request = require('request');
const fb_token = process.env.FB_TOKEN;

// Functions to send message
var sendMessage = function(sender, messageText) {
    let messageData = {
        recipient: {
            id: sender,
        },
        message: {
            text: messageText,
        }
    }

    return new Promise((resolve, reject) => {
        callSendApi(messageData).then( (msg) => {
            resolve('Successfully sent Text Message');
        }, (errMsg) => {
            reject(errMsg);
        });
    })
}

const callSendApi = (messageData, callback) => {
    return new Promise( (resolve, reject) => {
        request({
            uri: 'https://graph.facebook.com/v2.6/me/messages',
            qs: { 
                access_token: token 
            },
            method: 'POST',
            json: messageData
        }, (error, response, body)=> {
            if (!error && response.statusCode == 200) {
                var recipientId = body.recipient_id;
                if (body.message_id)
                    resolve("Message send to : " + recipientId);
            } else {
                reject(`Failed calling Send API ${response.statusCode} ${response.statusMessage} ${body.error}`);
            }
        });  
    })
}

function getUserData(id, callback) {
    let url = `https://graph.facebook.com/v2.11/${id}?access_token=${fb_token}`
    request({url, json:true}, (error, res, body) => {
        callback(body.first_name);
    }) 
}

module.exports =  {
    sendMessage,
    getUserData
};
