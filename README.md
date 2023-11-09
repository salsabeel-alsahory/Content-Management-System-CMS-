# Content-Management-System 
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
