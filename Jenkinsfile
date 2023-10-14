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
          /var/lib/jenkins/tools/hudson.plugins.sonar.SonarRunnerInstallation/Meme-Sonar-Scanner/bin/sonar-scanner -X \
          -Dsonar.projectKey=Meme-Generator-Scan \
          -D sonar.host.url=http://127.0.0.1:9000 \
          -D sonar.login=sqp_46b19f514fcd2172a69fe86b6c62ea9b2b8c11f7
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
    stage('DAST'){
      steps{
        sh '''
          docker run -v $(PWD):/zap/wrk/:rw --user root -t owasp/zap2docker-stable zap-baseline.py -t https://3.94.92.57 --auto
        '''
      }
    }
  }
}
