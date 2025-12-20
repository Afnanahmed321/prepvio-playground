import React, { useState } from "react";
import { BookOpen, Play, Clock, CheckCircle, Trash2, RotateCcw } from "lucide-react";

function Learning() {
  const [courses, setCourses] = useState([
    {
      id: 1,
      title: "Complete Web Development Bootcamp",
      description: "Master HTML, CSS, JavaScript, React, Node.js and more",
      progress: 45,
      lastAccessed: "2 hours ago",
      completed: false,
      thumbnail: "web-dev",
      duration: "40 hours",
      instructor: "John Doe"
    },
    {
      id: 2,
      title: "Python for Data Science",
      description: "Learn Python, NumPy, Pandas, Matplotlib for data analysis",
      progress: 78,
      lastAccessed: "1 day ago",
      completed: false,
      thumbnail: "python",
      duration: "30 hours",
      instructor: "Jane Smith"
    },
    {
      id: 3,
      title: "UI/UX Design Fundamentals",
      description: "Design thinking, wireframing, prototyping with Figma",
      progress: 100,
      lastAccessed: "3 days ago",
      completed: true,
      thumbnail: "design",
      duration: "25 hours",
      instructor: "Mike Johnson"
    },
    {
      id: 4,
      title: "JavaScript Advanced Concepts",
      description: "Closures, promises, async/await, ES6+ features",
      progress: 23,
      lastAccessed: "5 days ago",
      completed: false,
      thumbnail: "javascript",
      duration: "20 hours",
      instructor: "Sarah Wilson"
    },
    {
      id: 5,
      title: "Machine Learning A-Z",
      description: "Hands-on Python & R in data science with ML algorithms",
      progress: 12,
      lastAccessed: "1 week ago",
      completed: false,
      thumbnail: "ml",
      duration: "45 hours",
      instructor: "David Brown"
    }
  ]);

  const inProgressCount = courses.filter(c => !c.completed).length;
  const completedCount = courses.filter(c => c.completed).length;

  const handleResumeCourse = (id) => {
    console.log(`Resuming course ${id}`);
    // Add your resume course logic here
  };

  const handleRemoveCourse = (id) => {
    setCourses(courses.filter(course => course.id !== id));
  };

  const handleRestartCourse = (id) => {
    setCourses(courses.map(course =>
      course.id === id ? { ...course, progress: 0, completed: false } : course
    ));
  };

  const getCourseColor = (completed, progress) => {
    if (completed) return "bg-green-100/50";
    if (progress > 50) return "bg-indigo-100/50";
    if (progress > 0) return "bg-yellow-100/50";
    return "bg-white/40";
  };

  return (
    <div className="flex h-screen overflow-x-hidden p-6">
      <div className="flex-1">
        <div className="bg-white/30 backdrop-blur-2xl border border-white/50 rounded-3xl shadow-lg flex flex-col h-full transition-all duration-300">
          
          {/* Header */}
          <div className="p-6 border-b border-white/50">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
                <BookOpen className="w-6 h-6 text-indigo-600" />
                My Learning
              </h2>
              <div className="flex gap-4">
                <div className="bg-indigo-100/50 backdrop-blur-sm px-4 py-2 rounded-xl">
                  <p className="text-xs text-gray-600">In Progress</p>
                  <p className="text-lg font-bold text-indigo-600">{inProgressCount}</p>
                </div>
                <div className="bg-green-100/50 backdrop-blur-sm px-4 py-2 rounded-xl">
                  <p className="text-xs text-gray-600">Completed</p>
                  <p className="text-lg font-bold text-green-600">{completedCount}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Courses List */}
          <div className="flex-1 flex flex-col p-6 space-y-4 overflow-y-auto">
            {courses.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <BookOpen className="w-16 h-16 mb-4 opacity-30" />
                <p className="text-lg font-medium">No courses yet</p>
                <p className="text-sm">Start learning something new, bhidu!</p>
              </div>
            ) : (
              courses.map((course) => (
                <div
                  key={course.id}
                  className={`p-5 rounded-2xl ${getCourseColor(course.completed, course.progress)} backdrop-blur-sm text-gray-800 shadow-md transition-all duration-300 hover:shadow-lg`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      {/* Course Title & Status */}
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {course.title}
                        </h3>
                        {course.completed && (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        )}
                      </div>

                      {/* Course Description */}
                      <p className="text-sm text-gray-700 mb-3">
                        {course.description}
                      </p>

                      {/* Course Meta Info */}
                      <div className="flex items-center gap-4 text-xs text-gray-600 mb-3">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{course.duration}</span>
                        </div>
                        <div>
                          <span>Instructor: {course.instructor}</span>
                        </div>
                        <div>
                          <span>Last accessed: {course.lastAccessed}</span>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="mb-3">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-medium text-gray-700">
                            {course.completed ? "Completed" : "Progress"}
                          </span>
                          <span className="text-xs font-bold text-gray-900">
                            {course.progress}%
                          </span>
                        </div>
                        <div className="w-full bg-white/50 rounded-full h-2 overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${
                              course.completed
                                ? "bg-green-500"
                                : course.progress > 50
                                ? "bg-indigo-500"
                                : "bg-yellow-500"
                            }`}
                            style={{ width: `${course.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col gap-2">
                      {!course.completed ? (
                        <button
                          onClick={() => handleResumeCourse(course.id)}
                          className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-xl flex items-center gap-2 transition text-sm font-medium whitespace-nowrap"
                        >
                          <Play className="w-4 h-4" />
                          Resume
                        </button>
                      ) : (
                        <button
                          onClick={() => handleRestartCourse(course.id)}
                          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl flex items-center gap-2 transition text-sm font-medium whitespace-nowrap"
                        >
                          <RotateCcw className="w-4 h-4" />
                          Restart
                        </button>
                      )}
                      <button
                        onClick={() => handleRemoveCourse(course.id)}
                        className="text-red-600 hover:text-red-800 p-2 rounded-xl hover:bg-white/30 transition"
                        title="Remove course"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Learning;