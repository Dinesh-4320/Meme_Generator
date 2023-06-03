pipeline {
  agent any
  stages {
    stage('Build'){
      steps{
        sh '''
          sudo docker-compose -f docker-compose-prod.yml up --build
         '''
      }
    }
  }
}
