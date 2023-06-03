pipeline {
  agent any
  stages {
    stage('Build'){
      steps{
        sh '''
          docker start
          docker-compose -f docker-compose-prod.yml up --build
         '''
      }
    }
  }
}
