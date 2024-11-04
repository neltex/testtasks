Steps to run the project:
    - Clone the project
    - Run `npm install`
    - Run `php artisan migrate`
    - Run `php artisan serve`

    With Docker:
    - Run `docker-compose up -d`
    - Run `docker-compose exec app php artisan migrate`
    - Run `docker-compose exec app php artisan serve`


Authorization:
    - Relationships
      - User has many tasks (Defined in User model)
      - Task belongs to a user (Defined in Task model)
      - TasksController only has access to tasks that belong to the authenticated user
    - Middleware
      - Authenticated users can only access the tasks that belong to them

Authentication:
    - Login
    - Register
    - Logout
    - Forgot Password
    - Reset Password
  
UI/UX:
    - CRUD Operations
        - Create Tasks with title, due date, and description with validation.
          - Users dont have to refresh the page or navigate to another page to create a task. (Better UX)
        - Read the created tasks (Referenced in TasksCard)
        - Update the tasks (Referenced in TasksCard)
            - Users can update the title, due date, and description of the task.
            - Users can also update the status from a dropdown (Pending, In Progress, Completed)
        - Delete the tasks (Referenced in TasksCard)
    - Profile
        - Users can update their profile information (Name, Email, Password)
    - Validation:
    - Toast Notifications:
        - Toast notifications are displayed when a task is created, updated, or deleted.
    - Error Handling:
        - Errors are displayed in a toast notification.

Running Tests:
    - Run `php artisan test` to run the tests
    - Tests are located in the tests/Feature directory
        - TasksControllerTest (Tests the CRUD operations of the TasksController)
    - Tests are written using PHPUnit

Docker:
    - Docker is used to run the project in a containerized environment. This is deployed on ECS.
    - Dockerfile sets the base image and docker compose is used to run both the frontend and backend.

CI/CD:
    - Github Actions is used for CI/CD.
    - The workflow is triggered on push and pull requests.
    - The workflow runs the tests and deploys the project to ECS.

