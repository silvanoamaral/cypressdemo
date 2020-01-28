node('tmb-free-jenkins-slave-01') {
  //dockerCheck()
  gitCheckout()
  
  installNPM()
  verify()
  test()
}

def gitCheckout() {
  stage 'git checkout'
  git credentialsId: 'cfff4ba0-8a9d-47d4-8fd1-5b34c03eb4cf', url: 'https://github.com/netshoes/ff-webstore-e2e.git', branch: 'master'
}

def installNPM() {
  stage "Install npm"
  sh 'npm install'
}

def dockerCheck() {
  stage "dockerCheck"

  sshagent{
    docker {
      image 'cypress/base:8'
    }
  }
}

def verify() {
  stage "Verify that Cypress"
  sh 'npm run cy:verify'
}

def test() {
    stage 'Run test'
}
