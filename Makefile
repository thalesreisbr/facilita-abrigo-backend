run:
	docker stop tfg-backend || exit 0
	docker rm -f tfg-backend || exit 0
	docker build -t tfg-backend-img .
	docker run --name tfg-backend -d -p 3000:3000 --network="host" --restart always tfg-backend-img
	docker logs -f tfg-backend

stop:
	docker stop tfg-backend || exit 0

remove:
	docker stop tfg-backend || exit 0
	docker rm -f tfg-backend || exit 0
	docker image rm tfg-backend-img || exit 0

build:
	docker build -t tfg-backend-img .

runSonar:
	docker run -d --name sonarqube -e SONAR_ES_BOOTSTRAP_CHECKS_DISABLE=true -p 9000:9000 sonarqube:latest

stopSonar:
	docker stop sonarqube

removeSonar:
	docker stop sonarqube || exit 0
	docker rm -f sonarqube || exit 0
	docker image rm sonarqube:latest || exit 0