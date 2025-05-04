## Authentication Routes (`/api/auth`)

* `POST /api/auth/login`:
    * **Request Body:**
        * `email` (string, required): User's email address.
        * `password` (string, required): User's password.
    * **Format:** JSON

* `POST /api/auth/register`:
    * **Request Body:**
        * `name` (string, required): User's full name.
        * `email` (string, required): User's email address.
        * `password` (string, required): User's password.
    * **Format:** JSON

## Task Routes (`/api/tasks`)

* `POST /api/tasks/create`:
    * **Request Body:**
        * `title` (string, required): Title of the task.
        * `description` (string, required): Description of the task.
        * `category` (string, required): Category of the task.
        * `assignedTo` (string, optional): ID of the user to whom the task is assigned.
        * `status` (string, required): Status of the task.
    * **Format:** JSON

* `PUT /api/tasks/update/:id`:
    * **Path Parameter:**
        * `id` (string, required): ID of the task to update.
    * **Request Body:**
        * Updates to the task properties (title, description, category, etc.) as needed.
    * **Format:** JSON

* `DELETE /api/tasks/delete/:id`:
    * **Path Parameter:**
        * `id` (string, required): ID of the task to delete.

* `PATCH /api/tasks/status/:id`:
    * **Path Parameter:**
        * `id` (string, required): ID of the task to update the status.
    * **Request Body:**
        * `status` (string, required): New status of the task.
    * **Format:** JSON

* `POST /api/tasks/assign`:
    * **Request Body:**
        * `taskId` (string, required): ID of the task to assign.
        * `friendId` (string, required): ID of the friend to assign the task to.
    * **Format:** JSON

## Friend Routes (`/api/friends`)

* `POST /api/friends/request`:
    * **Request Body:**
        * `toUserId` (string, required): ID of the user to send the friend request to.
    * **Format:** JSON

* `POST /api/friends/respond`:
    * **Request Body:**
        * `action` (string, required): "accept" or "reject".
        * `requestId` (string, required): ID of the user who sent the friend request.
    * **Format:** JSON

* `DELETE /api/friends/remove`:
    * **Request Body:**
        * `friendId` (string, required): ID of the friend to remove.
    * **Format:** JSON

## User Routes (`/`)

* `GET /api/dashboard`:
    * No request body or parameters.  The user's data is retrieved from the authentication middleware.
 
- I can't finished the full project .. need some more tiem to complete it and emplement more options
