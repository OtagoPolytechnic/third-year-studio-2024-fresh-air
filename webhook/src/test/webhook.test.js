import request from 'supertest';
import {app, server} from '../app.js';
import { INDEX_PATHS } from '../utils/constants/globalConstants.js';

// xxxx/api/v1
const basePath = `/${INDEX_PATHS.BASE_URL}/${INDEX_PATHS.CURRENT_VERSION}`;

// xxxxx/api/v1/integration/webhook
const webhookPath = `${basePath}/integration/webhook`;

const payload = {
    end_device_ids: {
        device_id: "00d3c69800bff312",
        application_ids: { application_id: 'co2-test'},
        dev_eui: "00D3C69B00BFF312",
    },
    uplink_message: {
        f_port: 1,
        f_cnt: 323,
        frm_payload: 'NDAXXXXXX',
        decoded_payload: { receivedString: '400:22\x00\x00'},
    }
};

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

    it('should return payload data', async () => {
        const response = await request(app)
        .post(webhookPath)
        .send(payload)

        console.log(response.body);
        expect(response.status).toBe(200);
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe("Payload received");
        expect(response.body.data).toEqual(payload);
        expect(response.body.data.end_device_ids.device_id).toEqual('00d3c69800bff312')
    })
});


