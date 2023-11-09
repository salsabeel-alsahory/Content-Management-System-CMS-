# Content-Management-System 
Welcome to the Content Management System (CMS) project, an initiative built during a training program with GSG (Gaza Sky Geeks). This project is the culmination of a comprehensive learning journey, where we, Suzan Ayesh and Salsabeel Alsahory, have applied an array of technologies and practices to create a robust and scalable CMS.

This README will guide you through the project's structure, setup, and deployment, providing you with the necessary details to understand and contribute to the project.

## Project Description
This project is a Content Management System (CMS) designed to handle digital content with ease and efficiency. It allows users to create, manage, and publish content without needing technical knowledge.

## Technology Stack
- Backend: Node.js, Express.js
- Database: [MySQL(install [Xampp](https://www.apachefriends.org/download.html) ) then change it form locally to  RDS-AWS]
- Authentication: [JWT]
- Containerization: Docker
- CI/CD: GitHub Actions
- Cloud: AWS Services including S3 for storage, EC2 for compute power, and RDS for relational database management
## File Structure
- `Category.ts`: Defines the category schema for content categorization.
- `Content.ts`: Handles the content items and their related operations.
- `Media.ts`: Manages file uploads and media content.
- `Permission.ts`: Controls permissions for different roles.
- `Profile.ts`: User profile information.
- `Role.ts`: Defines various user roles and their capabilities.
- `Tag.ts`: Tag schema for content organization.
- `userdb.ts`: User database interactions.
## Getting Started
To get a local copy up and running, follow these simple steps.

### Prerequisites
- Node.js
- Docker

### Installation
1. Clone the repo
2. npm install
3. docker-compose up --build
4. nmp run dev
## .env
You should build file with name `.env` with those varible the create then in github value
### Database Configuration

1. DB_HOST=your_database_host
2. DB_PORT=your_database_port
3. DB_USERNAME=your_database_username
4. DB_PASSWORD=your_database_password
5. DB_NAME=your_database_name
### AWS Configuration
6. AWS_REGION=your_aws_region
7. ACCESSKEYID=your_aws_access_key_id
8. SECRETACCESSKEY=your_aws_secret_access_key
### Application Secrets
9. SECRET_KEY=your_secret_key_for_jwt_or_other_encryption_techniques
### GitHub Token for CI/CD Actions
GITHUB_TOKEN=your_github_token_for_actions



