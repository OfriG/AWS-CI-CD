# AWS CI/CD Microservices Project

This project demonstrates the deployment of two Node.js microservices (`employee` and `customer`) to Amazon ECS using Docker containers and a CI/CD pipeline built with AWS CodePipeline, CodeDeploy, and ECR.

---

##  Project Structure

- `employee/` – Admin service for managing suppliers  
- `customer/` – Public-facing service for viewing supplier info  
- `deployment/` – Contains ECS Task Definitions and CodeDeploy AppSpec files  

---

## ️ Installation & Setup (Local / AWS Cloud9)

### Prerequisites

- Node.js (version 11+)
- AWS CLI configured
- AWS ECR & ECS setup (as in Capstone project)
- Docker installed
- AWS Cloud9 (recommended for testing)

### 1. Clone the Repository

```bash
git clone git@github.com:OfriG/AWS-CI-CD.git
cd AWS-CI-CD

 Run Employee Microservice Locally
cd employee
npm install
APP_DB_HOST=<your-db-endpoint> APP_PORT=8080 node server.js


Build & Push Docker Image to Amazon ECR
1. Build Docker Image-
docker build -t employee .
Tag the Image-
account_id=$(aws sts get-caller-identity --query Account --output text)
docker tag employee:latest $account_id.dkr.ecr.us-east-1.amazonaws.com/employee:latest
Push to ECR-
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin $account_id.dkr.ecr.us-east-1.amazonaws.com
docker push $account_id.dkr.ecr.us-east-1.amazonaws.com/employee:latest

CI/CD Deployment Pipeline
Trigger Conditions:
Image push to Amazon ECR

Updates to AppSpec or Task Definition in CodeCommit

Deployment Process:
CodePipeline detects new image and/or task definition

CodeDeploy launches a new Task Set on ECS

Traffic rerouted via Load Balancer (Blue/Green)

Health checks must pass on port 8080

