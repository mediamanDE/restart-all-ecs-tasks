const execSync = require('child_process').execSync;

module.exports = class Ecs {

    /**
     * @param {string} clusterName
     * @param {string} awsBinary
     */
    constructor(clusterName, awsBinary) {
        this._clusterName = clusterName;
        this._awsBinary = awsBinary;
    }

    /**
     * Restart all tasks on the cluster
     */
    restartAllTasks() {
        const tasks = this._listTasks();
        let tasksRestarted = 0;

        while (tasksRestarted < tasks.length) {
            const taskArn = tasks[tasksRestarted];
            let taskRestarted = false;

            execSync(`${this._awsBinary} ecs stop-task --cluster ${this._clusterName} --task ${taskArn}`);

            while (!taskRestarted) {
                process.stdout.write('.');

                const updatedTasks = this._listTasks();

                if (!this._isTaskRunning(taskArn)
                    && updatedTasks.length === tasks.length) {
                    process.stdout.write("\n" + `Task ${taskArn} restarted` + "\n");

                    taskRestarted = true;
                }
            }

            tasksRestarted++;
        }
    }

    /**
     * Get a list of all tasks on the cluster
     *
     * @returns {string[]} - Array of task ARNs
     * @private
     */
    _listTasks() {
        const stdout = execSync(`${this._awsBinary} ecs list-tasks --cluster ${this._clusterName}`);
        const result = JSON.parse(stdout.toString());

        return result.taskArns;
    }

    /**
     * Check if a tas is running
     *
     * @param {string} taskArn
     * @returns {boolean}
     * @private
     */
    _isTaskRunning(taskArn) {
        const stdout = execSync(`${this._awsBinary} ecs describe-tasks --cluster ${this._clusterName} --tasks ${taskArn}`);
        const taskDescription = JSON.parse(stdout.toString());

        return (taskDescription.tasks[0].lastStatus === 'RUNNING');
    }
};
