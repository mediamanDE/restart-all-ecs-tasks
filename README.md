# restart-all-ecs-tasks

> CLI tool to restart all ECS tasks inside a cluster

This project was born out of the need to restart all ECS tasks automatically, without having duplicate service definitions.
 
The commend restarts all tasks inside a given cluster, one at a time. After stopping one tasks it waits until the ECS service has started a new tasks before it stops the next one.

## Installation

```
$ npm install -g @mediaman/restart-all-ecs-tasks
```

## Basic usage

You can restart all ECS tasks on a given cluster with the `restart-all-ecs-tasks` command:

```
$ restart-all-ecs-tasks -c arn:aws:ecs:region:1234567890123:cluster/environment
```

## Binary path

By default the `restart-all-ecs-tasks` commands executes the `aws` binary. If your environment is not configured properly and you need to specify the full path to the `aws` binary you can specify it using the `-b` or `--binary` option.

```
$ restart-all-ecs-tasks -c arn:aws:ecs:region:1234567890123:cluster/environment -b /usr/local/bin/aws
```
