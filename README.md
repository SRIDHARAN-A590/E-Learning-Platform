# OnLearn - E-Learning Platform

An interactive programming study platform for mastering **Java**, **Python**, **C**, and **JavaScript**, featuring an in-browser Python runner, interactive study modules, and an AI mentor (Jarvis).

---

## 🛠️ Technology Stack Used

### 1. Frontend
- **React.js**: Modular, component-driven user interface managing application state for navigation, lesson completion, and real-time interactive views.
- **JavaScript (ES6+)**: Core client logic, state transitions, async API requests, and DOM rendering.
- **CSS3 / Vanilla CSS**: Reusable responsive layouts, custom sidebar styling (`homepagestyle (1).css`), linear gradients, modals, and Bootstrap 4 grid utilities.
- **Pyodide (WebAssembly)**: In-browser client-side Python execution environment allowing students to run code without backend compilers.

### 2. Authentication
- **Firebase Authentication**: Secure user registration, sign-in, and session management using email and password via Firebase Auth SDK (`login-5721e` project).

### 3. Hosting & Deployment
- **Firebase Hosting**: Fast, production-grade SSL-enabled static web hosting configured with `firebase.json` and `.firebaserc` for continuous deployment.

### 4. Database (DBMS / Evaluation)
- **MySQL Database & MySQL Workbench**: Relational schema provided in `database/schema.sql` defining `users` and `user_progress` tables for DBMS lab demonstration and query analysis.

---

## 🚀 Running the Project

### Start Development Server:
```bash
cd client
npm run dev
```

### Deploy to Firebase Hosting:
```bash
cd client
npm run build
firebase deploy
```

### Import Database in MySQL Workbench:
1. Open **MySQL Workbench**.
2. Go to **File → Open SQL Script** and choose `database/schema.sql`.
3. Click the **Execute (⚡)** lightning bolt button.
