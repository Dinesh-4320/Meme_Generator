pipeline {
  agent docker{
   image 'node'
   args ' -p 3000:3000 -u root:root '
  }
  stages{
    stage('Build'){
      steps{
        sh '''
          npm install
        '''
      }
    }
    stage('Deliver'){
      steps{
        sh '''
          npm run build
        '''
      }
    }
  }
}
