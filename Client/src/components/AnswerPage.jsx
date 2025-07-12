import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ChevronUpIcon, BellIcon, UserCircleIcon, HomeIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import SimpleRichTextEditor from './SimpleRichTextEditor';

const AnswerPage = () => {
  const { questionId } = useParams();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [userVotes, setUserVotes] = useState(new Set());
  const [answerContent, setAnswerContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock data - replace with actual API calls
  const [question, setQuestion] = useState({
    id: 1,
    title: "How to join 2 columns in SQL and display the result in a single column?",
    description: "I have two columns in my SQL table: first_name and last_name. I want to concatenate them and display as a single column called full_name. What's the best way to do this in different SQL databases?",
    tags: ["SQL", "Database", "MySQL", "PostgreSQL"],
    author: "John Doe",
    createdAt: "2024-01-15",
    votes: 24
  });

  const [answers, setAnswers] = useState([
    {
      id: 1,
      content: `You can use the CONCAT function in most SQL databases:

**For MySQL and PostgreSQL:**
\`\`\`sql
SELECT CONCAT(first_name, ' ', last_name) AS full_name
FROM users;
\`\`\`

**For SQL Server:**
\`\`\`sql
SELECT first_name + ' ' + last_name AS full_name
FROM users;
\`\`\`

**Alternative using CONCAT_WS (Concatenate With Separator):**
\`\`\`sql
SELECT CONCAT_WS(' ', first_name, last_name) AS full_name
FROM users;
\`\`\`

The CONCAT_WS function is useful because it handles NULL values gracefully.`,
      author: "Meet K Patel",
      votes: 15,
      createdAt: "2024-01-15"
    },
    {
      id: 2,
      content: `Another approach using the pipe operator (PostgreSQL specific):

\`\`\`sql
SELECT first_name || ' ' || last_name AS full_name
FROM users;
\`\`\`

**Benefits:**
• Simple and readable
• Standard SQL syntax
• Works well with PostgreSQL

**Note:** Be careful with NULL values as they can cause the entire result to be NULL.`,
      author: "Sarah Johnson",
      votes: 8,
      createdAt: "2024-01-15"
    }
  ]);

  const handleVote = (answerId) => {
    if (!isLoggedIn) {
      setShowLoginPopup(true);
      return;
    }

    if (userVotes.has(answerId)) {
      // User already voted
      return;
    }

    setAnswers(prevAnswers => 
      prevAnswers.map(answer => 
        answer.id === answerId 
          ? { ...answer, votes: answer.votes + 1 }
          : answer
      )
    );

    setUserVotes(prev => new Set([...prev, answerId]));
  };

  const handleSubmitAnswer = async (e) => {
    e.preventDefault();
    if (!answerContent.trim()) return;

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      const newAnswer = {
        id: answers.length + 1,
        content: answerContent,
        author: "Current User",
        votes: 0,
        createdAt: new Date().toISOString().split('T')[0]
      };
      
      setAnswers(prev => [...prev, newAnswer]);
      setAnswerContent('');
      setIsSubmitting(false);
    }, 1000);
  };

  const LoginPopup = () => (
    showLoginPopup && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
          <h3 className="text-lg font-semibold mb-4">Login Required</h3>
          <p className="text-gray-600 mb-6">You need to be logged in to vote on answers.</p>
          <div className="flex space-x-3">
            <Link 
              to="/login" 
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg text-center hover:bg-blue-700 transition-colors"
            >
              Login
            </Link>
            <Link 
              to="/register" 
              className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg text-center hover:bg-gray-200 transition-colors"
            >
              Sign Up
            </Link>
          </div>
          <button 
            onClick={() => setShowLoginPopup(false)}
            className="w-full mt-3 text-gray-500 hover:text-gray-700"
          >
            Cancel
          </button>
        </div>
      </div>
    )
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-6">
              <Link to="/" className="text-2xl font-bold text-gray-900 tracking-tight">
                Stack<span className="text-blue-600">It</span>
              </Link>
              <Link to="/" className="flex items-center text-gray-600 hover:text-gray-900 transition-colors">
                <HomeIcon className="h-5 w-5 mr-1" />
                Home
              </Link>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors">
                <BellIcon className="h-6 w-6" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  3
                </span>
              </button>
              
              {isLoggedIn ? (
                <div className="flex items-center space-x-2">
                  <img 
                    src="/api/placeholder/32/32" 
                    alt="Profile" 
                    className="h-8 w-8 rounded-full"
                  />
                  <span className="text-sm font-medium text-gray-700">John Doe</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Link to="/login" className="text-gray-600 hover:text-gray-900 transition-colors">
                    Login
                  </Link>
                  <Link 
                    to="/register" 
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3">
          <nav className="flex items-center space-x-2 text-sm">
            <Link to="/" className="text-blue-600 hover:text-blue-800">
              Questions
            </Link>
            <ChevronRightIcon className="h-4 w-4 text-gray-400" />
            <span className="text-gray-600 truncate">
              {question.title}
            </span>
          </nav>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {/* Question Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-4 leading-tight">
            {question.title}
          </h1>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {question.tags.map((tag, index) => (
              <span 
                key={index} 
                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
          
          <p className="text-gray-600 leading-relaxed mb-4">
            {question.description}
          </p>
          
          <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-gray-100">
            <div className="flex items-center space-x-4">
              <span>Asked by <strong>{question.author}</strong></span>
              <span>{question.createdAt}</span>
            </div>
            <div className="flex items-center space-x-2">
              <ChevronUpIcon className="h-4 w-4" />
              <span>{question.votes} votes</span>
            </div>
          </div>
        </div>

        {/* Answers Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            {answers.length} Answer{answers.length !== 1 ? 's' : ''}
          </h2>
          
          <div className="space-y-6">
            {answers.map((answer) => (
              <div key={answer.id} className="border border-gray-200 rounded-lg p-6">
                <div className="flex">
                  {/* Vote Section */}
                  <div className="flex flex-col items-center mr-6">
                    <button
                      onClick={() => handleVote(answer.id)}
                      className={`p-2 rounded-full transition-colors ${
                        userVotes.has(answer.id) 
                          ? 'bg-blue-100 text-blue-600' 
                          : 'text-gray-400 hover:bg-gray-100 hover:text-gray-600'
                      }`}
                      title={userVotes.has(answer.id) ? "You've already voted" : "Vote up"}
                    >
                      <ChevronUpIcon className="h-6 w-6" />
                    </button>
                    <span className="text-lg font-semibold text-gray-700">
                      {answer.votes}
                    </span>
                  </div>
                  
                  {/* Answer Content */}
                  <div className="flex-1">
                    <div className="prose prose-blue max-w-none">
                      <div 
                        className="text-gray-700 leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: answer.content }}
                      />
                    </div>
                    
                    {/* Answer Meta */}
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                      <div className="text-sm text-gray-500">
                        Answered on {answer.createdAt}
                      </div>
                      <div className="flex items-center">
                        <span className="bg-violet-100 text-violet-800 px-3 py-1 rounded-full text-sm font-medium">
                          {answer.author}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Submit Answer Form */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Submit Your Answer</h2>
          
          <form onSubmit={handleSubmitAnswer}>
            <div className="mb-6">
              <SimpleRichTextEditor
                value={answerContent}
                onChange={setAnswerContent}
                placeholder="Write your answer here... Use the toolbar to format your text, add links, images, and more!"
                className="min-h-[300px]"
                onSubmit={handleSubmitAnswer}
                submitText={isSubmitting ? 'Submitting...' : 'Submit Answer'}
              />
            </div>
          </form>
        </div>
      </main>

      {/* Login Popup */}
      <LoginPopup />
    </div>
  );
};

export default AnswerPage;
