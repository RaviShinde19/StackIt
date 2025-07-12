import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { 
  MagnifyingGlassIcon, 
  PlusIcon, 
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  UserIcon
} from '@heroicons/react/24/outline'

const Dashboard = () => {
  const [questions, setQuestions] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('newest')
  const [filterBy, setFilterBy] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [showMoreDropdown, setShowMoreDropdown] = useState(false)
  const questionsPerPage = 10

  // Mock data for demonstration
  const mockQuestions = [
    {
      id: 1,
      title: "How to implement authentication in React with JWT?",
      content: "I'm building a React application and need to implement JWT authentication. What's the best approach for handling tokens, refresh tokens, and protecting routes?",
      author: "john_doe",
      avatar: "JD",
      answers: 3,
      tags: ["React", "JWT", "Authentication"],
      createdAt: "2024-01-15T10:30:00Z",
      isAnswered: true
    },
    {
      id: 2,
      title: "MongoDB vs PostgreSQL for a new project",
      content: "I'm starting a new web application and can't decide between MongoDB and PostgreSQL. What are the pros and cons of each for a modern web app?",
      author: "sarah_dev",
      avatar: "SD",
      answers: 5,
      tags: ["MongoDB", "PostgreSQL", "Database"],
      createdAt: "2024-01-14T15:45:00Z",
      isAnswered: false
    },
    {
      id: 3,
      title: "Best practices for REST API design",
      content: "What are the essential best practices when designing RESTful APIs? I'm looking for guidance on URL structure, HTTP methods, and response formats.",
      author: "mike_backend",
      avatar: "MB",
      answers: 7,
      tags: ["REST API", "Backend", "Design"],
      createdAt: "2024-01-13T09:20:00Z",
      isAnswered: true
    },
    {
      id: 4,
      title: "CSS Grid vs Flexbox - When to use which?",
      content: "I'm confused about when to use CSS Grid vs Flexbox. Can someone explain the differences and provide examples of when each is most appropriate?",
      author: "css_newbie",
      avatar: "CN",
      answers: 4,
      tags: ["CSS", "Flexbox", "Grid"],
      createdAt: "2024-01-12T14:10:00Z",
      isAnswered: true
    },
    {
      id: 5,
      title: "How to handle state management in large React apps?",
      content: "My React app is growing and state management is becoming complex. Should I use Redux, Zustand, or Context API? What are the trade-offs?",
      author: "react_enthusiast",
      avatar: "RE",
      answers: 6,
      tags: ["React", "State Management", "Redux"],
      createdAt: "2024-01-11T11:30:00Z",
      isAnswered: false
    },
    {
      id: 6,
      title: "Docker containerization best practices",
      content: "What are the best practices for containerizing a Node.js application with Docker? Looking for optimization tips and security considerations.",
      author: "devops_guru",
      avatar: "DG",
      answers: 8,
      tags: ["Docker", "Node.js", "DevOps"],
      createdAt: "2024-01-10T16:20:00Z",
      isAnswered: true
    },
    {
      id: 7,
      title: "TypeScript vs JavaScript for large projects",
      content: "We're debating whether to use TypeScript or stick with JavaScript for our next large project. What are the real benefits and drawbacks?",
      author: "tech_lead",
      avatar: "TL",
      answers: 12,
      tags: ["TypeScript", "JavaScript", "Architecture"],
      createdAt: "2024-01-09T11:15:00Z",
      isAnswered: true
    },
    {
      id: 8,
      title: "Optimizing SQL queries for better performance",
      content: "My SQL queries are running slow on large datasets. What are the best techniques for optimizing query performance and database indexing?",
      author: "db_admin",
      avatar: "DA",
      answers: 2,
      tags: ["SQL", "Performance", "Database"],
      createdAt: "2024-01-08T13:45:00Z",
      isAnswered: false
    }
  ]

  useEffect(() => {
    setQuestions(mockQuestions)
  }, [])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showMoreDropdown && !event.target.closest('.dropdown-container')) {
        setShowMoreDropdown(false)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [showMoreDropdown])

  const filteredQuestions = questions.filter(question => {
    const matchesSearch = question.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         question.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         question.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesFilter = filterBy === 'all' || 
                         (filterBy === 'answered' && question.isAnswered) ||
                         (filterBy === 'unanswered' && !question.isAnswered)
    
    return matchesSearch && matchesFilter
  })

  const sortedQuestions = [...filteredQuestions].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.createdAt) - new Date(a.createdAt)
      case 'oldest':
        return new Date(a.createdAt) - new Date(b.createdAt)
      case 'votes':
        return b.votes - a.votes
      case 'views':
        return b.views - a.views
      default:
        return 0
    }
  })

  const totalPages = Math.ceil(sortedQuestions.length / questionsPerPage)
  const paginatedQuestions = sortedQuestions.slice(
    (currentPage - 1) * questionsPerPage,
    currentPage * questionsPerPage
  )

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60))
    
    if (diffInHours < 1) return 'Just now'
    if (diffInHours < 24) return `${diffInHours}h ago`
    if (diffInHours < 48) return 'Yesterday'
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  return (
    <div className="min-h-screen bg-gray-50 font-inter">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="text-2xl font-bold text-gray-900 tracking-tight">
              Stack<span className="text-blue-600">It</span>
            </Link>

            {/* Login Button */}
            <Link
              to="/login"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200 shadow-md hover:shadow-lg"
            >
              Login
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {/* Ask Question Button */}
        <div className="mb-8 flex gap-4">
          <Link
            to="/ask"
            className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            <PlusIcon className="w-5 h-5 mr-2" />
            Ask New Question
          </Link>
        </div>

        {/* Filters and Search */}
        <div className="mb-8 bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setFilterBy('all')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                  filterBy === 'all'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Newest
              </button>
              <button
                onClick={() => setFilterBy('unanswered')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                  filterBy === 'unanswered'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Unanswered
              </button>
              
              {/* More Dropdown */}
              <div className="relative dropdown-container">
                <button
                  onClick={() => setShowMoreDropdown(!showMoreDropdown)}
                  className="flex items-center bg-gray-100 text-gray-700 hover:bg-gray-200 px-4 py-2 rounded-lg font-medium transition-colors duration-200"
                >
                  More
                  <ChevronDownIcon className="w-4 h-4 ml-1" />
                </button>
                
                {showMoreDropdown && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-xl z-10 border border-gray-200">
                    <div className="py-2">
                      <button
                        onClick={() => {
                          setSortBy('votes')
                          setShowMoreDropdown(false)
                        }}
                        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        Most Voted
                      </button>
                      <button
                        onClick={() => {
                          setSortBy('oldest')
                          setShowMoreDropdown(false)
                        }}
                        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        Oldest
                      </button>
                      <button
                        onClick={() => {
                          setFilterBy('answered')
                          setShowMoreDropdown(false)
                        }}
                        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        Answered
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-md ml-auto">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="Search questions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Questions List */}
        <div className="space-y-4">
          {paginatedQuestions.map((question) => (
            <div
              key={question.id}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200 border border-gray-200 hover:border-gray-300"
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900 mb-2 hover:text-blue-600 cursor-pointer transition-colors line-clamp-2">
                  {question.title}
                </h3>
                <div className="flex items-center bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium ml-4 flex-shrink-0">
                  {question.answers} ans
                </div>
              </div>
              
              <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                {question.content}
              </p>
              
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {question.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full hover:bg-blue-200 cursor-pointer transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Author and Date */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    {question.avatar}
                  </div>
                  <span className="text-gray-700 text-sm font-medium">{question.author}</span>
                </div>
                <span className="text-gray-500 text-sm">{formatDate(question.createdAt)}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-12">
            <nav className="flex items-center space-x-2">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="p-2 bg-white text-gray-600 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm border border-gray-200"
              >
                <ChevronLeftIcon className="w-5 h-5" />
              </button>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors shadow-sm border ${
                    currentPage === page
                      ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                      : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  {page}
                </button>
              ))}
              
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="p-2 bg-white text-gray-600 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm border border-gray-200"
              >
                <ChevronRightIcon className="w-5 h-5" />
              </button>
            </nav>
          </div>
        )}
      </main>
    </div>
  )
}

export default Dashboard