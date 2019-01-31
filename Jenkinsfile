pipeline {
    agent any
    environment {
       NODE_ENV = "production"
    }
    stages {
        stage ('git'){
            steps {
                sh 'node -v'
                sh 'npm -v'
                sh 'env'
            }
        }
        stage ('pre-analysis') {
            steps {
              sh 'npm install'
              sh 'cd client && npm install'
            }
        }
        // stage ('build-backend'){
        //     steps {
        //         sh 'node .'
        //     }
        // }

        stage ('build-frontend'){
            steps {
                sh 'cd client && npm i && ./node_modules/.bin/ng build --prod'
            }
        }
        stage ('test-frontend'){
            steps {
                // sh 'cd client'
                sh 'cd client && ./node_modules/.bin/ng test'
                sh 'cd client && ./node_modules/.bin/ng e2e'
            }
        }
    }
}
