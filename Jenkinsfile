pipeline {
  agent any
  stages {
    stage('Build'){
      steps{
        sh '''
          docker-compose -f docker-compose.yml up --build
         '''
      }
    }
  }
}
