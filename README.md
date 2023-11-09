# node-mentoring-shop
[https://d17btkcdsmqrmh.cloudfront.net/node-gmp/docs/deploy-and-tools/homework](https://d17btkcdsmqrmh.cloudfront.net/node-gmp/docs/deploy-and-tools/homework)

We are going to create an Express application for online shop which sells different types of products (like e.g Amazon).

In this task we will need to modify existing [Express application](https://github.com/kandalova/node-mentoring-shop/pull/4) and perform the following changes:

- Update config management to use environment variables instead of hardcoded values.
- Implement graceful shutdown.
- Add health check API endpoint with DB connection check.
- Add debug logs to the most significant/important places/services of the app; update npm scripts to run the app with a proper debug logs (based on env variable).
- Add logger service using [Winston](https://www.npmjs.com/package/winston) add logging of incoming requests (method, path) and request handling (response) time.
- Dockerize the app according to best practises; try getting an image with as minimal size as possible.
- Use Docker compose for all the local infrastructure (app and DB).
- Set up free container registry (DockerHub) and publish your image there; pull image from registry and run it. [My registry](https://hub.docker.com/repository/docker/leylakandalova/nm_shop/general)

Todo:
- Add few [husky](https://www.npmjs.com/package/husky) hooks to your app to: check the [commit](https://www.npmjs.com/package/@commitlint/config-conventional) message, run linting script on commit, run unit tests on push; setup any static code analyser and perform quality scan over your app; check whether you have secure npm dependencies.
- Create a repository in internal GitBud.epam.com; push the code of your Node.js app there; based on the sample template create .gitlab-ci.yml template to run a simple CI/CD which will contain all the jobs from the mandatory part (eslit, tests, npm audit, build stage (dockerise the app), and (optionally) static code analysis) that will be executed by shared worker; investigate GitLab CI/CD capabilities, and push the template to start and test the pipeline (note, that your pipeline can be executed with some delay due to a limited capacity of shared workers); providing you created a cloud container registry (AWS ECR, DockerHub, etc.), configure credentials and push the built docker image to the container registry from the pipeline;

**Setup for startring (once)**

In the project root folder

- Install [podman](https://podman.io/docs/installation)
- Install [podman-compose](https://github.com/containers/podman-compose#installation)
- Init podman machine `podman machine init`
- Install [MongoDB server](https://www.mongodb.com/try/download/community)
- Install MongoDB tools to connect to MongoDB: [Shell](https://www.mongodb.com/try/download/shell) or [Compass Gui](https://www.mongodb.com/try/download/compass)

**To start(every time)**
- `podman machine start` - start virtual machine
- `podman-compose up` - build image and start container from `docker-compose.yaml`. Without `-d` flag as it will be needed to agree with some npm instaling. 
- `podman-compose up --build` - rebuild and start
- `podman ps` - check running containers

**To use docker regisrtry**
- `podman login docker.io`

***For every single image*** 
- `podman tag api:v1 [docker_user]/[repo]:[version]`
- `podman push [docker_user]/[repo]:[version]`
- `podman pull docker.io/[docker_user]/[repo]:[version]`
- `podman run docker.io/[docker_user]/[repo]:[version]`

***For all images with podman-compose*** 
- add registry link (docker.io/[docker_user]/[repo]:[version]) in the `image` field in `docker-compose.yaml`
- `podman-compose build --pull` - build image
- `podman-compose push` - upload to docker hub
- `podman-compose pull` - get images from docker hub
- `podman-compose up` - run containers from images


**API endpoints**

[swagger](https://github.com/kandalova/node-mentoring-shop/blob/task_9_authorization/swagger.md)

![image](https://github.com/kandalova/node-mentoring-shop/assets/26093763/cfdc8b06-f10c-4c05-8d9c-335a30572dde)
