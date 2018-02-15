#! /usr/bin/env node

const program = require('commander');
const Ecs = require(`./../Ecs`);

program.version('0.0.1')
    .option('-c, --cluster [value]', 'ECS cluster arn')
    .option('-b, --binary [value]', 'Path to AWS CLI binary')
    .parse(process.argv);

const cluster = program.cluster;
const binary = program.binary || 'aws';

const ecs = new Ecs(cluster, binary);

ecs.restartAllTasks();
