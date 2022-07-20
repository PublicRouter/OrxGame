const { XummSdk } = require('xumm-sdk');
require('dotenv').config()

// const { create } = require('../models/Character');
const Sdk = new XummSdk(process.env.XUMM_API,process.env.XUMM_KEY)

const payloadObject = {
 qrPng: "",
 payloadUuid: ""
};



const request = {
    "txjson": {
        'TransactionType': 'SignIn',
    },
    //user token
}




const createPayload = async () => {
    const payLoadCreate = await Sdk.payload.create(request)
    payloadObject.qrPng = payLoadCreate.refs.qr_png
    payloadObject.payloadUuid = payLoadCreate.uuid
    return {
        payloadUUID: payLoadCreate.uuid,
    //     qrLink: payLoadCreate.next.always
        qrLink: payLoadCreate.refs.qr_png
    }
    console.log(payLoadCreate)

    //url=payLoadCreate.next.always
    //uuid=payLoadCreate.uuid

    //sdk.payload.create
    //XummGetPayloadResponse || XummPostPayloadResponse for payload.subscribe
    //sdk.payload.subscribe

}

const subscribeToPayload = async (uuid) => {
    console.log("MY UUID inside ummsubscribe: ", uuid)
    const payloadSubscription = await Sdk.payload.subscribe(uuid, event => {
        console.log(event)
    })
    return payloadSubscription

    
    
}
// createPayload()
// function main() {
//     createPayload().then((result) => {
//         subscribeToPayload(result)
//     })
// }

// console.log("Return of calling createPayload function", createPayload().then((result) => console.log(result)))






module.exports = { subscribeToPayload, createPayload }