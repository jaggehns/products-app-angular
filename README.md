# Products App - Angular

This project is a **Product Management Application** built with **Angular 13** and **Angular Material**, allowing users to manage products with features like adding, updating, deleting, and viewing products. The app also provides functionalities like pagination and filtering to improve user experience.

<img width="1723" alt="Screenshot 2024-09-23 at 8 22 04 AM" src="https://github.com/user-attachments/assets/64ae24b7-60a4-48fc-a35d-136335452be1">
<img width="1727" alt="Screenshot 2024-09-23 at 8 22 14 AM" src="https://github.com/user-attachments/assets/c56ca979-ea73-436e-b7b0-387f08b0b531">


## Technologies Used

- **Angular 13**: The front-end framework used for the application.
- **TypeScript**: For strongly-typed JavaScript.
- **Angular Material**: For building a responsive and modern UI.
- **RxJS**: For handling asynchronous events using observables.
- **SCSS**: For styling the components with more control and features than plain CSS.

## Features

- **Add Products**: Users can add new products with name, price, quantity, and description.
- **View Products**: All products are listed in a table with pagination.
- **Search**: Users can search for products by name or ID.
- **Update Products**: Users can edit the details of existing products.
- **Delete Products**: Users can remove products from the database.
- **Pagination**: Large lists of products are paginated to improve performance and usability.

## Node.js Version

To ensure compatibility with **Angular 13**, it is recommended to use **Node.js version 16.10.0**.

## Installation and Setup

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-repository/products-app-angular.git
   cd products-app-angular
   ```
   
2. **Install dependencies**

- Make sure you're using **Node.js v16.10.0**. You can check you version with:

  ```bash  
  node -v
  ```
- If you have the correct version, install the necessary dependencies:

  ```bash  
  npm install
  ```

- he app will run at `http://localhost:4200/` by default.

3. **Run the development server**

- Once the dependencies are installed, you can start the development server:

  ```bash  
  npm start
  ```

4. **Running Tests**

- To run the tests for the application, use:

  ```bash  
  npm run test
  ```


## Folder Structure

```bash
src/
├── app/
│   ├── dialog/
│   │   ├── dialog.component.html
│   │   ├── dialog.component.scss
│   │   └── dialog.component.spec.ts
│   ├── services/
│   │   ├── api.service.spec.ts
│   │   └── api.service.ts
│   ├── app-routing.module.ts
│   ├── app.component.html
│   ├── app.component.scss
│   ├── app.component.spec.ts
│   ├── app.component.ts
│   ├── app.module.ts
│   ├── assets/
│   ├── environments/
│   ├── models/
│   │   └── product.model.ts
├── index.html
├── main.ts
.gitignore
angular.json
db.json
karma.conf.js
package.json
README.md
tsconfig.app.json
tsconfig.json
tsconfig.spec.json
```

## Key Folders and Files

- **`src/app/dialog/`**: Contains the dialog component that handles the form interactions for adding and updating products.
  - `dialog.component.html`: The HTML template for the dialog.
  - `dialog.component.scss`: The SCSS file for styling the dialog component.
  - `dialog.component.spec.ts`: The test file for the dialog component.

- **`src/app/services/`**: Contains the service for handling API requests.
  - `api.service.ts`: Manages HTTP requests to the backend.
  - `api.service.spec.ts`: Unit tests for the `api.service.ts`.

- **`src/app/app.component.ts`**: The root component of the application.

- **`src/app/models/`**: Defines the Product model used for data handling.

- **`src/app/app-routing.module.ts`**: The routing module that defines application routes.

- **`src/app/app.module.ts`**: The main module that imports other modules and declares components.

- **`angular.json`**: Angular CLI configuration file.


## Future Enhancements

- **Authentication**: Implement a secure authentication mechanism to protect certain features.
- **Authorization**: Use role-based access control for features like adding, updating, and deleting products.
- **Filtering and Sorting**: Add more advanced filtering and sorting options on the product list.
- **UI Enhancements**: Improve the design and responsiveness of the UI using more advanced Angular Material components.

