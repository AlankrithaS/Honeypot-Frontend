
# 🛡️ Honeypot Frontend  

## 📌 Overview  
The **Honeypot Frontend** provides a graphical interface to monitor and analyze captured IP addresses, usernames, passwords, and commands from various protocols (SSH & HTTP). It is designed for security professionals to visualize attacker interactions efficiently.  

## 🚀 Tech Stack  
- **Frontend Framework:** React.js  
- **Styling:** Tailwind CSS  
- **State Management:** Redux (if applicable)  
- **API Calls:** Axios  
- **Routing:** React Router  
- **Charts & Graphs:** Recharts  

## 🛠️ Installation & Setup  

### 1️⃣ Clone the Repository  
```bash
git clone https://github.com/AlankrithaS/Honeypot-Frontend.git
cd Honeypot-Frontend
```

### 2️⃣ Install Dependencies  
```bash
npm install
```

### 3️⃣ Start the Application  
```bash
npm start
```
> The app runs on `http://localhost:3000/` by default.  

## 🔑 Features  
✅ Real-time threat detection dashboard  
✅ Logs captured attacks (IP, username, password, command execution)  
✅ Supports SSH and HTTP honeypots  
✅ Interactive charts for attack patterns  
✅ Dark mode for improved UI experience  
✅ API integration for live updates  

## 📂 Project Structure  
```
📂 Honeypot-Frontend
 ┣ 📂 src
 ┃ ┣ 📂 components   # Reusable UI components
 ┃ ┣ 📂 pages        # Dashboard & Log pages
 ┃ ┣ 📂 utils        # Helper functions
 ┃ ┣ 📜 App.js       # Main app file
 ┃ ┣ 📜 index.js     # Entry point
 ┣ 📜 package.json   # Dependencies
 ┣ 📜 README.md      # Project info
```

## 🏗️ API Integration  
The frontend fetches honeypot logs from the backend API. Ensure the **Honeypot Backend** is running before using the application.  

