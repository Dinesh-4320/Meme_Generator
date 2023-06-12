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
      steps{
        script{
          def scannerHome = tool 'Meme-Sonar-Scanner'
        }
        withSonarQubeEnv('SonarQubeServer') {
          sh '''
          /var/lib/jenkins/tools/hudson.plugins.sonar.SonarRunnerInstallation/Meme-Sonar-Scanner/bin/sonar-scanner \
          -Dsonar.projectKey=Meme-Generator-Scan \
          -D sonar.host.url=http://192.168.43.253:9000 \
          -D sonar.login=sqp_a1cf4154cbd5a8ce062b46a527cfb8d6cc5cae99
          '''
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
