import React, { useState } from 'react';

export default function InputForm() {
  const [username, setUsername] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Custom GitHub SVG Icon Component
  const GitHubIcon = ({ size = 24, className = "" }) => (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="currentColor" 
      className={className}
      aria-hidden="true"
    >
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
    </svg>
  );

  const handleSubmit = async () => {
    if (!username.trim()) return;

    setIsSubmitting(true);

    try {
        console.log("Submitted GitHub username:", username);

        const res = await fetch(`http://127.0.0.1:8000/github/analyze/${username}`);

        if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();  // ✅ properly wait for JSON
        console.log("Github Data : ", data.github_data);
    } catch (error) {
        console.error("Error fetching data:", error);
    } finally {
        setIsSubmitting(false);
    }
    };

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-4">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1518709268805-4e9042af2176?q=80&w=2925&auto=format&fit=crop')`,
        }}
      ></div>
      
      {/* Dark Overlay with Subtle Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/60 backdrop-blur-sm"></div>
      
      {/* Enhanced Animated Particles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-purple-400 rounded-full animate-[pulse_2s_ease-in-out_infinite] opacity-60"></div>
        <div className="absolute top-3/4 right-1/4 w-1.5 h-1.5 bg-blue-400 rounded-full animate-[ping_3s_ease-in-out_infinite] opacity-50"></div>
        <div className="absolute top-1/2 left-1/6 w-1 h-1 bg-cyan-400 rounded-full animate-[pulse_2.5s_ease-in-out_infinite] opacity-40"></div>
        <div className="absolute bottom-1/4 right-1/3 w-2 h-2 bg-purple-300 rounded-full animate-[ping_2.8s_ease-in-out_infinite] opacity-30"></div>
        <div className="absolute top-1/3 right-1/5 w-1.5 h-1.5 bg-teal-400 rounded-full animate-[pulse_3s_ease-in-out_infinite] opacity-45"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-md mx-auto px-4 sm:px-6">
        {/* Hero Section */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-purple-500 via-blue-500 to-cyan-500 rounded-full mb-6 shadow-2xl animate-[pulse_4s_ease-in-out_infinite]">
            <GitHubIcon size={36} className="text-white" />
          </div>
          
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4 tracking-tight drop-shadow-md">
            GitHub Username
          </h1>
          
          <p className="text-lg sm:text-xl text-gray-200 font-light">
            Enter your GitHub username to proceed
          </p>
        </div>

        {/* Input Form */}
        <div className="space-y-6">
          <div className="relative group">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="your-username"
              className="w-full px-6 py-4 sm:py-5 text-lg sm:text-xl bg-white/5 backdrop-blur-lg border border-white/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition-all duration-300 text-center font-mono shadow-inner hover:shadow-purple-500/20 group-hover:scale-[1.02] group-hover:shadow-lg"
              aria-label="GitHub username"
            />
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/10 to-blue-500/10 -z-10 blur-xl transition-all duration-300 group-hover:blur-2xl"></div>
          </div>

          <button
            onClick={handleSubmit}
            disabled={!username.trim() || isSubmitting}
            className="w-full bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 hover:from-purple-700 hover:via-blue-700 hover:to-cyan-700 disabled:from-gray-600 disabled:via-gray-600 disabled:to-gray-600 text-white text-lg sm:text-xl font-bold py-4 sm:py-5 rounded-xl transition-all duration-300 transform hover:scale-[1.03] hover:shadow-xl disabled:scale-100 disabled:cursor-not-allowed shadow-lg flex items-center justify-center space-x-3"
            aria-label={isSubmitting ? "Submitting" : "Submit GitHub username"}
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-6 w-6 border-3 border-white border-t-transparent"></div>
                <span>Submitting...</span>
              </>
            ) : (
              <>
                <GitHubIcon size={24} />
                <span>Submit</span>
              </>
            )}
          </button>
        </div>

        {/* Bottom Decoration */}
        <div className="mt-12 text-center">
          <div className="inline-flex space-x-2 text-gray-400">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-[pulse_1.5s_ease-in-out_infinite]"></div>
            <div className="w-2 h-2 bg-green-400 rounded-full animate-[pulse_1.5s_ease-in-out_infinite] delay-500"></div>
            <div className="w-2 h-2 bg-green-400 rounded-full animate-[pulse_1.5s_ease-in-out_infinite] delay-1000"></div>
          </div>
        </div>
      </div>

      {/* Corner Gradients */}
      <div className="absolute top-0 left-0 w-64 h-64 sm:w-80 sm:h-80 bg-gradient-to-br from-purple-600/20 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 sm:w-80 sm:h-80 bg-gradient-to-tl from-blue-600/20 to-transparent rounded-full blur-3xl"></div>
    </div>
  );
}