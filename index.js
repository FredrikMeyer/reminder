#!/usr/bin/env node

const program = require('commander');
const process = require('process');

const { spawn } = require('child_process');

program.option('-m, --minutes <minutes>', 'Remind in x minutes');
program.option('-h, --hours <hours>', 'Remind in x hours');
program.parse(process.argv);

const message = program.args.join(" ")

if (program.minutes) {
    const { minutes } = program.opts()
    const parsedMinutes = parseFloat(minutes)
    console.log(`Reminding you in ${parsedMinutes} minute(s).`)
    spawnReminder(parsedMinutes, message)
} else if (program.hours) {
    const { hours } = program.opts()
    const parsedHours = parseFloat(hours)
    console.log(`Reminding you in ${parsedHours} hour(s).`)
    spawnReminder(hours * 60, message)
}

function spawnReminder(minutes, message) {
    spawn('./notifyIn.js', [JSON.stringify({minutes, message: message})], {
        stdio: 'inherit',
        detached: true
    }).unref()
}
