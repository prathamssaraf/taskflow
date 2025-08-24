# TaskFlow 📋

A modern, intuitive task management dashboard with seamless calendar integration. Built with React, Vite, and Tailwind CSS.

![TaskFlow Dashboard](https://img.shields.io/badge/Status-Live-brightgreen) ![React](https://img.shields.io/badge/React-18.2-blue) ![Vite](https://img.shields.io/badge/Vite-4.4-purple) ![Tailwind](https://img.shields.io/badge/Tailwind-3.3-cyan)

## ✨ Features

### 🎯 Task Management
- **Create & Organize**: Add tasks with titles, due dates, priority levels, and project categories
- **Smart Filtering**: Filter by All, Today, Pending, Completed, or High Priority tasks
- **Quick Actions**: Toggle completion status and delete tasks with single clicks
- **Search Functionality**: Find tasks instantly with the built-in search bar
- **Local Storage**: Automatically saves all data locally - no account required

### 📅 Calendar Integration
- **Dynamic Calendar**: Navigate through months with real-time date display
- **Date Selection**: Click any date to view associated tasks
- **Today Highlighting**: Current date is clearly marked
- **Smart Agenda**: View up to 5 prioritized tasks for any selected date
- **Task Scheduling**: Visual representation of your task timeline

### 📊 Progress Tracking
- **Weekly Overview**: Interactive bar chart showing daily task completion
- **Live Statistics**: Real-time counts of today's tasks, completed, and pending
- **Priority Distribution**: Visual indicators for task priority levels
- **Completion Status**: Track your productivity over time

### 🎨 User Experience
- **Modern UI**: Clean, professional design with smooth transitions
- **Responsive Layout**: Works seamlessly on desktop and mobile devices
- **Profile Management**: Customizable user profile with avatar
- **Notification Center**: Stay updated with pending tasks and reminders
- **Settings Panel**: Personalize your experience

### 🎨 Visual Design
- **Color-Coded Priorities**: 
  - 🔴 High Priority (Red)
  - 🟡 Medium Priority (Amber)
  - 🟢 Low Priority (Green)
- **Status Indicators**: Clear visual feedback for completed vs pending tasks
- **Interactive Elements**: Hover effects and smooth animations throughout

## 🚀 Live Demo

Visit the live application: [TaskFlow on GitHub Pages](https://yourusername.github.io/taskflow)

## 🛠️ Technologies Used

- **Frontend**: React 18.2 with Hooks
- **Build Tool**: Vite 4.4 for fast development and optimized builds
- **Styling**: Tailwind CSS 3.3 for responsive design
- **Icons**: Lucide React for beautiful, consistent iconography
- **Charts**: Recharts for interactive data visualization
- **State Management**: React useState and useEffect hooks
- **Storage**: Browser localStorage for data persistence

## 📦 Installation & Setup

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager
- Git

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/taskflow.git
   cd taskflow
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` (or the port shown in terminal)

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build production-ready application
- `npm run preview` - Preview production build locally
- `npm run deploy` - Deploy to GitHub Pages
- `npm run lint` - Run ESLint for code quality

## 📁 Project Structure

```
taskflow/
├── public/                 # Static assets
├── src/
│   ├── App.jsx            # Main application component
│   ├── main.jsx           # React entry point
│   └── index.css          # Global styles and Tailwind imports
├── index.html             # HTML template
├── package.json           # Dependencies and scripts
├── tailwind.config.js     # Tailwind configuration
├── vite.config.js         # Vite configuration
└── README.md              # Project documentation
```

## 🌐 Deployment

### Deploy to GitHub Pages

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy to GitHub Pages**
   ```bash
   npm run deploy
   ```

### Deploy to Other Platforms

The `dist` folder contains the built application ready for deployment to:
- Vercel
- Netlify
- Firebase Hosting
- Any static hosting service

## 🎯 How to Use

### Getting Started
1. **Add Your First Task**: Use the input form to create a new task with title, due date, and priority
2. **Navigate Calendar**: Click the arrow buttons to browse different months
3. **Select Dates**: Click any calendar date to view tasks for that day
4. **Filter Tasks**: Use the filter buttons to view specific task categories
5. **Track Progress**: Monitor your productivity in the weekly progress chart

### Task Management Tips
- Set realistic due dates to maintain momentum
- Use priority levels to focus on what matters most
- Check off completed tasks to see your progress
- Use the search function to quickly find specific tasks
- Review your weekly progress to identify patterns

### Keyboard Shortcuts
- **Enter**: Submit new task form
- **Escape**: Close modal dialogs
- **Tab**: Navigate through interactive elements

## 🔧 Customization

### Themes
The color scheme can be customized in `tailwind.config.js`:
```javascript
theme: {
  extend: {
    colors: {
      // Add your custom colors here
    }
  }
}
```

### Default Tasks
Modify the sample data in `src/App.jsx`:
```javascript
const defaultTasks = [
  // Add your default tasks here
];
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📋 Roadmap

- [ ] Dark mode toggle
- [ ] Task categories/tags
- [ ] Drag & drop task reordering
- [ ] Export data functionality
- [ ] Mobile app version
- [ ] Team collaboration features
- [ ] Integration with external calendars
- [ ] Advanced analytics dashboard

## 🐛 Known Issues

- Calendar navigation is limited to manual month selection
- No bulk task operations yet
- Export functionality not implemented

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Icons provided by [Lucide](https://lucide.dev/)
- Charts powered by [Recharts](https://recharts.org/)
- Styling with [Tailwind CSS](https://tailwindcss.com/)
- Built with [Vite](https://vitejs.dev/) and [React](https://reactjs.org/)

---

**Made with ❤️ for productivity enthusiasts**

For questions or support, please open an issue in the GitHub repository.