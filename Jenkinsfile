pipeline {
  stages {
    stage('Build'){
      sh '''
        docker-compose up -f docker-compose-prod.yml
      '''
    }
  }
}
