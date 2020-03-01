#!/usr/bin/env node

const program = require('commander');
const process = require('process');

const { spawn } = require('child_process');

program.option('-i, --in <minutes>', 'Remind in x minutes');
program.option('-m, --message <message>', 'Message')
program.parse(process.argv);


if (program.in && program.message) {
    const minutesAsText = program.opts().in
    const minutes = parseFloat(minutesAsText)
    console.log(`Reminding you in ${minutes} minute.`)

    spawn('./notifyIn.js', [JSON.stringify({minutes, message: program.message})], {
        stdio: 'inherit',
        detached: true
    }).unref()
}
