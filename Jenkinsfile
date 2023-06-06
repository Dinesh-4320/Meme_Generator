pipeline {
  agent none
    stage('Deliver'){
      steps{
        sh '''
          docker-compose -f docker-compose-prod.yml up --build
        '''
      }
    }
  }
}
