pipeline {
  stages {
    stage('Build'){
      steps{
        sh '''
          docker-compose up -f docker-compose-prod.yml
        '''
      }
    }
  }
}
