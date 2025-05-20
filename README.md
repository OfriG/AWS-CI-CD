AWS CI/CD Microservices Project
This project demonstrates a full CI/CD pipeline setup for microservices using AWS Cloud9, ECS, ECR, and CodePipeline.
Prerequisites
Make sure the following tools and services are configured:
•	Node.js (version 11+)
•	Docker installed and running
•	AWS CLI configured with credentials
•	AWS ECR and ECS (setup as part of your Capstone project)
•	AWS Cloud9 (recommended for development and testing)
Installation & Setup (AWS Cloud9)
1. Clone the Repository
bash
CopyEdit
git clone https://github.com/OfriG/AWS-CI-CD.git
cd AWS-CI-CD
If you're working on the dev branch:
bash
CopyEdit
git checkout dev
2. Run the Employee Microservice Locally
bash
CopyEdit
cd employee
npm install
APP_DB_HOST=<your-db-endpoint> APP_PORT=8080 node server.js
Example:
bash
CopyEdit
APP_DB_HOST=supplierdb.xxxxxx.us-east-1.rds.amazonaws.com APP_PORT=8080 node server.js
Build & Push Docker Image to Amazon ECR
1. Build Docker Image
bash
CopyEdit
docker build -t employee .
2. Tag the Image
bash
CopyEdit
account_id=$(aws sts get-caller-identity --query Account --output text)
docker tag employee:latest $account_id.dkr.ecr.us-east-1.amazonaws.com/employee:latest
3. Authenticate & Push to ECR
bash
CopyEdit
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin $account_id.dkr.ecr.us-east-1.amazonaws.com
docker push $account_id.dkr.ecr.us-east-1.amazonaws.com/employee:latest
CI/CD Deployment Pipeline
•	Trigger: Image push to Amazon ECR
•	Action: CodePipeline detects the new image or updated task definition
•	Result: ECS launches a new Task Set (Blue/Green deployment)
•	Traffic is routed via Application Load Balancer (ALB)
•	Health check on / must pass on port 8080
Working with CodeCommit
If using CodeCommit as the deployment trigger:
bash
CopyEdit
cd deployment
git add .
git commit -m "Updated task definition or appspec"
git push origin dev
Verifying Deployment
Once deployed via ECS:
bash
CopyEdit
curl http://<your-load-balancer-dns>:8080/health

