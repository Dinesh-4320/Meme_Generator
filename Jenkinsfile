pipeline {
  agent any
  stages {
    stage('Build'){
      steps{
        sh '''
          docker build -t meme-generator .
          docker run meme-generator
         '''
      }
    }
  }
}
