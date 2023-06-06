pipeline {
  agent none
    stage('Deliver'){
      steps{
        sh '''
          docker-compose -f Dockerfile.prod up --build
        '''
      }
    }
  }
}
