
# Content-Management-System 
Welcome to the Content Management System (CMS) project, an initiative built after the training program with GSG (Gaza Sky Geeks). This project is the culmination of a comprehensive learning journey, where we, Suzan Ayesh and Salsabeel Alsahory, have applied this  project less than month and with an array of technologies and practices to create a robust and scalable CMS.
![cms](https://github.com/salsabeel-alsahory/Content-Management-System-CMS-/assets/100838193/538cea0b-ae17-4fcf-8c4e-264190d1fd4a)

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
10. GITHUB_TOKEN=your_github_token_for_actions
### Installation
1. Clone the repo
2. npm install
3. docker-compose up --build
## Testing
To run the automated tests for this system, you can use the following command:
npm run dev 
## Usage
After installation, you can start using the CMS to manage your content. Here are a few common operations:
- Create a new article: ...
- Update an existing article: ...
- Delete an article: ...
## API Endpoints
The CMS provides a RESTful API to interact with the content programmatically. Below are some of the available endpoints:
- `GET http://localhost:5000/tags/find?searchTerm=software`: search on specifice tag
- `POST http://localhost:5000/tags`: get all users
- `PUT http://localhost:3000/tags/{tagId}`: Update tag by ID
- `DELETE http://localhost:3000/tags/{tagId}`: Delete tag by ID
## Contact
For support or to contact the maintainers, please e-mail us at:

* Suzan Ayesh - suzan.ayesh11@gmail.com
* Salsabeel Alsahory - salsabeel.alsahoury@gmail.com

## Acknowledgment
* Special thanks to [GSG](https://gazaskygeeks.com/) for providing the learning environment.


