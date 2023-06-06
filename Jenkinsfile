pipeline {
  agent none
  stages{
    stage('Deliver'){
      steps{
        sh '''
          docker-compose -f docker-compose-prod.yml up --build
        '''
      }
    }
  }
}
