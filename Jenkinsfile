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
        stage ('install-dependencies') {
            steps {
              sh 'npm install'
              sh 'cd client && npm install'
            }
        }

        stage ('build-frontend'){
            steps {
                sh 'cd client && npm i && node --max_old_space_size=4096 ng build --prod'
                sh 'echo "FRONTEND BUILD SUCCESSFULL"'
            }
        }
        stage ('test-frontend'){
            steps {
                sh 'cd client && ng test'
                sh 'cd client && ng e2e'
            }
        }
    }
}
