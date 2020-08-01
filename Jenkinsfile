pipeline {
    agent none
    options {
        // Skip default checkout behavior
        skipDefaultCheckout()
    }
    stages {
        stage('Checkout SCM') {
            agent { label "master" }
            steps {
                checkout scm
                script {
                    echo "get COMMIT_ID"
                    sh 'echo -n $(git rev-parse --short HEAD) > ./commit-id'
                    commitId = readFile('./commit-id')
                }
                // stash this current workspace
                stash(name: 'ws', includes:'**,./commit-id')
            }
        }
        stage('Running Script') {
            agent { label "master" }
            steps {
                sh('chmod +x script.sh')
                sh('./script.sh')
            }
        }
    }
}

