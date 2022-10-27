module.exports = {
    apps: [
        {
            name: 'ui',
            exec_mode: 'cluster',
            instances: 1, // Or a number of instances
            script: './node_modules/.bin/next',
            args: 'start',
            env: {
                PORT: '3020',
            }
        },
 {
            name: 'ui1',
            exec_mode: 'cluster',
            instances: 1, // Or a number of instances
            script: './node_modules/.bin/next',
            args: 'start',
            env: {
                PORT: '3021',
            }
        },
 {
            name: 'ui2',
            exec_mode: 'cluster',
            instances: 1, // Or a number of instances
            script: './node_modules/.bin/next',
            args: 'start',
            env: {
                PORT: '3022',
            }
        },
 {
            name: 'ui3',
            exec_mode: 'cluster',
            instances: 1, // Or a number of instances
            script: './node_modules/.bin/next',
            args: 'start',
            env: {
                PORT: '3023',
            }
        }


    ]
}
