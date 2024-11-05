**Steps** to run the project:
    - Clone the project
    - Run `npm install`
    - Run `php artisan migrate` (Must have MySQL installed)
    - Run `php artisan serve`
    - Run `npm run dev`

    With Docker (Recommended):
    - Run `docker-compose up -d --build`
    - Run `docker-compose exec -it laravel-app bash && rm -rf public/hot`
    - View the project on `http://localhost:8000`



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
      - Validation is done on the frontend and backend.
      - Application ensures all fields are being entered before submitting the form.
      - Progress bar is displayed when the form is being submitted.
    - Error Handling:
        - Errors are displayed in a toast notification.
    - Build Tools:
        - Vite.js is used to build the frontend and make it faster at build time.

Running Tests:
    - Run `php artisan test` to run the tests
    - Tests are located in the tests/Feature directory
        - TasksControllerTest (Tests the CRUD operations of the TasksController)
    - Tests are written using PHPUnit

Docker:
    - Docker is used to run the project in a containerized environment. This is deployed on ECS.
    - Dockerfile sets the base image and docker compose is used to run both the frontend and backend.
    - However, the docker compose is the structure to run the project with all of its services with different images inside one container.

CI/CD:
    - Github Actions is used for CI/CD.


