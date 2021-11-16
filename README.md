
# GroupThree: CSC4710 Database Project
**_Contributors:_** Eisha Akbar, Tanvir Ahmed, Chris Gumieny, Caleb Obi, and Viona Veseli
##
## ToDo List version 2-- App Description
Create a web application to store a to-do list.

### Basic characteristics
- No user identification needed 
- The current user can see all the tasks

### Data 
  **_Tasks_**
Each task consists of
- Task description (required)
- Due date (required)
- Task category (optional)
- Priority level (optional) (Values: 1-4, where 1 is the highest priority)
- Status (active or completed)
> (Optional) means: optional to the user. So, the user does not have to provided that information. However, the database must store that information, if provided.

### Categories
Each task category consists of
- Name

### Functionalities
-	The current user can create, and edit tasks.
-	The current user can mark a task as completed.
-	Current user can create, and edit categories. 
-	The current user can edit only the name of a category.
-	The current user can edit Task description, Due date, Priority, and Task category.

### Views or reports
-	The default list view of the application will show overdue tasks and due-today tasks. Tasks will be sorted by priority.
-	The user can select other views based on categories. The tasks will be ordered by priority and due date.
-	The user can select a view for only completed tasks on a specific day. Tasks will be sorted by due date.

## Tech Stacks
| Software & Services | Purpose |
| ------ | ------ |
| React.js | UI Development |
| Node.js | Server Development |
| Express.js | API Development |
| Firebase | Temporary Deployment |
| Heroku (Clear DB) | Remote MYSQL & Deployment |
| Netlify | Hosting & Domain Setup |

## Architecture Diagram
![Image of Architecture Diagram](https://user-images.githubusercontent.com/82237730/142081881-732fc3bc-afa9-4136-b7bb-ae82a67a6e5e.png)

## API Endpoints
```sh
   /api/createTasksTable
   ```
```sh
   /api/createCategoriesTable
   ```
```sh
   /api/createTask
```
```sh
   /api/createCategory
   ```
```sh
   /api/getTasks
   ```
```sh
   /api/getTasksToday
   ```
```sh
   /api/getOverdueTasks
   ```
```sh
   /api/getCategories
   ```
```sh
   /api/getTasksByPriority/:priority
```
```sh
   /api/updateTask/:Tasks_id
   ```
```sh
   /api/updateCategory/:Categories_id
   ```
```sh
   /api/deleteTask/:Tasks_id
   ```
```sh
   /api/deleteCategory/:Categories_id
   ```   
## Resources
- [React Card] - Cards contain content and actions about a single subject.


[React Card]: <https://mui.com/components/cards/>
