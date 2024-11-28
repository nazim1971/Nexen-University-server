Here's a comprehensive guide to set up your project, along with a template for a `README.md` file. This will help you get started with a clean and well-structured environment for your Node.js application using TypeScript, Express, and other related tools.

### **1. Project Setup**

1. **Initialize the Project**
   ```bash
   npm init -y
   ```

2. **Install Required Dependencies**
   ```bash
   npm i cors dotenv express mongoose node zod
   ```

3. **Install Development Dependencies**
   ```bash
   npm i -D @types/cors @types/express@4.17.21 @types/mongoose @types/node rimraf typescript nodemon
   ```

4. **Initialize TypeScript Configuration**
   ```bash
   tsc --init
   ```

5. **Adjust `tsconfig.json` file**
   - Ensure the TypeScript configuration (`tsconfig.json`) is set up as required. You can add specific settings like the following:
     ```json
     {
       "compilerOptions": {
         "target": "ES6",
         "module": "CommonJS",
         "esModuleInterop": true,
         "skipLibCheck": true,
         "forceConsistentCasingInFileNames": true,
         "outDir": "./dist",
         "rootDir": "./src"
       },
       "include": ["src/**/*"],
       "exclude": ["node_modules"]
     }
     ```

6. **Create `.gitignore` file**
   - Add `node_modules` and `.env` to `.gitignore` to avoid committing sensitive information or dependencies:
     ```
     node_modules
     .env
     ```

7. **Create `.env` file**
   - Add your secure keys and environment variables to `.env`:
     ```env
     DATABASE_URI=your-database-uri
     PORT=5000
     ```

8. **Create Folder Structure**
   - Create the following directory structure:
     ```
     src
     ├── app.ts
     ├── server.ts
     └── app
         ├── config
         ├── utilities
         ├── errors
         └── modules
             └── student
                 ├── student.controller.ts
                 ├── student.interface.ts
                 ├── student.model.ts
                 ├── student.route.ts
                 ├── student.service.ts
                 └── student.zodValidation.ts
     ```

9. **Modify `package.json` Scripts**
   - Add these scripts to the `package.json` file:
     ```json
     "scripts": {
       "dev": "nodemon src/server.ts",
       "build": "rimraf dist && tsc",
       "start": "node dist/server.js",
       "lint": "eslint src",
       "lint:fix": "eslint src --fix",
       "pretty:fix": "prettier --write src",
       "pretty": "prettier --ignore-path .gitignore --write ./src/**/*.{js,ts,json}"
     }
     ```

### **2. Install and Configure ESLint**

1. **Install ESLint and Related Plugins**
   ```bash
   npm install eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin --save-dev
   ```

2. **Initialize ESLint Configuration**
   ```bash
   npx eslint --init
   ```

   During setup, choose:
   - To use TypeScript.
   - For your preferred style (you can select "Airbnb" or configure your own rules).
   - Follow the prompts to create the `.eslintrc.mjs` file.

3. **Install ESLint Prettier Config to Avoid Conflicts**
   ```bash
   npm install --save-dev eslint-config-prettier
   ```

4. **Adjust `eslint.config.mjs` file**

   Ensure your ESLint configuration includes `eslint-config-prettier` to avoid conflicts with Prettier:
   ```javascript
   import pluginJs from '@eslint/js';
   import eslintConfigPrettier from 'eslint-config-prettier';

   export default [
     pluginJs.configs.recommended,
     eslintConfigPrettier,
   ];
   ```

### **3. Install Prettier**

1. **Install Prettier**
   ```bash
   npm i -D prettier
   ```

2. **Create `.prettierrc.json` File**

   Add your Prettier configuration in `.prettierrc.json`:
   ```json
   {
     "semi": true,
     "singleQuote": true,
     "trailingComma": "all",
     "tabWidth": 2,
     "printWidth": 80
   }
   ```

### **4. Create a Professional README.md File**

Here’s a sample template for your `README.md` file:

```markdown
# Backend Starter Template

## Overview
This is a backend starter template built with TypeScript, Express, and MongoDB. It is configured with tools like ESLint, Prettier, and Zod for input validation. This template is ready to be used for building scalable and maintainable backend applications.

## Features
- TypeScript support
- Express.js for building APIs
- MongoDB for database management
- Zod for schema validation
- ESLint and Prettier for code linting and formatting
- Dotenv for managing environment variables

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add the following environment variables:
   ```env
   DATABASE_URI=your-database-uri
   PORT=5000
   ```

## Available Scripts

- `npm run dev` - Runs the server with Nodemon (development mode).
- `npm run build` - Builds the project using TypeScript.
- `npm run start` - Runs the built server (production mode).
- `npm run lint` - Lint the codebase using ESLint.
- `npm run lint:fix` - Automatically fix linting issues.
- `npm run pretty` - Format the codebase using Prettier.
- `npm run pretty:fix` - Automatically fix Prettier formatting issues.

## Folder Structure
```
src/
├── app.ts
├── server.ts
└── app/
    ├── config/
    ├── utilities/
    ├── errors/
    └── modules/
        └── student/
            ├── student.controller.ts
            ├── student.interface.ts
            ├── student.model.ts
            ├── student.route.ts
            ├── student.service.ts
            └── student.zodValidation.ts
```

## Author
**Md. Nazim Uddin**  
Email: [nazimmuddin10@gmail.com](mailto:nazimmuddin10@gmail.com)

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
```

---

### **Final Notes:**
- **Ensure sensitive data** is stored securely in `.env`, and never commit `.env` to your version control system.
- Regularly **run linting and formatting scripts** (`npm run lint` and `npm run pretty`) to maintain consistent code style throughout the project.
- This setup can be easily extended for various modules, routes, and services as needed.

This structure and configuration will help you maintain a clean, scalable, and industry-standard backend project.
