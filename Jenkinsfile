pipeline {
  stages {
    agent none
    stage('Build'){
      steps{
        sh '''
          docker-compose up -f docker-compose-prod.yml
        '''
      }
    }
  }
}
