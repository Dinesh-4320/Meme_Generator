pipeline {
  agent any
  stages {
    stage('Build'){
      steps{
        sh '''
          docker-compose up -f docker-compose.yml
        '''
      }
    }
  }
}
