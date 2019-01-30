pipeline {
    agent any
    environment {
       CXX = "g++-4.9.4"
       LD = "g++-4.9.4"
       ETL_MKL = 'true'
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
        stage ('build'){
            steps {
                sh 'node .'
                sh 'cd client'
                sh 'cd client'
            }
        }
    }
}
