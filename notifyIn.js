#!/usr/bin/env node

const notifier = require('node-notifier');
const { exec } = require('child_process');

const {minutes, message, useAlert} = JSON.parse(process.argv[2])

function notifyIn(minutes, message) {
    if (useAlert) {
        exec(`/usr/bin/osascript -e 'display alert "Reminder" message "${message}"'`)
    } else {
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
}

notifyIn(minutes, message);
