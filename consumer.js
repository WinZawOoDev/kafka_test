const { Kafka } = require('kafkajs')

run()

async function run() {
    try {
        const kafka = new Kafka({
            clientId: 'my-app',
            brokers: ['winzawoo-X510UNR:9092']
        })

        const consumer = kafka.consumer({ groupId: 'test' });
        console.log(`connecting....`)
        await consumer.connect();
        console.log(`connected`)

        consumer.subscribe({ topic: 'Users', fromBeginning: true })

        await consumer.run({
            eachMessage: async result => {
                console.log(`Msg ${result.message.value} on partition ${result.partition}`)
            }
        })
    } catch (error) {
        console.log(error)
    }

}