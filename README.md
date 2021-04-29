# DarazAutomation

# Running it through Docker

- To build image

		docker build -t cypress-docker . -f cypress.Dockerfile

- To run cypress test in docker
- First create output directory

		mkdir output

- Run test in docker

		docker run -p 8123:8123 --ipc=host -v $PWD/output/:/DarazAutomation/cypress/output cypress-docker:latest


