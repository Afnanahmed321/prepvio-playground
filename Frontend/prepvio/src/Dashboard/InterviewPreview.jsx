import React, { useState, useEffect } from "react";
import { PhoneOff, MessageSquare, Code, X, Code2, ArrowLeft, ImageIcon, CheckCircle2, XCircle, Trophy, Calendar } from "lucide-react";
import { Canvas } from "@react-three/fiber";
import { Environment, useGLTF } from "@react-three/drei";
import { useNavigate, useLocation } from "react-router-dom";
import Editor from "@monaco-editor/react";

// Static 3D Model
function StaticModel(props) {
    const { nodes, materials } = useGLTF('/final_prepvio_model.glb');

    useEffect(() => {
        Object.values(materials || {}).forEach((mat) => (mat.morphTargets = true));
    }, [materials]);

    if (!nodes?.rp_carla_rigged_001_geo) return null;

    return (
        <group
            {...props}
            position={[-0.48, -1.3, 3.967]}
            rotation={[1.9, 0, 0]}
            scale={0.01}
            dispose={null}
        >
            <skinnedMesh
                geometry={nodes.rp_carla_rigged_001_geo.geometry}
                material={nodes.rp_carla_rigged_001_geo.material}
                skeleton={nodes.rp_carla_rigged_001_geo.skeleton}
                morphTargetInfluences={nodes.rp_carla_rigged_001_geo.morphTargetInfluences || []}
                morphTargetDictionary={nodes.rp_carla_rigged_001_geo.morphTargetDictionary || {}}
            />
            <primitive object={nodes.root} />
        </group>
    );
}

// Solved Problems Modal
const SolvedProblemsModal = ({ isOpen, onClose, problems, isDarkMode = true }) => {
    const [selected, setSelected] = useState(null);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 rounded-lg">
            <div className={`
                w-full max-w-6xl h-[85vh] rounded-2xl shadow-2xl overflow-hidden flex
                ${isDarkMode 
                    ? 'bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 text-white' 
                    : 'bg-gradient-to-br from-white via-gray-50 to-gray-100 text-gray-900'
                }
            `}>
                {/* Sidebar */}
                <div className={`
                    w-80 border-r p-6 overflow-y-auto
                    ${isDarkMode 
                        ? 'bg-gray-800/50 border-gray-700/50' 
                        : 'bg-white/80 border-gray-200'
                    }
                `}>
                    <div className="flex items-center gap-3 mb-6">
                        {/* <Trophy className={`w-7 h-7 ${isDarkMode ? 'text-yellow-400' : 'text-yellow-500'}`} /> */}
                        <h2 className={`text-2xl font-bold bg-gradient-to-r ${
                            isDarkMode 
                                ? 'from-green-400 to-emerald-400' 
                                : 'from-green-600 to-emerald-600'
                        } bg-clip-text text-transparent`}>
                            Solved Problems
                        </h2>
                    </div>

                    <div className={`
                        text-sm font-medium mb-4 px-3 py-2 rounded-lg
                        ${isDarkMode 
                            ? 'bg-green-500/10 text-green-400 border border-green-500/20' 
                            : 'bg-green-50 text-green-700 border border-green-200'
                        }
                    `}>
                        {problems.length} {problems.length === 1 ? 'Problem' : 'Problems'} Completed
                    </div>

                    {problems.length === 0 && (
                        <div className={`
                            text-center py-8 px-4 rounded-xl
                            ${isDarkMode ? 'bg-gray-700/30' : 'bg-gray-100'}
                        `}>
                            <Code2 className={`w-12 h-12 mx-auto mb-3 ${
                                isDarkMode ? 'text-gray-600' : 'text-gray-400'
                            }`} />
                            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                No problems solved yet.
                                <br />Start coding to see your progress!
                            </p>
                        </div>
                    )}

                    <div className="space-y-2">
                        {problems.map((p, i) => (
                            <button
                                key={i}
                                onClick={() => setSelected(p)}
                                className={`
                                    w-full text-left p-4 rounded-xl transition-all duration-200
                                    ${selected === p 
                                        ? isDarkMode
                                            ? 'bg-gradient-to-r from-green-600 to-emerald-600 shadow-lg shadow-green-500/20 scale-[1.02]'
                                            : 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg shadow-green-500/30 scale-[1.02]'
                                        : isDarkMode
                                            ? 'bg-gray-700/50 hover:bg-gray-700 border border-gray-600/30'
                                            : 'bg-white hover:bg-gray-50 border border-gray-200 shadow-sm'
                                    }
                                `}
                            >
                                <div className="flex items-start gap-2 mb-2">
                                    {p.skipped ? (
                                        <XCircle className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                                            selected === p 
                                                ? 'text-white' 
                                                : isDarkMode ? 'text-red-400' : 'text-red-500'
                                        }`} />
                                    ) : (
                                        <CheckCircle2 className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                                            selected === p 
                                                ? 'text-white' 
                                                : isDarkMode ? 'text-green-400' : 'text-green-500'
                                        }`} />
                                    )}
                                    <span className="font-medium leading-tight">
                                        {p.problem.title}
                                    </span>
                                </div>
                                <div className={`flex items-center gap-1.5 text-xs ml-7 ${
                                    selected === p 
                                        ? 'text-white/80' 
                                        : isDarkMode ? 'text-gray-400' : 'text-gray-500'
                                }`}>
                                    <Calendar className="w-3.5 h-3.5" />
                                    {new Date(p.solvedAt).toLocaleString()}
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 p-8 overflow-y-auto">
                    {!selected && (
                        <div className="h-full flex items-center justify-center">
                            <div className="text-center">
                                <Code2 className={`w-20 h-20 mx-auto mb-4 ${
                                    isDarkMode ? 'text-gray-700' : 'text-gray-300'
                                }`} />
                                <p className={`text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                    Select a solved problem to view details
                                </p>
                            </div>
                        </div>
                    )}

                    {selected && (
                        <div className="max-w-4xl">
                            {/* Header */}
                            <div className="mb-8">
                                <h2 className={`text-3xl font-bold mb-3 bg-gradient-to-r ${
                                    isDarkMode 
                                        ? 'from-green-400 via-emerald-400 to-teal-400' 
                                        : 'from-green-600 via-emerald-600 to-teal-600'
                                } bg-clip-text text-transparent`}>
                                    {selected.problem.title}
                                </h2>
                                
                                {selected.skipped && (
                                    <div className={`
                                        inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium
                                        ${isDarkMode 
                                            ? 'bg-red-500/10 text-red-400 border border-red-500/20' 
                                            : 'bg-red-50 text-red-700 border border-red-200'
                                        }
                                    `}>
                                        <XCircle className="w-5 h-5" />
                                        This problem was skipped
                                    </div>
                                )}
                            </div>

                            {/* Description */}
                            <div className={`
                                p-6 rounded-xl mb-8
                                ${isDarkMode 
                                    ? 'bg-gray-800/50 border border-gray-700/50' 
                                    : 'bg-white border border-gray-200 shadow-sm'
                                }
                            `}>
                                <h3 className={`text-sm font-semibold uppercase tracking-wider mb-3 ${
                                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                                }`}>
                                    Problem Description
                                </h3>
                                <p className={`whitespace-pre-line leading-relaxed ${
                                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                                }`}>
                                    {selected.problem.description}
                                </p>
                            </div>

                            {/* Solution */}
                            <div className="mb-8">
                                <h3 className={`text-xl font-bold mb-4 flex items-center gap-2 ${
                                    isDarkMode ? 'text-blue-400' : 'text-blue-600'
                                }`}>
                                    <Code2 className="w-6 h-6" />
                                    Your Solution
                                </h3>

                                {selected.skipped ? (
                                    <div className={`
                                        p-8 rounded-xl text-center
                                        ${isDarkMode 
                                            ? 'bg-gray-800/50 border border-gray-700/50' 
                                            : 'bg-gray-50 border border-gray-200'
                                        }
                                    `}>
                                        <Code2 className={`w-12 h-12 mx-auto mb-3 ${
                                            isDarkMode ? 'text-gray-600' : 'text-gray-400'
                                        }`} />
                                        <p className={`italic ${
                                            isDarkMode ? 'text-gray-400' : 'text-gray-500'
                                        }`}>
                                            No code submitted for this problem
                                        </p>
                                    </div>
                                ) : (
                                    <div className={`
                                        rounded-xl overflow-hidden
                                        ${isDarkMode 
                                            ? 'shadow-2xl border border-gray-700/50' 
                                            : 'shadow-lg border-2 border-gray-200'
                                        }
                                    `}>
                                        <div className={`
                                            px-4 py-2 flex items-center gap-2 text-xs font-medium
                                            ${isDarkMode 
                                                ? 'bg-gray-800 text-gray-400 border-b border-gray-700' 
                                                : 'bg-gray-100 text-gray-600 border-b border-gray-200'
                                            }
                                        `}>
                                            <div className="flex gap-1.5">
                                                <div className={`w-3 h-3 rounded-full ${
                                                    isDarkMode ? 'bg-red-500/60' : 'bg-red-400'
                                                }`} />
                                                <div className={`w-3 h-3 rounded-full ${
                                                    isDarkMode ? 'bg-yellow-500/60' : 'bg-yellow-400'
                                                }`} />
                                                <div className={`w-3 h-3 rounded-full ${
                                                    isDarkMode ? 'bg-green-500/60' : 'bg-green-400'
                                                }`} />
                                            </div>
                                            <span className="ml-2">solution.js</span>
                                        </div>
                                        <pre className={`
                                            p-6 overflow-x-auto font-mono text-sm leading-relaxed
                                            ${isDarkMode 
                                                ? 'bg-gray-900 text-gray-100' 
                                                : 'bg-white text-gray-800'
                                            }
                                        `}>
                                            <code>{selected.userCode}</code>
                                        </pre>
                                    </div>
                                )}
                            </div>

                            {/* Test Results */}
                            <div>
                                <h3 className={`text-xl font-bold mb-4 flex items-center gap-2 ${
                                    isDarkMode ? 'text-yellow-400' : 'text-yellow-600'
                                }`}>
                                    <CheckCircle2 className="w-6 h-6" />
                                    Test Case Results
                                </h3>

                                {selected.skipped ? (
                                    <div className={`
                                        p-8 rounded-xl text-center
                                        ${isDarkMode 
                                            ? 'bg-gray-800/50 border border-gray-700/50' 
                                            : 'bg-gray-50 border border-gray-200'
                                        }
                                    `}>
                                        <p className={`italic ${
                                            isDarkMode ? 'text-gray-400' : 'text-gray-500'
                                        }`}>
                                            No test results available
                                        </p>
                                    </div>
                                ) : (
                                    <div className="space-y-3">
                                        {selected.testResults.map((r, idx) => (
                                            <div
                                                key={idx}
                                                className={`
                                                    p-5 rounded-xl border-2 transition-all
                                                    ${r.passed
                                                        ? isDarkMode 
                                                            ? "bg-green-500/5 border-green-500/30 hover:border-green-500/50"
                                                            : "bg-green-50 border-green-300 hover:border-green-400"
                                                        : isDarkMode
                                                            ? "bg-red-500/5 border-red-500/30 hover:border-red-500/50"
                                                            : "bg-red-50 border-red-300 hover:border-red-400"
                                                    }
                                                `}
                                            >
                                                <div className="flex items-center justify-between mb-3">
                                                    <span className={`text-sm font-semibold ${
                                                        isDarkMode ? 'text-gray-400' : 'text-gray-600'
                                                    }`}>
                                                        Test Case {idx + 1}
                                                    </span>
                                                    <span className={`
                                                        flex items-center gap-2 px-3 py-1 rounded-full text-sm font-bold
                                                        ${r.passed 
                                                            ? isDarkMode
                                                                ? 'bg-green-500/20 text-green-400'
                                                                : 'bg-green-200 text-green-700'
                                                            : isDarkMode
                                                                ? 'bg-red-500/20 text-red-400'
                                                                : 'bg-red-200 text-red-700'
                                                        }
                                                    `}>
                                                        {r.passed ? (
                                                            <>
                                                                <CheckCircle2 className="w-4 h-4" />
                                                                Passed
                                                            </>
                                                        ) : (
                                                            <>
                                                                <XCircle className="w-4 h-4" />
                                                                Failed
                                                            </>
                                                        )}
                                                    </span>
                                                </div>
                                                <div className={`space-y-2 text-sm ${
                                                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                                                }`}>
                                                    <div>
                                                        <strong className={
                                                            isDarkMode ? 'text-gray-200' : 'text-gray-900'
                                                        }>Input:</strong> 
                                                        <code className={`ml-2 px-2 py-1 rounded ${
                                                            isDarkMode ? 'bg-gray-800' : 'bg-gray-100'
                                                        }`}>{r.input}</code>
                                                    </div>
                                                    <div>
                                                        <strong className={
                                                            isDarkMode ? 'text-gray-200' : 'text-gray-900'
                                                        }>Expected:</strong> 
                                                        <code className={`ml-2 px-2 py-1 rounded ${
                                                            isDarkMode ? 'bg-gray-800' : 'bg-gray-100'
                                                        }`}>{r.expected}</code>
                                                    </div>
                                                    <div>
                                                        <strong className={
                                                            isDarkMode ? 'text-gray-200' : 'text-gray-900'
                                                        }>Output:</strong> 
                                                        <code className={`ml-2 px-2 py-1 rounded ${
                                                            isDarkMode ? 'bg-gray-800' : 'bg-gray-100'
                                                        }`}>{r.output}</code>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className={`
                        absolute top-6 right-6 p-2.5 rounded-xl transition-all duration-200
                        ${isDarkMode 
                            ? 'bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white border border-gray-700' 
                            : 'bg-white hover:bg-gray-100 text-gray-600 hover:text-gray-900 border border-gray-300 shadow-sm'
                        }
                    `}
                >
                    <X className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
};

const InterviewPreview = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [chatMessages, setChatMessages] = useState([]);
    const [solvedProblems, setSolvedProblems] = useState([]);
    const [showSolvedProblems, setShowSolvedProblems] = useState(false);
    const [interviewData, setInterviewData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [conversationTab, setConversationTab] = useState("questions");
    // const [activeTab, setActiveTab] = useState("questions");


    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const sessionId = params.get("sessionId");

        if (!sessionId) {
            setLoading(false);
            return;
        }

        const fetchInterview = async () => {
            try {
                const res = await fetch(
                    `http://localhost:5000/api/interview-session/${sessionId}`,
                    { credentials: "include" }
                );

                const data = await res.json();

                if (!data.success) throw new Error("Fetch failed");

                setInterviewData(data.session);
                setChatMessages(data.session.messages || []);
                setSolvedProblems(data.session.solvedProblems || []);
            } catch (err) {
                console.error("Preview fetch failed:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchInterview();
    }, [location.search]);


    const handleBack = () => {
        navigate("/dashboard/interview-analysis");
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center text-gray-600">
                Loading preview...
            </div>
        );
    }

    if (!interviewData) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center text-gray-600">
                <p className="text-xl mb-4">No interview data available</p>
                <button
                    onClick={handleBack}
                    className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                    Back to Interviews
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-blue-100 p-6">
            <div className="max-w-7xl mx-auto">
                <div className="bg-white/40 backdrop-blur-xl rounded-2xl shadow-xl border border-white/50 p-8">

                    {/* Header */}
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={handleBack}
                                className="p-2 hover:bg-white/50 rounded-full transition"
                            >
                                <ArrowLeft className="w-6 h-6 text-gray-700" />
                            </button>
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">
                                    {interviewData.companyType} - {interviewData.role}
                                </h1>
                                <p className="text-sm text-gray-600">
                                    Interview Preview (Read-Only)
                                </p>
                            </div>
                        </div>

                        <div className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                            Preview Mode
                        </div>
                    </div>

                    {/* Main Grid */}
                    <div className="grid grid-cols-3 gap-6">

                        {/* Left: Video Area */}
                        <div className="col-span-2 relative">
                            <div className="rounded-2xl overflow-hidden shadow-lg bg-gray-900 h-[420px] relative flex items-center justify-center">
                                <div className="text-center text-gray-400">
                                    <p className="text-lg">Video Recording Not Available</p>
                                    <p className="text-sm mt-2">This is a replay of the interview conversation</p>
                                </div>
                            </div>

                            {/* Interview Stats */}
                            <div className="mt-6 bg-white/50 backdrop-blur rounded-xl p-5">
                                <h3 className="font-semibold text-gray-900 mb-3">
                                    Interview Statistics
                                </h3>
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <p className="text-gray-600">Total Messages</p>
                                        <p className="font-semibold text-gray-900">{chatMessages.length}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-600">Problems Solved</p>
                                        <p className="font-semibold text-gray-900">{solvedProblems.length}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-600">Your Responses</p>
                                        <p className="font-semibold text-gray-900">
                                            {chatMessages.filter(m => m.sender === "User").length}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-gray-600">Highlight Clips</p>
                                        <p className="font-semibold text-gray-900">
                                            {interviewData.highlightClips?.length || 0}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Sidebar */}
                        <div className="space-y-4">

                            {/* Static AI Model */}
                            {/* <div className="relative rounded-xl overflow-hidden shadow-lg h-48 bg-black">
                                <Canvas camera={{ position: [0, 0, 5] }}>
                                    <ambientLight intensity={0.6} />
                                    <Environment preset="studio" />
                                    <StaticModel />
                                </Canvas>

                                <div className="absolute bottom-4 left-4 bg-indigo-200/80 backdrop-blur px-4 py-2 rounded-full flex items-center gap-2 shadow-md">
                                    <span className="text-sm font-medium text-gray-800">
                                        Ms. Jenny (Replay)
                                    </span>
                                </div>
                            </div> */}

                            {/* Conversation History */}
                            <div className="bg-white/50 backdrop-blur rounded-xl p-4 h-[585px] flex flex-col">

                                {/* Tabs Header */}
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex gap-1 bg-gray-100 p-1 rounded-xl">
                                        <button
                                            onClick={() => setConversationTab("questions")}
                                            className={`px-4 py-1.5 text-sm font-medium rounded-lg transition ${conversationTab === "questions"
                                                    ? "bg-white text-gray-900 shadow-sm"
                                                    : "text-gray-500 hover:text-gray-700"
                                                }`}
                                        >
                                            Question List
                                        </button>

                                        <button
                                            onClick={() => setConversationTab("highlights")}
                                            className={`px-4 py-1.5 text-sm font-medium rounded-lg transition ${conversationTab === "highlights"
                                                    ? "bg-white text-gray-900 shadow-sm"
                                                    : "text-gray-500 hover:text-gray-700"
                                                }`}
                                        >
                                            Highlights
                                        </button>
                                    </div>

                                    {solvedProblems.length > 0 && (
                                        <button
                                            onClick={() => setShowSolvedProblems(true)}
                                            className="p-2 rounded-lg hover:bg-gray-100 transition"
                                            title="View Solved Problems"
                                        >
                                            <Code2 className="w-5 h-5 text-gray-600" />
                                        </button>
                                    )}
                                </div>


                                {/* Content Area */}
                                <div className="flex-1 overflow-y-auto pr-2">
                                    {conversationTab === "questions" ? (
                                        chatMessages.length === 0 ? (
                                            <p className="text-sm text-gray-500 text-center mt-10">
                                                No conversation history available
                                            </p>
                                        ) : (
                                            chatMessages.map((msg, idx) => (
                                                <div
                                                    key={idx}
                                                    className={`mb-4 ${msg.sender === "User" ? "text-right" : "text-left"
                                                        }`}
                                                >
                                                    <div
                                                        className={`inline-block max-w-[85%] px-4 py-3 rounded-lg shadow ${msg.sender === "User"
                                                            ? "bg-indigo-600 text-white"
                                                            : "bg-white text-gray-800"
                                                            }`}
                                                    >
                                                        <p className="text-xs font-semibold mb-1 opacity-75">
                                                            {msg.sender === "User" ? "You" : "Jenny"}
                                                        </p>
                                                        <p className="text-sm">{msg.text}</p>

                                                        {msg.time && (
                                                            <p className="text-xs mt-1 opacity-60">
                                                                {msg.time}
                                                            </p>
                                                        )}

                                                        {msg.feedback && (
                                                            <div className="mt-3 pt-3 border-t border-white/20">
                                                                <p className="text-xs font-semibold mb-1">Feedback:</p>
                                                                <p className="text-xs">{msg.feedback.suggestion}</p>
                                                                {msg.feedback.example && (
                                                                    <p className="text-xs mt-1 italic">
                                                                        Example: {msg.feedback.example}
                                                                    </p>
                                                                )}
                                                            </div>
                                                        )}
                                                    </div>

                                                    {msg.stage && (
                                                        <p className="text-xs text-gray-500 mt-1">
                                                            Stage: {msg.stage}
                                                        </p>
                                                    )}
                                                </div>
                                            ))
                                        )
                                    ) : (
                                        interviewData.highlightClips?.length === 0 ? (
                                            <p className="text-sm text-gray-500 text-center mt-10">
                                                No highlight clips available
                                            </p>
                                        ) : (
                                            (Array.isArray(interviewData.highlightClips)
                                                ? interviewData.highlightClips
                                                : []
                                            ).map((clip, idx) => (
                                                <div
                                                    key={idx}
                                                    className="mb-4 bg-white rounded-lg p-3 shadow"
                                                >
                                                    <div className="flex items-start justify-between mb-2">
                                                        <div className="flex-1">
                                                            <p className="text-xs text-gray-500 mb-1">
                                                                {clip.timestamp}
                                                            </p>

                                                            <p className="text-sm font-medium mb-2">
                                                                {clip.questionText && clip.questionText.trim().length > 0
                                                                    ? clip.questionText
                                                                    : `Question ${clip.questionIndex + 1}`}
                                                            </p>


                                                        </div>
                                                        <div className="ml-2 px-2 py-1 bg-red-100 text-red-700 rounded text-xs font-medium">
                                                            Nervous
                                                        </div>
                                                    </div>

                                                    {clip.imageUrl ? (
                                                        <img
                                                            src={clip.imageUrl}
                                                            alt="Nervousness highlight"
                                                            className="rounded-md w-full object-cover cursor-pointer hover:opacity-90 transition"
                                                            onClick={() => window.open(clip.imageUrl, '_blank')}
                                                        />
                                                    ) : (
                                                        <div className="bg-gray-100 rounded-md p-4 text-center">
                                                            <ImageIcon className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                                                            <p className="text-xs text-gray-500 italic">
                                                                Image not available
                                                            </p>
                                                        </div>
                                                    )}

                                                    {/* <div className="mt-2 flex items-center justify-between text-xs">
                                                        <span className="text-gray-600">
                                                            Score: <strong>{Number(clip.nervousScore || 0).toFixed(2)}</strong>
                                                        </span>
                                                        <span className="text-gray-600">
                                                            Confidence: <strong>{Number(clip.confidence || 0).toFixed(2)}</strong>
                                                        </span>
                                                    </div> */}
                                                </div>
                                            ))
                                        )
                                    )}
                                </div>

                                {/* Footer */}
                                <div className="mt-3 pt-3 border-t border-gray-200">
                                    <p className="text-xs text-gray-500 text-center italic">
                                        This is a read-only preview. No interactions available.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Solved Problems Modal */}
                    {showSolvedProblems && (
                        <SolvedProblemsModal
                            isOpen={showSolvedProblems}
                            onClose={() => setShowSolvedProblems(false)}
                            problems={solvedProblems}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default InterviewPreview;