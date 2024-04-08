## Table of Contents

## Webhook
- [About](#about)
- [Webhook Route](#webhook-route)
- [Testing](#webhook-test-example)
    + [Test Example](#webhook-test-example)
- [Babelrc](#babel-rc)
- [Payload Example](#webhook-payload-example)

## About <a name="about"></a>
This webhook is designed to parse data sent from the co2 devices.  
When data is uploaded from the device to [The Things Network](https://au1.cloud.thethings.network/console/applications/co2-test/devices). [^1]  
Once data has been parsed via the webhook controller,  
it will check if a device exists in the database, and either create one  
or upload the newest sensor data to that devices model.

[^1]: TTN login details are available on gitlabs

## Webhook Route <a name="webhook-route"></a>
The webhook runs from `root/api/v1/integrations/webhook`  
If the webhook route in app.js is changed, the endpoint on
[The Things Network Webhook](https://au1.cloud.thethings.network/console/applications/co2-test/integrations/webhooks) must be changed to match  
the new route, else no data will be pushed into the db. 



## Testing <a name="testing"></a>
From the project root  
`cd backend`  
Make sure packages are installed `npm install`  
run `npm test` | `npm run test` to run the jest test suite

## Babelrc <a name="babel-rc"></a>
Jest testing uses the Babel module plugin to allow ES6 imports via the .babelrc file  
inside the root of the backend dir

```js
{
    "env": {
      "test": {
        "plugins": ["@babel/plugin-transform-modules-commonjs"]
      }
    }
  }
  
```

### Test example <a name="webhook-test-example"></a>
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


## Payload Example <a name="webhook-payload-example"></a>
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