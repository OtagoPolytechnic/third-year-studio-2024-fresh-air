import { PrismaClient } from "@prisma/client";
import seedDevices from "./seedDevices.json" assert { type: 'json'};

const prisma = new PrismaClient();

const main = async () => {
    try {
        for (let i = 0; i < seedDevices.data.length; i++) {
            const deviceSeed = seedDevices.data[i];
            const existingDevices = await prisma.device.findFirst({
                where: {
                    OR: [
                        {
                            dev_eui: seedDevices.data[i].dev_eui
                        },
                        {
                            deviceId: seedDevices.data[i].deviceId
                        }
                    ]
                }
            })

            if (!existingDevices) {
                const { room_number, deviceId, dev_eui } = deviceSeed;
                await prisma.device.create({
                    data: {
                        room_number,
                        deviceId,
                        dev_eui
                    }
                });

                console.log(`Device ${deviceName} seeded`);
            }
        }
        // await prisma.$disconnect();
    } catch (error) {
        console.error('Error seeding', error);
        await prisma.$disconnect();
        process.exit(1);
    }
}

main();