import React, { useState, useEffect } from 'react';

// Firebase Configuration from your project
const firebaseConfig = {
  apiKey: "AIzaSyAEowASvDWlHjCGEmKa_P6o29SxwKG2Pwo",
  authDomain: "login-5721e.firebaseapp.com",
  projectId: "login-5721e",
  storageBucket: "login-5721e.firebasestorage.app",
  messagingSenderId: "479494937109",
  appId: "1:479494937109:web:5f050afa1cdbb65195cc1c"
};

// Course Topics Data
const COURSE_DATA = {
  python: [
    { title: "Introduction to Python", explanation: "Python is a high-level, interpreted programming language known for its readability and versatility.", example: 'print("Hello, Python!")', output: 'Hello, Python!' },
    { title: "Data Types and Variables", explanation: "Variables store data. Python supports various data types like int, float, str, and bool.", example: 'x = 10\nname = "Alice"\nprint(type(x), type(name))', output: "<class 'int'> <class 'str'>" },
    { title: "Conditionals and Loops", explanation: "Conditionals (if/else) and loops (for/while) control the program flow.", example: 'for i in range(3):\n    print(i)', output: '0\n1\n2' },
    { title: "Functions and Modules", explanation: "Functions group code into reusable blocks. Modules are files with Python code you can import.", example: 'def greet(name):\n    return f"Hello, {name}"\nprint(greet("Bob"))', output: 'Hello, Bob' },
    { title: "Lists, Tuples, and Dictionaries", explanation: "Lists are mutable sequences, tuples are immutable, and dictionaries store key-value pairs.", example: 'fruits = ["apple", "banana"]\nprint(fruits[0])', output: 'apple' },
    { title: "File Handling", explanation: "Python allows reading and writing files using open().", example: 'with open("file.txt", "w") as f:\n    f.write("Hello File")', output: "File 'file.txt' created with text." },
    { title: "Object-Oriented Programming", explanation: "OOP organizes code into classes and objects.", example: 'class Person:\n    def __init__(self, name):\n        self.name = name\n    def greet(self):\n        return f"Hi, I\'m {self.name}"\nprint(Person("Tom").greet())', output: "Hi, I'm Tom" },
    { title: "Exception Handling", explanation: "Exceptions handle runtime errors gracefully.", example: 'try:\n    x = 1 / 0\nexcept ZeroDivisionError:\n    print("Cannot divide by zero")', output: 'Cannot divide by zero' },
    { title: "Working with Libraries (NumPy, Pandas)", explanation: "NumPy is for numerical computing, Pandas is for data analysis.", example: 'import numpy as np\nimport pandas as pd\nprint(np.array([1,2,3]))', output: '[1 2 3]' }
  ],
  java: [
    { title: "Introduction to Java", explanation: "Java is a high-level, class-based, object-oriented programming language designed for portability.", example: 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, Java!");\n    }\n}', output: 'Hello, Java!' },
    { title: "Data Types and Variables in Java", explanation: "Java supports primitives like int, double, char, and boolean. Variables store values.", example: 'public class Main {\n    public static void main(String[] args) {\n        int age = 20;\n        double price = 99.99;\n        System.out.println(age + ", " + price);\n    }\n}', output: '20, 99.99' },
    { title: "Conditionals and Loops in Java", explanation: "Conditionals (if-else, switch) and loops (for, while) control program flow.", example: 'for(int i = 1; i <= 3; i++) {\n    System.out.println("Count: " + i);\n}', output: 'Count: 1\nCount: 2\nCount: 3' },
    { title: "Methods in Java", explanation: "Methods are blocks of code that perform a specific task and can be reused.", example: 'public class Main {\n    public static void greet() {\n        System.out.println("Hello from method!");\n    }\n    public static void main(String[] args) {\n        greet();\n    }\n}', output: 'Hello from method!' },
    { title: "Arrays in Java", explanation: "Arrays store multiple values of the same type in a single variable.", example: 'int[] numbers = {1, 2, 3};\nfor(int num : numbers) System.out.println(num);', output: '1\n2\n3' },
    { title: "Strings in Java", explanation: "Strings are sequences of characters with many built-in methods.", example: 'String name = "Java";\nSystem.out.println(name.toUpperCase());', output: 'JAVA' },
    { title: "Object-Oriented Programming in Java", explanation: "OOP includes classes, objects, inheritance, and encapsulation.", example: 'class Car { String brand = "Toyota"; }', output: 'Toyota' },
    { title: "Exception Handling in Java", explanation: "Java uses try-catch blocks to handle exceptions gracefully.", example: 'try {\n    int a = 5 / 0;\n} catch(Exception e) {\n    System.out.println("Error: " + e.getMessage());\n}', output: 'Error: / by zero' },
    { title: "Collections Framework (ArrayList, HashMap)", explanation: "Java\'s Collections framework provides standardized data structures like List and Map.", example: 'ArrayList<String> list = new ArrayList<>();\nlist.add("Apple");\nSystem.out.println(list);', output: '[Apple]' }
  ],
  c: [
    { title: "Introduction to C", explanation: "C is a general-purpose, procedural programming language developed in 1972 by Dennis Ritchie.", example: '#include <stdio.h>\nint main() {\n    printf("Hello, World!");\n    return 0;\n}', output: 'Hello, World!' },
    { title: "Data Types and Variables in C", explanation: "C has basic types like int, float, char, and double.", example: 'int age = 20;\nprintf("Age: %d\\n", age);', output: 'Age: 20' },
    { title: "Conditionals and Loops in C", explanation: "Conditionals (if, else, switch) and loops (for, while) control program execution.", example: 'for(int i=1; i<=3; i++) {\n    printf("%d ", i);\n}', output: '1 2 3 ' },
    { title: "Functions in C", explanation: "Functions allow code to be organized into reusable blocks.", example: 'void greet() {\n    printf("Hello from function!\\n");\n}', output: 'Hello from function!' },
    { title: "Arrays and Strings in C", explanation: "Arrays are collections of items; strings are character arrays terminated with null.", example: 'char name[] = "C Language";\nprintf("Name: %s", name);', output: 'Name: C Language' },
    { title: "Pointers in C", explanation: "Pointers store memory addresses and enable low-level memory operations.", example: 'int x = 10; int *p = &x;\nprintf("Value: %d", *p);', output: 'Value: 10' },
    { title: "Structures and Unions", explanation: "Structures group different types of variables under a single name.", example: 'struct Student { char name[20]; int age; };', output: 'Student record defined' },
    { title: "File Handling in C", explanation: "C provides functions like fopen, fprintf, fscanf, and fclose for file handling.", example: 'FILE *f = fopen("test.txt", "w");\nfclose(f);', output: 'File opened and closed' },
    { title: "Dynamic Memory Allocation", explanation: "C supports dynamic memory allocation using malloc, calloc, realloc, and free.", example: 'int *arr = (int*)malloc(3 * sizeof(int));\nfree(arr);', output: 'Memory allocated and freed' }
  ],
  javascript: [
    { title: "Introduction to JavaScript", explanation: "JavaScript is a scripting language used to create dynamic content on web pages.", example: 'console.log("Hello, JavaScript!");', output: 'Hello, JavaScript!' },
    { title: "Variables and Data Types", explanation: "Variables store data. Data types include string, number, boolean, and object.", example: 'let name = "Alice";\nlet age = 25;\nconsole.log(name, age);', output: 'Alice 25' },
    { title: "Operators", explanation: "Operators perform operations on variables and values (+, -, *, /, %).", example: 'let sum = 5 + 3;\nconsole.log(sum);', output: '8' },
    { title: "Conditionals and Loops", explanation: "Conditionals run code based on conditions. Loops repeat tasks.", example: 'for(let i=1; i<=3; i++) {\n  console.log(i);\n}', output: '1\n2\n3' },
    { title: "Functions", explanation: "Functions are reusable blocks of code.", example: 'function greet(name) {\n  return "Hello " + name;\n}\nconsole.log(greet("Bob"));', output: 'Hello Bob' },
    { title: "Arrays and Objects", explanation: "Arrays store lists of values. Objects store key-value pairs.", example: 'let arr = [1,2,3];\nlet obj = {name: "Sam", age: 30};\nconsole.log(arr, obj);', output: "[1, 2, 3] { name: 'Sam', age: 30 }" },
    { title: "DOM Manipulation", explanation: "DOM Manipulation allows changing HTML elements dynamically using JavaScript.", example: 'document.getElementById("demo").innerHTML = "Changed!";', output: 'HTML element content updated' },
    { title: "Events", explanation: "Events are actions like clicks and key presses handled using event listeners.", example: 'button.addEventListener("click", () => alert("Clicked!"));', output: 'Alert shown on click' },
    { title: "ES6 Features", explanation: "ES6 introduced let/const, arrow functions, and template literals.", example: 'const greet = name => `Hello ${name}`;\nconsole.log(greet("Max"));', output: 'Hello Max' }
  ]
};

export default function App() {
  // Navigation states: 'index' | 'login' | 'homepage' | 'python' | 'java' | 'c' | 'javascript' | 'pycompiler'
  const [page, setPage] = useState('index');

  // Firebase Auth State
  const [currentUser, setCurrentUser] = useState(null);
  const [isLogin, setIsLogin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loadingAuth, setLoadingAuth] = useState(false);

  // Completed topics state
  const [completed, setCompleted] = useState(() => {
    return JSON.parse(localStorage.getItem('onlearn_completed_topics')) || {};
  });

  // Modal data for viewing materials
  const [modalData, setModalData] = useState(null);

  // Jarvis Chatbot state
  const [chatInput, setChatInput] = useState('');
  const [chatResponse, setChatResponse] = useState('');

  // Python Compiler state (Pyodide)
  const [compilerCode, setCompilerCode] = useState("print('Hello from Python!')");
  const [compilerConsole, setCompilerConsole] = useState('');
  const [compilerStatus, setCompilerStatus] = useState('loading Python...');
  const [pyodide, setPyodide] = useState(null);

  // 1. Initialize Firebase Auth
  useEffect(() => {
    if (window.firebase) {
      if (!window.firebase.apps.length) {
        window.firebase.initializeApp(firebaseConfig);
      }
      const unsubscribe = window.firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          setCurrentUser(user);
        } else {
          setCurrentUser(null);
        }
      });
      return () => unsubscribe();
    }
  }, []);

  // 2. Initialize Pyodide
  useEffect(() => {
    async function load() {
      if (window.loadPyodide) {
        try {
          const py = await window.loadPyodide({ indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.26.2/full/' });
          setPyodide(py);
          setCompilerStatus('ready');
        } catch {
          setCompilerStatus('error loading python');
        }
      }
    }
    load();
  }, []);

  // Mark Completed / Toggle
  function markCompleted(courseKey, index) {
    const key = `${courseKey}_${index}`;
    const next = { ...completed, [key]: true };
    setCompleted(next);
    localStorage.setItem('onlearn_completed_topics', JSON.stringify(next));
  }

  // Reset all for course
  function resetAll(courseKey) {
    const next = { ...completed };
    COURSE_DATA[courseKey].forEach((_, i) => {
      delete next[`${courseKey}_${i}`];
    });
    setCompleted(next);
    localStorage.setItem('onlearn_completed_topics', JSON.stringify(next));
  }

  // Firebase Authentication (Exact logic from your login.html)
  function handleAuth() {
    const cleanEmail = email.trim();
    const cleanPass = password.trim();

    if (!cleanEmail || !cleanPass) {
      setErrorMsg('Please enter email and password.');
      return;
    }

    setLoadingAuth(true);
    setErrorMsg('');

    if (window.firebase && window.firebase.auth) {
      const auth = window.firebase.auth();

      if (isLogin) {
        auth.signInWithEmailAndPassword(cleanEmail, cleanPass)
          .then((res) => {
            setCurrentUser(res.user);
            setLoadingAuth(false);
            setPage('homepage');
          })
          .catch((error) => {
            setLoadingAuth(false);
            setErrorMsg(error.message || 'Invalid email or password.');
          });
      } else {
        auth.createUserWithEmailAndPassword(cleanEmail, cleanPass)
          .then(() => {
            setLoadingAuth(false);
            alert('Sign up successful! You can now log in.');
            setIsLogin(true);
            setErrorMsg('');
          })
          .catch((error) => {
            setLoadingAuth(false);
            setErrorMsg(error.message);
          });
      }
    } else {
      // Fallback if offline
      setLoadingAuth(false);
      setPage('homepage');
    }
  }

  function handleSignOut() {
    if (window.firebase && window.firebase.auth) {
      window.firebase.auth().signOut().then(() => {
        setCurrentUser(null);
        setPage('index');
      });
    } else {
      setCurrentUser(null);
      setPage('index');
    }
  }

  // Jarvis Chatbot logic
  async function sendChatMessage() {
    if (!chatInput) {
      setChatResponse('Please enter a message.');
      return;
    }
    setChatResponse('Loading...');
    try {
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          Authorization: 'Bearer YOUR_OPENROUTER_API_KEY',
          'HTTP-Referer': 'https://www.sitename.com',
          'X-Title': 'SiteName',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'deepseek/deepseek-r1:free',
          messages: [{ role: 'user', content: chatInput }]
        })
      });
      const data = await response.json();
      setChatResponse(data.choices?.[0]?.message?.content || 'No response received.');
    } catch {
      setChatResponse(`💡 Jarvis: "${chatInput}". You can explore Java, Python, C, and JavaScript topics from the sidebar.`);
    }
  }

  // Run Python Code via Pyodide
  async function runPython() {
    if (!pyodide) return;
    setCompilerConsole(prev => prev + '\n>>> Running code...\n');
    try {
      let output = '';
      pyodide.setStdout({ batched(data) { output += data + '\n'; } });
      pyodide.setStderr({ batched(data) { output += data + '\n'; } });
      await pyodide.runPythonAsync(compilerCode);
      setCompilerConsole(prev => prev + output + '>>> Finished.\n');
    } catch (e) {
      setCompilerConsole(prev => prev + '\nError: ' + e.message + '\n');
    }
  }

  // 1. Landing Page (index.html)
  if (page === 'index') {
    return (
      <div>
        <header className="landing-header">
          <img src="/homepageimages/logo.jpeg" alt="OnLearn Logo" />
          <h1>OnLearn</h1>
        </header>

        <div className="banner">
          <img src="/homepageimages/homepageimg.jpg" alt="Master Programming with Jarvis AI Assistant" />
        </div>

        <div className="get-started-section">
          <h2>Welcome to OnLearn!</h2>
          <p>
            Your journey to mastering programming starts here.  
            Learn Java, JavaScript, C, and Python with your personal AI mentor Jarvis.  
            Get instant help, personalized study materials, and accelerated learning paths.
          </p>
          <button className="btn btn-primary" onClick={() => setPage('login')}>
            Get Started Now
          </button>
        </div>
      </div>
    );
  }

  // 2. Login Page (login.html - Powered by Firebase Auth)
  if (page === 'login') {
    return (
      <div className="login-container">
        <div className="login-card">
          <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="error">{errorMsg}</div>
          <button onClick={handleAuth} disabled={loadingAuth}>
            {loadingAuth ? 'Please wait...' : (isLogin ? 'Login' : 'Sign Up')}
          </button>
          <p>
            <a onClick={() => { setIsLogin(!isLogin); setErrorMsg(''); }}>
              {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
            </a>
          </p>
        </div>
      </div>
    );
  }

  // 3. Course Pages (python.html, java.html, c.html, javascript.html)
  if (['python', 'java', 'c', 'javascript'].includes(page)) {
    const topics = COURSE_DATA[page];
    const pageTitle = page.charAt(0).toUpperCase() + page.slice(1);

    return (
      <div className="course-page">
        <button className="back-to-home" onClick={() => setPage('homepage')}>
          Back to home
        </button>
        <h1>{pageTitle}</h1>

        <div id="topics">
          {topics.map((t, i) => {
            const isDone = completed[`${page}_${i}`];
            return (
              <div className="topic" key={i}>
                <span className={isDone ? 'completed' : ''}>{t.title}</span>
                <div>
                  <button className="complete-btn" onClick={() => markCompleted(page, i)}>
                    Mark as Completed
                  </button>
                  <button className="view-btn" onClick={() => setModalData(t)}>
                    View Materials
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <button className="reset-btn" onClick={() => resetAll(page)}>
          Reset All
        </button>

        <div id="jarvis">💡 For any doubts, Jarvis can assist you.</div>

        {/* Modal */}
        {modalData && (
          <div className="modal" onClick={() => setModalData(null)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <span className="close" onClick={() => setModalData(null)}>&times;</span>
              <h2>{modalData.title}</h2>
              <p>{modalData.explanation}</p>
              <h3>Example:</h3>
              <pre>{modalData.example}</pre>
              <h3>Output:</h3>
              <pre>{modalData.output}</pre>
            </div>
          </div>
        )}
      </div>
    );
  }

  // 4. Compiler Page (pycompiler.html)
  if (page === 'pycompiler') {
    return (
      <div className="compiler-page">
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 15 }}>
          <button className="back-to-home" onClick={() => setPage('homepage')}>
            Back to home
          </button>
          <h2 style={{ marginLeft: 20 }}>Python Runner (Pyodide)</h2>
          <span style={{ marginLeft: 'auto' }}>status: {compilerStatus}</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          <div style={{ background: 'white', padding: 15, borderRadius: 8, border: '1px solid #ccc' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
              <strong>Editor</strong>
              <button
                className="btn btn-primary"
                onClick={runPython}
                disabled={compilerStatus !== 'ready'}
              >
                ▶ Run
              </button>
            </div>
            <textarea
              style={{ width: '100%', height: 400, fontFamily: 'monospace', padding: 10 }}
              value={compilerCode}
              onChange={(e) => setCompilerCode(e.target.value)}
              spellCheck="false"
            />
          </div>

          <div style={{ background: 'white', padding: 15, borderRadius: 8, border: '1px solid #ccc' }}>
            <strong>Console</strong>
            <pre style={{ height: 400, overflow: 'auto', background: '#111', color: '#0f0', padding: 10 }}>
              {compilerConsole || 'Output will appear here...'}
            </pre>
          </div>
        </div>
      </div>
    );
  }

  // 5. Homepage (homepage.html)
  return (
    <div>
      {/* Sidebar matching homepagestyle (1).css */}
      <div className="sidebar">
        <div className="logo-holder">
          <img className="logo" src="/homepageimages/logo.jpeg" alt="" />
        </div>
        <div className="holder" onClick={() => setPage('java')}>
          <img className="img" src="/homepageimages/java (1).png" alt="" />
          <label className="image_name">Java</label>
        </div>
        <div className="holder" onClick={() => setPage('python')}>
          <img className="img" src="/homepageimages/python (1).png" alt="" />
          <label className="image_name">Python</label>
        </div>
        <div className="holder" onClick={() => setPage('c')}>
          <img className="img" src="/homepageimages/c- (1).png" alt="" />
          <label className="image_name">C</label>
        </div>
        <div className="holder" onClick={() => setPage('javascript')}>
          <img className="img" src="/homepageimages/js (1).png" alt="" />
          <label className="image_name">Javascript</label>
        </div>
        <div className="holder" onClick={() => setPage('pycompiler')}>
          <img className="img" src="/homepageimages/compiler.png" alt="" />
          <label className="image_name">Compiler</label>
        </div>
      </div>

      {/* Main content matching homepage.html */}
      <div className="main">
        <div className="center-content">
          <div className="container">
            <h1>Welcome to OnLearn</h1>
            <p>Master Programming with Jarvis AI Assistant</p>
            {currentUser && (
              <p style={{ fontSize: '0.9rem', color: '#28a745' }}>
                Signed in as: <strong>{currentUser.email}</strong>
              </p>
            )}
            <button
              className="btn btn-outline-danger"
              style={{ marginTop: 10 }}
              onClick={handleSignOut}
            >
              Log Out
            </button>
          </div>
        </div>
      </div>

      {/* Chatbot sidebar matching homepage.html */}
      <div className="chatbot-sidebar">
        <h2>JARVIS</h2>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Enter your question"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
          />
        </div>
        <button className="btn btn-success" onClick={sendChatMessage}>
          Ask!
        </button>
        <div className="chatbot-response">
          {chatResponse || 'Response will appear here.'}
        </div>
      </div>
    </div>
  );
}
