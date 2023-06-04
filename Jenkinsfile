pipeline {
  agent {
    docker {
       image 'node:20-alpine3.17'
       args '-p 3000:3000' 
    }
  }
  environment{
      CI='true' 
    }
  stages {
    stage('Build'){
      steps{
        sh '''
          npm install 
         '''
      }
    }
    stage('Test'){
    }
  }
}
