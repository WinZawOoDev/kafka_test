const { Kafka } = require('kafkajs')

const msg = process.argv[2];
run();
async function run() {

    try {
        const kafka = new Kafka({
            clientId: 'my-app',
            brokers: ['winzawoo-X510UNR:9092']
        })

        const producer = kafka.producer();
        console.log(`connecting...`)
        await producer.connect();
        console.log(`connected`)

        const partition = msg[0] < "N" ? 0 : 1;
        const result = await producer.send({
            topic: 'Users',
            messages: [
                { value: msg, partition }
            ]
        })

        console.log(`Send Successfully! ${JSON.stringify(result)}`)
        await producer.disconnect();
    } catch (error) {
        console.log(error)
    }



}