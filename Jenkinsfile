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
          -Dsonar.projectKey=MemeGenerator \
          -D sonar.host.url=http://127.0.0.1:9000 \
          -D sonar.login=sqa_8c50db09b1ed8b1833399e24418b104e3fccc28a
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
          docker run -v ${PWD}:/zap/wrk/:rw --user root -t owasp/zap2docker-stable zap-baseline.py -t http://3.88.45.137:80 --auto
        '''
      }
    }
  }
}
