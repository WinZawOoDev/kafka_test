const { Kafka } = require('kafkajs')

run()
async function run() {

    try {
        const kafka = new Kafka({
            clientId: "my-app",
            brokers: ["winzawoo-X510UNR:9092"]
        })

        const admin = kafka.admin();
        console.log(`connecting...`)
        await admin.connect()
        console.log(`connected`)
        await admin.createTopics({
            waitForLeaders: true,
            topics: [{
                topic: "Users",
                numPartitions: 1
            }]
        })
        console.log("Created Successfully!")
        await admin.disconnect();

    } catch (error) {
        console.error(error)
    }
}