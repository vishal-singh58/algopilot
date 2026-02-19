import { useState } from "react";
import { Loader2, CheckCircle, AlertCircle, Clock, TrendingUp, Code } from "lucide-react";

const CodeReview = () => {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("cpp");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(null);

  const handleReview = async () => {
    if (!code.trim()) return;

    setIsAnalyzing(true);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    const mockResult = {
      complexity: "O(n log n)",
      score: 85,
      issues: [
        { severity: "medium", message: "Consider using const for variables that don't change" },
        { severity: "low", message: "Add input validation for edge cases" },
      ],
      suggestions: [
        "Use vector.reserve() to optimize memory allocation",
        "Consider using early returns to reduce nesting",
        "Add comments for complex logic sections",
      ],
      strengths: [
        "Clean and readable code structure",
        "Efficient algorithm choice",
        "Good variable naming conventions",
      ],
    };

    setResult(mockResult);
    setIsAnalyzing(false);
  };

  return (
    <div >
      <div className="max-w-6xl mx-auto space-y-8 text-white py-12">

        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold">AI Code Review</h1>
          <p className="text-gray-400 mt-2">
            Paste your code below to get instant feedback on complexity and optimization.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">

          {/* Left - Input */}
          <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-6 space-y-6 shadow-lg">

            <div>
              <label className="block text-gray-300 mb-2">
                Programming Language
              </label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="cpp">C++</option>
                <option value="python">Python</option>
                <option value="java">Java</option>
                <option value="javascript">JavaScript</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-300 mb-2">Code</label>
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Paste your code here..."
                className="w-full min-h-[400px] font-mono text-sm bg-slate-900 border border-slate-700 text-white rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              onClick={handleReview}
              disabled={!code.trim() || isAnalyzing}
              className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 rounded-xl py-3 transition"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Code className="w-4 h-4" />
                  Analyze Code
                </>
              )}
            </button>
          </div>

          {/* Right - Results */}
          <div className="space-y-6">

            {result ? (
              <>
                {/* Score */}
                <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-2xl p-6 text-center">
                  <div className="text-5xl font-bold">{result.score}</div>
                  <div className="text-gray-300 mt-2">Code Quality Score</div>
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-400 mt-2">
                    <Clock className="w-4 h-4" />
                    Time Complexity:
                    <span className="text-blue-400 font-mono">
                      {result.complexity}
                    </span>
                  </div>
                </div>

                {/* Strengths */}
                <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-6">
                  <h3 className="flex items-center gap-2 text-green-400 font-semibold mb-4">
                    <CheckCircle className="w-5 h-5" />
                    Strengths
                  </h3>
                  <ul className="space-y-2 text-gray-300">
                    {result.strengths.map((item, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="text-green-400">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Issues */}
                <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-6">
                  <h3 className="flex items-center gap-2 text-yellow-400 font-semibold mb-4">
                    <AlertCircle className="w-5 h-5" />
                    Issues Found
                  </h3>

                  <div className="space-y-3">
                    {result.issues.map((issue, i) => (
                      <div key={i} className="flex gap-3 items-start">
                        <span className="px-2 py-1 text-xs rounded-full border bg-yellow-500/20 text-yellow-300 border-yellow-500/30">
                          {issue.severity}
                        </span>
                        <span className="text-gray-300">
                          {issue.message}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Suggestions */}
                <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-6">
                  <h3 className="flex items-center gap-2 text-purple-400 font-semibold mb-4">
                    <TrendingUp className="w-5 h-5" />
                    Optimization Suggestions
                  </h3>

                  <ul className="space-y-2 text-gray-300">
                    {result.suggestions.map((item, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="text-purple-400">→</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            ) : (
              <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-10 text-center">
                <div className="w-16 h-16 bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Code className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-white text-lg">No Analysis Yet</h3>
                <p className="text-gray-400 text-sm mt-2">
                  Paste your code and click "Analyze Code" to begin.
                </p>
              </div>
            )}

          </div>

        </div>
      </div>
    </div>
  );
}
 export default CodeReview;
