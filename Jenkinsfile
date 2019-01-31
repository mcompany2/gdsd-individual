pipeline {
    agent any
    environment {
       env = "ci"
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
        stage ('build-backend'){
            steps {
                sh 'node .'
            }
        }
        stage ('build-frontend'){
            steps {
                sh 'cd client'
                sh './node_modules/.bin/ng serve'
            }
        }
    }
}
