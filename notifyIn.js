#!/usr/bin/env node

const notifier = require('node-notifier');

const {minutes, message} = JSON.parse(process.argv[2])

function notifyIn(minutes, message) {
    setTimeout(() => {
        notifier.notify({
            sound: true,
            wait: true,
            title: 'Reminder',
            message
        });
        console.log("Reminding done.")
    }, minutes * 60 * 1000)
}

notifyIn(minutes, message);
