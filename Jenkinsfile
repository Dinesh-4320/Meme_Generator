pipeline {
  agent any
  stages{
    stage('OWASP Dependancy Check'){
      steps{
        dependencyCheck additionalArguments: '''-f HTML 
        -s ./''', odcInstallation: 'OWASP-Dependancy-Check'
      }
    }
    stage('SonarQube Analysis') {
      def scannerHome = tool 'SonarQube Scanner 4.8.0.2856';
      steps{
        withSonarQubeEnv(SonarQubeServer) {
          sh "${scannerHome}/bin/sonar-scanner"
        }
      }
    }
    stage('Build'){
      steps{
        sh '''
          npm install
          npm run build
        '''
      }
    }
    stage('SSH transfer') {
      steps([$class: 'BapSshPromotionPublisherPlugin']) {
        sshPublisher(
        publishers: [
        sshPublisherDesc(
        configName: 'ansible', 
        transfers: [
        sshTransfer(
            sourceFiles: 'build/')
          ], 
        usePromotionTimestamp: false, 
        useWorkspaceInPromotion: false, 
        verbose: false)
          ]
      )
     }
    }
    stage('Deploying through Docker container') {
      steps([$class: 'BapSshPromotionPublisherPlugin']) {
        sshPublisher(
        publishers: [
        sshPublisherDesc(
        configName: 'ansible', 
        transfers: [
        sshTransfer(
          execCommand: '''ansible-playbook -i /home/disciklean/meme-generator/hosts /home/disciklean/meme-generator/ansible-localhost.yml
          ansible-playbook -i /home/disciklean/meme-generator/hosts /home/disciklean/meme-generator/ansible-docker.yml''',
          execTimeout: 120000)
          ], 
        usePromotionTimestamp: false, 
        useWorkspaceInPromotion: false, 
        verbose: false)
          ]
      )
      }
    }
  }
}
