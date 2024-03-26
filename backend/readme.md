## Table of Contents

## Webhook
- [About](#about)
- [Deployment](#deployment)
- [Setup](#setup)
- [Dependencies](#dependencies)
    + [Dev-Dependencies](#devDependencies)
- [Testing](#testing)
    + [Test Example](#testExample)
- [Payload Example](#payloadExample)
- [Webhook](/backend/documentation/WEBHOOK.md)

```js
DATABASE_URL="postgres://fresh_air_webhook_user:Udcns3xIGCztavZwcDptVkLbAaAre4z6@dpg-cnvu97q1hbls73bq57hg-a.oregon-postgres.render.com/fresh_air_webhook"
```


## About <a name="about"></a>
**BIT Co2-sensor webhook**
Webhook connected to the BIT [TTN](https://www.thethingsnetwork.org/) Console.  

Data being uplinked to TTN from the hardware is sent every 5 minutes.    
The webhook automatically listens for those changes and returns a payload containing the data.

## Deployment <a name="deployment"></a>
At current webhook is deployed via render, on a forked repo, until containers are ready.

https://webhooktest-6o78.onrender.com/api/v1/integrations/webhook

Using the main url `webhookte...com`
will return a JSON message

```js
{
    "statusCode": 200,
    "message": "Available endpoints",
    "endpoints": "[POST]: /api/v1/integration/webhook"
}
```

## Project Setup <a name="setup"></a>
To setup locally, from the project root
`cd webhook`
then run `npm install` to install the required dependencies.

## Dependency List <a name="dependencies"></a>
[Express](https://www.npmjs.com/package/express)  
[Cors](https://www.npmjs.com/package/cors)  
[Body-Parser](https://www.npmjs.com/package/body-parser)

### Dev Dependencies
[Commitizen](https://www.npmjs.com/package/commitizen)  
[Jest (Unit testing)](https://jestjs.io/)  
[Supertest (HTTP testing)](https://www.npmjs.com/package/supertest)  
[Babel Module Plugin](https://www.npmjs.com/package/@babel/plugin-transform-modules-commonjs)

## Testing <a name="testing"></a>
From the project root  
`cd webhook`  
Make sure packages are installed `npm install`  
run `npm test` | `npm run test` to run the jest test suite

Jest testing uses the Babel module plugin to allow ES6 imports via the .babelrc file

```js
{
    "env": {
      "test": {
        "plugins": ["@babel/plugin-transform-modules-commonjs"]
      }
    }
  }
  
```

### Test example <a name="testExample"></a>
```js
describe('POST webhook', () => {
    afterAll(() => {
        server.close();
    })
    it('should respond with 400 Bad request when payload is empty', async () => {
        const response = await request(app)
        .post(webhookPath)
        .send({});

        expect(response.status).toBe(400);
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe("Empty payload received");
    });
```


## Payload Example <a name="payloadExample"></a>
```js
end_device_ids: {
    device_id: 'eui-XXXXXXX',
    application_ids: { application_id: 'co2-test' },
    dev_eui: 'XXXXXXX',
    dev_addr: 'XXXXXXX'
  },
  correlation_ids: [ 'gs:uplink:01HRX4B0G0SP6N9T9K1DZT3R8V' ],
  received_at: '2024-03-14T00:03:37.808080299Z',
  uplink_message: {
    f_port: 1,
    f_cnt: 91,
    frm_payload: 'MTI0NToyMwA=',
    decoded_payload: { receivedString: '1245:23\x00' },
    rx_metadata: [ [Object] ],
    settings: {
      data_rate: [Object],
      frequency: '917200000',
      timestamp: 1033421052,
      time: '2024-03-13T23:15:04.922843Z'
    },
    received_at: '2024-03-14T00:03:37.601844323Z',
    consumed_airtime: '0.102912s',
    network_ids: {
      net_id: 'XXXX',
      ns_id: 'XXXXXXX',
      tenant_id: 'ttn',
      cluster_id: 'au1',
      cluster_address: 'TTN-NETWORK-ADDRESS'
    }
  }
```
The data `decoded_payload: { receivedString: '1245:23\x00' },` is where the co2 level is stored, **`receivedString: 'co2-level:temperature'`**