import { useState, useEffect } from "react";
import axios from "axios";
import { Loader2, Code, History, ChevronDown, ChevronUp } from "lucide-react";

const CodeReview = () => {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [expandedId, setExpandedId] = useState(null);
  const [remaining, setRemaining] = useState(null);

  const userId = "12345";

  /* ===============================
     Fetch Review History
  =============================== */
  const fetchHistory = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/review/${userId}`
      );
      setHistory(res.data.reviews);
    } catch (err) {
      console.error("History Error:", err);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  /* ===============================
     Send Code to Backend
  =============================== */
  const handleReview = async () => {
    if (!code.trim()) return;

    try {
      setIsAnalyzing(true);

      const res = await axios.post(
        "http://localhost:5000/api/review",
        {
          userId,
          code,
          language,
        }
      );

      setResult(res.data.review);
      setRemaining(res.data.remainingToday);
      setCode("");
      fetchHistory();
    } catch (error) {
      console.error(error.response?.data || error.message);
      alert(error.response?.data?.message || "Something went wrong");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto text-white py-12 space-y-12">

      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold">AI Code Review</h1>
          <p className="text-gray-400 mt-2">
            Smart AI feedback with persistent review history.
          </p>
        </div>

        {remaining !== null && (
          <div className="bg-blue-500/20 border border-blue-500/40 px-4 py-2 rounded-xl text-sm">
            Remaining Today: <span className="font-bold">{remaining}</span>
          </div>
        )}
      </div>

      {/* Input Section */}
      <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-6 space-y-6 shadow-xl">

        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3"
        >
          <option value="cpp">C++</option>
          <option value="python">Python</option>
          <option value="java">Java</option>
          <option value="javascript">JavaScript</option>
        </select>

        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Paste your code here..."
          className="w-full min-h-[300px] bg-slate-900 border border-slate-700 rounded-lg p-4 font-mono text-sm"
        />

        <button
          onClick={handleReview}
          disabled={isAnalyzing}
          className="w-full flex justify-center items-center gap-2 bg-blue-600 hover:bg-blue-700 rounded-xl py-3 transition"
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

      {/* Latest Review */}
      {result && (
        <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-2xl p-6 shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Latest Review</h2>
          <pre className="whitespace-pre-wrap text-gray-300 text-sm leading-relaxed">
            {result.review}
          </pre>
        </div>
      )}

      {/* History Section */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          <History className="w-6 h-6" />
          Review History
        </h2>

        {history.length === 0 ? (
          <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8 text-center text-gray-400">
            No reviews yet. Start by analyzing your code 🚀
          </div>
        ) : (
          history.map((item) => (
            <div
              key={item._id}
              className="bg-slate-800 border border-slate-700 rounded-2xl overflow-hidden transition hover:border-blue-500/40"
            >
              <div
                className="p-5 cursor-pointer flex justify-between items-center"
                onClick={() =>
                  setExpandedId(expandedId === item._id ? null : item._id)
                }
              >
                <div>
                  <div className="text-sm text-gray-400">
                    {new Date(item.createdAt).toLocaleString()}
                  </div>
                  <div className="text-blue-400 text-sm">
                    {item.language}
                  </div>
                </div>

                {expandedId === item._id ? (
                  <ChevronUp />
                ) : (
                  <ChevronDown />
                )}
              </div>

              {expandedId === item._id && (
                <div className="px-5 pb-5 space-y-4 border-t border-slate-700">

                  <div>
                    <h4 className="text-sm text-gray-400 mb-2">Submitted Code</h4>
                    <pre className="bg-slate-900 p-3 rounded-lg text-xs overflow-auto">
                      {item.code}
                    </pre>
                  </div>

                  <div>
                    <h4 className="text-sm text-gray-400 mb-2">AI Review</h4>
                    <pre className="whitespace-pre-wrap text-gray-300 text-sm">
                      {item.review}
                    </pre>
                  </div>

                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CodeReview;