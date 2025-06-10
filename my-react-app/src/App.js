import React, { useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { oneDark } from '@codemirror/theme-one-dark';
import { Analytics } from '@vercel/analytics/react';
import './App.css';

const lessons = [
  {
    id: 1,
    title: "Introduction to JavaScript",
    content: "JavaScript is a programming language that enables interactive web pages. It's an essential part of web applications. JavaScript can be used to create dynamic content, validate forms, detect browsers, and much more.",
    code: "// Your first JavaScript program\nconsole.log('Hello, World!');\n\n// Variables\nlet name = 'John';\nconsole.log('Hello, ' + name);"
  },
  {
    id: 2,
    title: "Variables and Data Types",
    content: "JavaScript has several built-in data types: String, Number, Boolean, Object, Array, and more. Variables can be declared using var, let, or const keywords.",
    code: "// String\nlet name = 'John';\n\n// Number\nlet age = 25;\n\n// Boolean\nlet isStudent = true;\n\n// Array\nlet fruits = ['apple', 'banana', 'orange'];\n\n// Object\nlet person = {\n  name: 'John',\n  age: 25,\n  isStudent: true\n};\n\nconsole.log('Name:', name);\nconsole.log('Age:', age);\nconsole.log('Is Student:', isStudent);\nconsole.log('Fruits:', fruits);\nconsole.log('Person:', person);"
  },
  {
    id: 3,
    title: "Functions and Scope",
    content: "Functions are blocks of code designed to perform a particular task. They are executed when they are called. JavaScript has function scope: each function creates a new scope.",
    code: "// Function declaration\nfunction greet(name) {\n  return 'Hello, ' + name + '!';\n}\n\n// Function expression\nconst add = function(a, b) {\n  return a + b;\n};\n\n// Arrow function\nconst multiply = (a, b) => a * b;\n\n// Function with scope\nlet globalVar = 'I am global';\n\nfunction scopeExample() {\n  let localVar = 'I am local';\n  console.log(globalVar); // Can access global\n  console.log(localVar);  // Can access local\n}\n\nconsole.log(greet('John'));\nconsole.log('Sum:', add(5, 3));\nconsole.log('Product:', multiply(4, 2));\nscopeExample();"
  },
  {
    id: 4,
    title: "Control Flow",
    content: "Control flow statements are used to control the flow of execution in a program. They include if-else statements, switch statements, and loops.",
    code: "// If-else statement\nlet age = 18;\n\nif (age >= 18) {\n  console.log('You are an adult');\n} else {\n  console.log('You are a minor');\n}\n\n// Switch statement\nlet day = 'Monday';\n\nswitch (day) {\n  case 'Monday':\n    console.log('Start of the week');\n    break;\n  case 'Friday':\n    console.log('End of the week');\n    break;\n  default:\n    console.log('Middle of the week');\n}\n\n// For loop\nfor (let i = 1; i <= 5; i++) {\n  console.log('Count:', i);\n}\n\n// While loop\nlet count = 0;\nwhile (count < 3) {\n  console.log('While count:', count);\n  count++;\n}"
  },
  {
    id: 5,
    title: "Arrays and Objects",
    content: "Arrays are used to store multiple values in a single variable. Objects are used to store keyed collections of various data and more complex entities.",
    code: "// Array methods\nlet fruits = ['apple', 'banana', 'orange'];\n\n// Push and pop\nfruits.push('grape');\nconsole.log('After push:', fruits);\n\nfruits.pop();\nconsole.log('After pop:', fruits);\n\n// Map and filter\nlet numbers = [1, 2, 3, 4, 5];\n\nlet doubled = numbers.map(num => num * 2);\nconsole.log('Doubled:', doubled);\n\nlet evenNumbers = numbers.filter(num => num % 2 === 0);\nconsole.log('Even numbers:', evenNumbers);\n\n// Object methods\nlet person = {\n  name: 'John',\n  age: 25,\n  greet() {\n    return `Hello, I'm ${this.name}`;\n  }\n};\n\nconsole.log(person.greet());\nconsole.log(Object.keys(person));\nconsole.log(Object.values(person));"
  },
  {
    id: 6,
    title: "Template Literals",
    content: "Template literals are string literals allowing embedded expressions. They use backticks (`) instead of quotes and can contain placeholders using ${expression}.",
    code: "const name = 'John';\nconst age = 25;\n\n// Using template literals\nconst greeting = `Hello, my name is ${name} and I am ${age} years old.`;\nconsole.log(greeting);\n\n// Multi-line strings\nconst multiLine = `\n  This is a\n  multi-line\n  string\n`;\nconsole.log(multiLine);\n\n// Expressions in template literals\nconst a = 5;\nconst b = 10;\nconsole.log(`The sum of ${a} and ${b} is ${a + b}`);"
  },
  {
    id: 7,
    title: "Destructuring",
    content: "Destructuring assignment is a JavaScript expression that makes it possible to unpack values from arrays or properties from objects into distinct variables.",
    code: "// Array destructuring\nconst numbers = [1, 2, 3];\nconst [first, second, third] = numbers;\nconsole.log(first, second, third);\n\n// Object destructuring\nconst person = {\n  name: 'John',\n  age: 25,\n  city: 'New York'\n};\n\nconst { name, age, city } = person;\nconsole.log(name, age, city);\n\n// Nested destructuring\nconst user = {\n  id: 1,\n  details: {\n    firstName: 'John',\n    lastName: 'Doe'\n  }\n};\n\nconst { details: { firstName, lastName } } = user;\nconsole.log(firstName, lastName);"
  },
  {
    id: 8,
    title: "Spread and Rest Operators",
    content: "The spread operator (...) allows an iterable to expand in places where zero or more arguments are expected. The rest parameter syntax allows us to represent an indefinite number of arguments as an array.",
    code: "// Spread operator with arrays\nconst arr1 = [1, 2, 3];\nconst arr2 = [...arr1, 4, 5];\nconsole.log('Spread array:', arr2);\n\n// Spread operator with objects\nconst obj1 = { foo: 'bar', x: 42 };\nconst obj2 = { ...obj1, y: 13 };\nconsole.log('Spread object:', obj2);\n\n// Rest parameters\nfunction sum(...numbers) {\n  return numbers.reduce((total, num) => total + num, 0);\n}\n\nconsole.log('Sum:', sum(1, 2, 3, 4, 5));"
  },
  {
    id: 9,
    title: "Arrow Functions",
    content: "Arrow functions provide a shorter syntax for writing function expressions. They don't have their own this, arguments, super, or new.target bindings.",
    code: "// Basic arrow function\nconst add = (a, b) => a + b;\nconsole.log('Sum:', add(5, 3));\n\n// Arrow function with multiple lines\nconst multiply = (a, b) => {\n  const result = a * b;\n  return result;\n};\nconsole.log('Product:', multiply(4, 2));\n\n// Arrow function with array methods\nconst numbers = [1, 2, 3, 4, 5];\nconst doubled = numbers.map(num => num * 2);\nconsole.log('Doubled:', doubled);\n\n// Arrow function with filter\nconst evenNumbers = numbers.filter(num => num % 2 === 0);\nconsole.log('Even numbers:', evenNumbers);"
  },
  {
    id: 10,
    title: "Promises and Async/Await",
    content: "Promises are objects representing the eventual completion or failure of an asynchronous operation. Async/await is a way to handle promises more elegantly.",
    code: "// Creating a promise\nconst fetchData = () => {\n  return new Promise((resolve, reject) => {\n    setTimeout(() => {\n      const data = { id: 1, name: 'John' };\n      resolve(data);\n    }, 1000);\n  });\n};\n\n// Using promises\nfetchData()\n  .then(data => console.log('Promise resolved:', data))\n  .catch(error => console.error('Promise rejected:', error));\n\n// Using async/await\nasync function getData() {\n  try {\n    const data = await fetchData();\n    console.log('Async/await result:', data);\n  } catch (error) {\n    console.error('Async/await error:', error);\n  }\n}\n\ngetData();"
  },
  {
    id: 11,
    title: "Classes and Inheritance",
    content: "Classes are templates for creating objects. They encapsulate data with code to work on that data. Classes in JavaScript are built on prototypes but have a syntax that is more similar to classes in other languages.",
    code: "// Basic class\nclass Person {\n  constructor(name, age) {\n    this.name = name;\n    this.age = age;\n  }\n\n  greet() {\n    return `Hello, my name is ${this.name}`;\n  }\n}\n\n// Inheritance\nclass Student extends Person {\n  constructor(name, age, grade) {\n    super(name, age);\n    this.grade = grade;\n  }\n\n  study() {\n    return `${this.name} is studying`;\n  }\n}\n\nconst student = new Student('John', 20, 'A');\nconsole.log(student.greet());\nconsole.log(student.study());"
  },
  {
    id: 12,
    title: "Modules",
    content: "JavaScript modules are a way to split your code into separate files, making it more maintainable and reusable. Modules can export and import functions, objects, or primitive values.",
    code: "// Example of module exports and imports\n// math.js\nexport const add = (a, b) => a + b;\nexport const subtract = (a, b) => a - b;\n\nexport default class Calculator {\n  multiply(a, b) {\n    return a * b;\n  }\n}\n\n// main.js\nimport Calculator, { add, subtract } from './math.js';\n\nconst calc = new Calculator();\nconsole.log('Sum:', add(5, 3));\nconsole.log('Difference:', subtract(5, 3));\nconsole.log('Product:', calc.multiply(4, 2));"
  },
  {
    id: 13,
    title: "Error Handling",
    content: "Error handling is the process of responding to and recovering from error conditions in your program. JavaScript provides try-catch blocks for handling errors.",
    code: "// Basic error handling\ntry {\n  throw new Error('Something went wrong');\n} catch (error) {\n  console.error('Caught error:', error.message);\n} finally {\n  console.log('This always executes');\n}\n\n// Custom error class\nclass ValidationError extends Error {\n  constructor(message) {\n    super(message);\n    this.name = 'ValidationError';\n  }\n}\n\n// Using custom error\ntry {\n  const age = -1;\n  if (age < 0) {\n    throw new ValidationError('Age cannot be negative');\n  }\n} catch (error) {\n  if (error instanceof ValidationError) {\n    console.error('Validation error:', error.message);\n  } else {\n    console.error('Unknown error:', error);\n  }\n}"
  },
  {
    id: 14,
    title: "Regular Expressions",
    content: "Regular expressions are patterns used to match character combinations in strings. In JavaScript, regular expressions are also objects.",
    code: "// Basic regex patterns\nconst text = 'Hello, my email is john@example.com';\n\n// Email pattern\nconst emailPattern = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}/g;\nconst emails = text.match(emailPattern);\nconsole.log('Emails:', emails);\n\n// Phone number pattern\nconst phoneText = 'Call me at 123-456-7890';\nconst phonePattern = /\\d{3}-\\d{3}-\\d{4}/;\nconst phone = phoneText.match(phonePattern);\nconsole.log('Phone:', phone);\n\n// String replacement\nconst newText = text.replace(emailPattern, '[EMAIL]');\nconsole.log('Masked text:', newText);"
  },
  {
    id: 15,
    title: "Date and Time",
    content: "JavaScript provides a Date object for working with dates and times. It includes methods for creating, parsing, and manipulating dates.",
    code: "// Creating dates\nconst now = new Date();\nconsole.log('Current date:', now);\n\n// Specific date\nconst specificDate = new Date(2024, 0, 1); // January 1, 2024\nconsole.log('Specific date:', specificDate);\n\n// Date methods\nconsole.log('Year:', now.getFullYear());\nconsole.log('Month:', now.getMonth() + 1);\nconsole.log('Day:', now.getDate());\nconsole.log('Hours:', now.getHours());\nconsole.log('Minutes:', now.getMinutes());\n\n// Date formatting\nconst options = { \n  weekday: 'long', \n  year: 'numeric', \n  month: 'long', \n  day: 'numeric' \n};\nconsole.log('Formatted date:', now.toLocaleDateString('en-US', options));"
  },
  {
    id: 16,
    title: "JSON",
    content: "JSON (JavaScript Object Notation) is a lightweight data interchange format. It's easy for humans to read and write and easy for machines to parse and generate.",
    code: "// JSON string\nconst jsonString = '{\"name\":\"John\",\"age\":30,\"city\":\"New York\"}';\n\n// Parsing JSON\nconst person = JSON.parse(jsonString);\nconsole.log('Parsed object:', person);\n\n// Creating JSON\nconst newPerson = {\n  name: 'Jane',\n  age: 25,\n  city: 'Los Angeles',\n  hobbies: ['reading', 'gaming']\n};\n\nconst newJsonString = JSON.stringify(newPerson, null, 2);\nconsole.log('JSON string:', newJsonString);\n\n// Working with arrays\nconst jsonArray = '[1, 2, 3, 4, 5]';\nconst numbers = JSON.parse(jsonArray);\nconsole.log('Parsed array:', numbers);"
  },
  {
    id: 17,
    title: "Local Storage",
    content: "The localStorage object allows you to save key/value pairs in the browser. The data persists even after the browser is closed and reopened.",
    code: "// Storing data\nlocalStorage.setItem('user', JSON.stringify({\n  name: 'John',\n  age: 30\n}));\n\n// Retrieving data\nconst user = JSON.parse(localStorage.getItem('user'));\nconsole.log('Stored user:', user);\n\n// Updating data\nuser.age = 31;\nlocalStorage.setItem('user', JSON.stringify(user));\n\n// Removing data\nlocalStorage.removeItem('user');\n\n// Clearing all data\nlocalStorage.clear();\n\n// Checking if data exists\nif (localStorage.getItem('user')) {\n  console.log('User data exists');\n} else {\n  console.log('No user data found');\n}"
  },
  {
    id: 18,
    title: "DOM Manipulation",
    content: "The Document Object Model (DOM) is a programming interface for HTML and XML documents. It represents the page so that programs can change the document structure, style, and content.",
    code: "// Creating elements\nconst div = document.createElement('div');\ndiv.className = 'container';\ndiv.innerHTML = '<h1>Hello, DOM!</h1>';\n\n// Adding to document\ndocument.body.appendChild(div);\n\n// Modifying elements\nconst heading = document.querySelector('h1');\nheading.style.color = 'blue';\nheading.textContent = 'Updated Heading';\n\n// Event handling\nconst button = document.createElement('button');\nbutton.textContent = 'Click me';\nbutton.addEventListener('click', () => {\n  console.log('Button clicked!');\n});\n\ndiv.appendChild(button);"
  },
  {
    id: 19,
    title: "Event Handling",
    content: "Event handling is the process of responding to user actions or system events. JavaScript provides various ways to handle events.",
    code: "// Basic event handling\nconst button = document.createElement('button');\nbutton.textContent = 'Click me';\n\n// Adding event listener\nbutton.addEventListener('click', (event) => {\n  console.log('Button clicked!');\n  console.log('Event type:', event.type);\n  console.log('Target element:', event.target);\n});\n\n// Multiple events\nbutton.addEventListener('mouseover', () => {\n  button.style.backgroundColor = 'blue';\n});\n\nbutton.addEventListener('mouseout', () => {\n  button.style.backgroundColor = '';\n});\n\n// Event delegation\nconst list = document.createElement('ul');\nlist.innerHTML = '<li>Item 1</li><li>Item 2</li>';\n\nlist.addEventListener('click', (event) => {\n  if (event.target.tagName === 'LI') {\n    console.log('Clicked item:', event.target.textContent);\n  }\n});"
  },
  {
    id: 20,
    title: "AJAX and Fetch",
    content: "AJAX (Asynchronous JavaScript and XML) allows web pages to be updated asynchronously by exchanging data with a web server. The Fetch API provides a modern interface for making HTTP requests.",
    code: "// Using Fetch API\nasync function fetchData() {\n  try {\n    const response = await fetch('https://api.example.com/data');\n    if (!response.ok) {\n      throw new Error('Network response was not ok');\n    }\n    const data = await response.json();\n    console.log('Fetched data:', data);\n  } catch (error) {\n    console.error('Error fetching data:', error);\n  }\n}\n\n// POST request\nasync function postData() {\n  try {\n    const response = await fetch('https://api.example.com/data', {\n      method: 'POST',\n      headers: {\n        'Content-Type': 'application/json'\n      },\n      body: JSON.stringify({\n        name: 'John',\n        age: 30\n      })\n    });\n    const result = await response.json();\n    console.log('Posted data:', result);\n  } catch (error) {\n    console.error('Error posting data:', error);\n  }\n}"
  },
  {
    id: 21,
    title: "Web Storage",
    content: "Web Storage provides two mechanisms for storing data on the client side: localStorage and sessionStorage. They allow you to store key/value pairs in the browser.",
    code: "// localStorage example\nlocalStorage.setItem('username', 'John');\nconsole.log('Username:', localStorage.getItem('username'));\n\n// sessionStorage example\nsessionStorage.setItem('sessionId', '12345');\nconsole.log('Session ID:', sessionStorage.getItem('sessionId'));\n\n// Storing objects\nconst user = {\n  name: 'John',\n  preferences: {\n    theme: 'dark',\n    language: 'en'\n  }\n};\n\nlocalStorage.setItem('user', JSON.stringify(user));\nconst storedUser = JSON.parse(localStorage.getItem('user'));\nconsole.log('Stored user:', storedUser);\n\n// Clearing storage\nlocalStorage.removeItem('username');\nlocalStorage.clear();"
  },
  {
    id: 22,
    title: "Web Workers",
    content: "Web Workers allow you to run JavaScript in background threads, separate from the main execution thread. This helps in performing heavy computations without blocking the UI.",
    code: "// Creating a worker\nconst worker = new Worker('worker.js');\n\n// Sending data to worker\nworker.postMessage({\n  type: 'calculate',\n  data: [1, 2, 3, 4, 5]\n});\n\n// Receiving data from worker\nworker.onmessage = (event) => {\n  console.log('Result from worker:', event.data);\n};\n\n// Error handling\nworker.onerror = (error) => {\n  console.error('Worker error:', error);\n};\n\n// Terminating worker\nworker.terminate();"
  },
  {
    id: 23,
    title: "Service Workers",
    content: "Service Workers are scripts that act as a proxy between web applications, the browser, and the network. They enable features like offline support and push notifications.",
    code: "// Registering a service worker\nif ('serviceWorker' in navigator) {\n  navigator.serviceWorker.register('/sw.js')\n    .then(registration => {\n      console.log('Service Worker registered:', registration);\n    })\n    .catch(error => {\n      console.error('Service Worker registration failed:', error);\n    });\n}\n\n// Service Worker file (sw.js)\nself.addEventListener('install', event => {\n  event.waitUntil(\n    caches.open('v1').then(cache => {\n      return cache.addAll([\n        '/',\n        '/index.html',\n        '/styles.css',\n        '/app.js'\n      ]);\n    })\n  );\n});\n\nself.addEventListener('fetch', event => {\n  event.respondWith(\n    caches.match(event.request)\n      .then(response => response || fetch(event.request))\n  );\n});"
  },
  {
    id: 24,
    title: "WebSockets",
    content: "WebSocket is a protocol providing full-duplex communication channels over a single TCP connection. It enables real-time data transfer between client and server.",
    code: "// Creating WebSocket connection\nconst socket = new WebSocket('ws://example.com/socket');\n\n// Connection opened\nsocket.addEventListener('open', event => {\n  console.log('Connected to WebSocket');\n  socket.send('Hello Server!');\n});\n\n// Listen for messages\nsocket.addEventListener('message', event => {\n  console.log('Message from server:', event.data);\n});\n\n// Connection closed\nsocket.addEventListener('close', event => {\n  console.log('Disconnected from WebSocket');\n});\n\n// Connection error\nsocket.addEventListener('error', event => {\n  console.error('WebSocket error:', event);\n});"
  },
  {
    id: 25,
    title: "Canvas API",
    content: "The Canvas API provides a means for drawing graphics via JavaScript and the HTML canvas element. It can be used for animation, game graphics, data visualization, and more.",
    code: "// Getting canvas context\nconst canvas = document.createElement('canvas');\nconst ctx = canvas.getContext('2d');\n\n// Drawing shapes\nctx.fillStyle = 'red';\nctx.fillRect(10, 10, 100, 100);\n\nctx.beginPath();\nctx.arc(150, 60, 50, 0, Math.PI * 2);\nctx.fillStyle = 'blue';\nctx.fill();\n\n// Drawing text\nctx.font = '20px Arial';\nctx.fillStyle = 'black';\nctx.fillText('Hello Canvas!', 10, 150);\n\n// Drawing lines\nctx.beginPath();\nctx.moveTo(200, 10);\nctx.lineTo(300, 100);\nctx.strokeStyle = 'green';\nctx.stroke();"
  },
  {
    id: 26,
    title: "Web Audio API",
    content: "The Web Audio API provides a powerful and versatile system for controlling audio on the Web, allowing developers to choose audio sources, add effects to audio, create audio visualizations, and more.",
    code: "// Creating audio context\nconst audioContext = new (window.AudioContext || window.webkitAudioContext)();\n\n// Creating oscillator\nconst oscillator = audioContext.createOscillator();\noscilator.type = 'sine';\noscilator.frequency.setValueAtTime(440, audioContext.currentTime);\n\n// Creating gain node\nconst gainNode = audioContext.createGain();\ngainNode.gain.setValueAtTime(0.5, audioContext.currentTime);\n\n// Connecting nodes\noscilator.connect(gainNode);\ngainNode.connect(audioContext.destination);\n\n// Starting and stopping\noscilator.start();\nsetTimeout(() => {\n  oscilator.stop();\n}, 1000);"
  },
  {
    id: 27,
    title: "WebGL",
    content: "WebGL is a JavaScript API for rendering interactive 3D and 2D graphics within any compatible web browser. It's based on OpenGL ES and can be used with the HTML5 canvas element.",
    code: "// Getting WebGL context\nconst canvas = document.createElement('canvas');\nconst gl = canvas.getContext('webgl');\n\n// Creating shaders\nconst vertexShader = gl.createShader(gl.VERTEX_SHADER);\ngl.shaderSource(vertexShader, `\n  attribute vec4 position;\n  void main() {\n    gl_Position = position;\n  }\n`);\ngl.compileShader(vertexShader);\n\nconst fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);\ngl.shaderSource(fragmentShader, `\n  precision mediump float;\n  void main() {\n    gl_FragColor = vec4(1, 0, 0, 1);\n  }\n`);\ngl.compileShader(fragmentShader);\n\n// Creating program\nconst program = gl.createProgram();\ngl.attachShader(program, vertexShader);\ngl.attachShader(program, fragmentShader);\ngl.linkProgram(program);\ngl.useProgram(program);"
  },
  {
    id: 28,
    title: "Web Components",
    content: "Web Components are a set of web platform APIs that allow you to create new custom, reusable, encapsulated HTML tags to use in web pages and web apps.",
    code: "// Defining a custom element\nclass MyElement extends HTMLElement {\n  constructor() {\n    super();\n    this.attachShadow({ mode: 'open' });\n  }\n\n  connectedCallback() {\n    this.shadowRoot.innerHTML = `\n      <style>\n        :host {\n          display: block;\n          padding: 1rem;\n          color: var(--text-color, black);\n        }\n      </style>\n      <div>\n        <h2>My Custom Element</h2>\n        <slot></slot>\n      </div>\n    `;\n  }\n}\n\n// Registering the custom element\ncustomElements.define('my-element', MyElement);\n\n// Using the custom element\nconst element = document.createElement('my-element');\nelement.textContent = 'Hello, Web Components!';"
  },
  {
    id: 29,
    title: "Progressive Web Apps",
    content: "Progressive Web Apps (PWAs) are web applications that use modern web capabilities to deliver an app-like experience to users. They can work offline and can be installed on the home screen.",
    code: "// Service Worker registration\nif ('serviceWorker' in navigator) {\n  window.addEventListener('load', () => {\n    navigator.serviceWorker.register('/sw.js')\n      .then(registration => {\n        console.log('SW registered:', registration);\n      })\n      .catch(error => {\n        console.log('SW registration failed:', error);\n      });\n  });\n}\n\n// Web App Manifest\nconst manifest = {\n  name: 'My PWA',\n  short_name: 'PWA',\n  start_url: '/',\n  display: 'standalone',\n  background_color: '#ffffff',\n  theme_color: '#000000',\n  icons: [\n    {\n      src: 'icon-192.png',\n      sizes: '192x192',\n      type: 'image/png'\n    },\n    {\n      src: 'icon-512.png',\n      sizes: '512x512',\n      type: 'image/png'\n    }\n  ]\n};"
  },
  {
    id: 30,
    title: "Web APIs",
    content: "Web APIs are interfaces that allow you to access web browser features and functionality. They include APIs for geolocation, notifications, device orientation, and more.",
    code: "// Geolocation API\nnavigator.geolocation.getCurrentPosition(\n  position => {\n    console.log('Latitude:', position.coords.latitude);\n    console.log('Longitude:', position.coords.longitude);\n  },\n  error => {\n    console.error('Error:', error.message);\n  }\n);\n\n// Notifications API\nif ('Notification' in window) {\n  Notification.requestPermission().then(permission => {\n    if (permission === 'granted') {\n      new Notification('Hello!', {\n        body: 'This is a notification',\n        icon: 'icon.png'\n      });\n    }\n  });\n}\n\n// Device Orientation API\nwindow.addEventListener('deviceorientation', event => {\n  console.log('Alpha:', event.alpha);\n  console.log('Beta:', event.beta);\n  console.log('Gamma:', event.gamma);\n});"
  }
];

function Sidebar({ activeLesson, onLessonChange }) {
  return (
    <div className="sidebar">
      <h3>Lessons</h3>
      <ul className="lesson-list">
        {lessons.map((lesson) => (
          <li key={lesson.id} className="lesson-item">
            <button
              className={`lesson-btn ${activeLesson === lesson.id ? 'active' : ''}`}
              onClick={() => onLessonChange(lesson.id)}
            >
              <span className="lesson-number">{lesson.id}.</span> {lesson.title}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function CodeEditor({ code, onChange, onRun }) {
  return (
    <div className="code-editor">
      <div className="editor-header">
        <span>JavaScript Editor</span>
        <button className="run-btn" onClick={onRun}>Run Code</button>
      </div>
      <CodeMirror
        value={code}
        height="500px"
        theme={oneDark}
        extensions={[javascript()]}
        onChange={onChange}
      />
    </div>
  );
}

function Output({ output }) {
  return (
    <div className="output">
      <h3>Output:</h3>
      <pre>{output}</pre>
    </div>
  );
}

function ContentArea({ currentLesson, code, setCode, handleRunCode, output }) {
  return (
    <div className="content-area">
      <div className="lesson-content active">
        <h2 className="lesson-title">{currentLesson.title}</h2>
        <div className="lesson-text">{currentLesson.content}</div>
        
        {/* Code Example Section */}
        <div className="code-example">
          <pre>{currentLesson.code}</pre>
        </div>
        
        <CodeEditor 
          code={code} 
          onChange={setCode} 
          onRun={handleRunCode}
        />
        <Output output={output} />
      </div>
    </div>
  );
}

function App() {
  const [activeLesson, setActiveLesson] = useState(1);
  const [code, setCode] = useState(lessons[0].code);
  const [output, setOutput] = useState('');

  const currentLesson = lessons.find(lesson => lesson.id === activeLesson);

  const handleLessonChange = (lessonId) => {
    setActiveLesson(lessonId);
    const lesson = lessons.find(l => l.id === lessonId);
    setCode(lesson.code);
    setOutput('');
  };

  const handleRunCode = () => {
    try {
      // Create a safe environment for code execution
      const consoleOutput = [];
      const safeConsole = {
        log: (...args) => consoleOutput.push(args.join(' ')),
        error: (...args) => consoleOutput.push('Error: ' + args.join(' ')),
        warn: (...args) => consoleOutput.push('Warning: ' + args.join(' '))
      };

      // Create a safe eval function
      // eslint-disable-next-line no-new-func
      const safeEval = new Function('console', code);
      safeEval(safeConsole);

      setOutput(consoleOutput.join('\n'));
    } catch (error) {
      setOutput('Error: ' + error.message);
    }
  };

  return (
    <div className="container">
      <Analytics />
      <header className="header">
        <h1>Learn JavaScript</h1>
        <p>Interactive Tutorial</p>
      </header>
      
      <main className="main-content">
        <Sidebar activeLesson={activeLesson} onLessonChange={handleLessonChange} />
        <ContentArea 
          currentLesson={currentLesson}
          code={code}
          setCode={setCode}
          handleRunCode={handleRunCode}
          output={output}
        />
      </main>
    </div>
  );
}

export default App;
