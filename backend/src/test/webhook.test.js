import request from 'supertest';
import { app, server } from '../app.js';
import { INDEX_PATHS } from '../utils/constants/globalConstants.js';

// xxxx/api/v1
const basePath = `/${INDEX_PATHS.BASE_URL}/${INDEX_PATHS.CURRENT_VERSION}`;

// xxxxx/api/v1/integration/webhook
const webhookPath = `${basePath}/integration/webhook`;

// Mock data that the webhook will return
const payload = {
  end_device_ids: {
    device_id: '00d3c69800bff312',
    application_ids: { application_id: 'co2-test' },
    dev_eui: '00D3C69B00BFF312',
  },
  uplink_message: {
    f_port: 1,
    f_cnt: 323,
    frm_payload: 'NDAXXXXXX',
    decoded_payload: { receivedString: '400:22\x00\x00' },
  },
};

describe('POST webhook', () => {
  /* afterAll will close the current running server after tests have run
    eg: It will spin up on port 3000 for the http mock requests
    then when tests have finish it will close the server to make sure it's no longer running
    */
  afterAll(() => {
    server.close();
  });

  it('should respond with 400 Bad request when payload is empty', async () => {
    const response = await request(app).post(webhookPath);
    expect(response.status).toBe(400);
  });

  it('should respond with an object containing a statusCode of 400 when the payload is empty', async () => {
    const response = await request(app).post(webhookPath).send({});
    const { statusCode } = response.body;
    expect(statusCode).toBe(400);
  });

  it('should respond with an object containing a message of Empty payload received when the payload sent is empty', async () => {
    const response = await request(app).post(webhookPath).send({});
    const { message } = response.body;
    expect(message).toBe('Empty payload received');
  });

  it('should return a status of 200 when POST receives data', async () => {
    const response = await request(app).post(webhookPath).send(payload);
    expect(response.status).toBe(200);
  });

  it('should respond with an object containing a message with a statusCode of 200', async () => {
    const response = await request(app).post(webhookPath).send(payload);
    const { statusCode } = response.body;
    expect(statusCode).toBe(200);
  });

  it('should respond with an object containing a message displaying Payload received', async () => {
    const response = await request(app).post(webhookPath).send(payload);
    const { message } = response.body;
    expect(message).toBe('Payload received');
  });

  it('should respond with a payload containing the data within the init object {payload}', async () => {
    const response = await request(app).post(webhookPath).send(payload);
    const { data } = response.body;
    expect(data).toEqual(payload);
  });

  it('should respond with a payload containing the data decoded_payload which contains the co2 and temperature', async () => {
    const response = await request(app).post(webhookPath).send(payload);
    // destructure incoming payload data: uplink_message: { decoded_payload }
    const { data } = response.body;
    const { uplink_message } = data;
    expect(uplink_message.decoded_payload.receivedString).toBe('400:22\x00\x00');
  });

  it('should respond with a payload containing the data end_device_ids which contains the device_id', async () => {
    const response = await request(app).post(webhookPath).send(payload);
    const { data } = response.body;
    const { end_device_ids } = data;
    expect(end_device_ids.device_id).toBe('00d3c69800bff312');
  });

  it('should respond with a payload containing the data application_ids which contains the id co2-test', async () => {
    const response = await request(app).post(webhookPath).send(payload);
    const { data } = response.body;
    const { end_device_ids } = data;
    expect(end_device_ids.application_ids.application_id).toBe('co2-test');
  });
});

describe('GET endpoints', () => {
  afterAll(() => {
    server.close();
  });

  it('should respond with a 200 OK', async () => {
    const response = await request(app)
      // get the root path
      .get('/');
    expect(response.status).toBe(200);
  });

  it('should return an object containing a statusCode of 200', async () => {
    const response = await request(app).get('/');
    const { statusCode } = response.body;
    expect(statusCode).toBe(200);
  });

  it('should return a message displaying Available endpoints', async () => {
    const response = await request(app).get('/');
    const { message } = response.body;
    expect(message).toBe('Available endpoints');
  });

  it('should return an object containing an endpoint of [POST]: /api/v1/....', async () => {
    const response = await request(app).get('/');
    const { endpoints } = response.body;
    expect(endpoints).toBe('[POST]: /api/v1/integration/webhook');
  });
});
