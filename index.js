#!/usr/bin/env node

const program = require('commander');
const process = require('process');

const { spawn } = require('child_process');

program.option('-m, --minutes <minutes>', 'Remind in x minutes');
program.option('-h, --hours <hours>', 'Remind in x hours');
program.option('-a, --alert', 'Use alert instead of notification. Only works on MacOS.')
program.parse(process.argv);

const message = program.args.join(" ")

if (program.minutes || program.hours) {
    const { minutes, hours } = program.opts()
    const totalMinutes = toMinutes(minutes, hours)
    console.log(`Reminding you in ${totalMinutes} minute(s).`)
    spawnReminder(minutes, message, program.alert)
}

function spawnReminder(minutes, message, useAlert) {
    spawn('./notifyIn.js', [
        JSON.stringify({minutes, message: message, useAlert: Boolean(useAlert)})], {
            stdio: 'inherit',
            detached: true
    }).unref()
}

function toMinutes(minuteString, hourString) {
    const mins = parseFloat(minuteString) || 0
    const hrs = parseFloat(hourString) || 0

    return hrs * 60 + mins
}
