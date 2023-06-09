pipeline {
  agent any
  stages{
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
            cleanRemote: false, 
            excludes: '', 
            execCommand: '''ansible-playbook -i /home/disciklean/meme-generator/hosts /home/disciklean/meme-generator/ansible-localhost.yml
            ansible-playbook -i /home/disciklean/meme-generator/hosts /home/disciklean/meme-generator/ansible-docker.yml''',
            execTimeout: 120000, 
            flatten: false, 
            makeEmptyDirs: false, 
            noDefaultExcludes: false, 
            patternSeparator: '[, ]+', 
            remoteDirectory: '', 
            remoteDirectorySDF: false, 
            removePrefix: '', 
            sourceFiles: 'build/')
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
