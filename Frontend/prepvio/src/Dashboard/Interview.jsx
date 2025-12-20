import React, { useState } from 'react';
import {
    Search,
    FileText,
    BarChart,
    Calendar,
    Clock,
    XCircle
} from 'lucide-react';
import { format } from 'date-fns';

const initialInterviewAnalyses = [
    {
        id: 1,
        title: 'Software Engineer Interview',
        date: new Date(2024, 10, 21, 10, 30),
        company: 'Tech Innovators Inc.',
        role: 'Software Engineer',
        analysis: {
            overall: 'Good performance. Strong technical skills demonstrated...',
            communication: 'Clear and concise communication...',
            technical: 'Excellent understanding of data structures and algorithms...',
            behavioral: 'Answered behavioral questions confidently...',
            suggestions: [
                'Practice more whiteboard coding under time constraints.',
                'Work on explaining your thought process more explicitly.',
                'Review recent industry trends in software architecture.'
            ],
        },
        tags: ['Coding', 'Algorithms', 'System Design', 'Behavioral'],
    },
    {
        id: 2,
        title: 'Product Manager Interview',
        date: new Date(2024, 10, 18, 14, 0),
        company: 'Global Solutions Corp.',
        role: 'Product Manager',
        analysis: {
            overall: 'Promising candidate with a good understanding of the product lifecycle...',
            communication: 'Articulate and persuasive...',
            technical: 'Solid understanding of technical concepts related to product development...',
            behavioral: 'Showed good understanding of customer empathy and market dynamics...',
            suggestions: [
                'Practice more with metrics and data analysis.',
                'Refine your storytelling skills.',
                'Explore case studies on product launch and post-launch analysis.'
            ],
        },
        tags: ['Product Management', 'Leadership', 'Communication', 'Strategy'],
    },
];

const InterviewAnalysisPage = () => {
    const [interviewAnalyses] = useState(initialInterviewAnalyses);
    const [view, setView] = useState('list');
    const [selectedInterview, setSelectedInterview] = useState(null);

    const getMonthName = (month) => [
        'January','February','March','April','May','June',
        'July','August','September','October','November','December'
    ][month];

    return (
        <div className="flex flex-col h-screen font-inter overflow-x-hidden p-6">
            <main className="flex-1 overflow-y-auto">
                <div className="bg-white/30 backdrop-blur-2xl border border-white/50 shadow-lg rounded-3xl flex flex-col min-h-screen p-6 transition-all duration-300">
                    
                    {/* Header */}
                    <div className="pb-4 border-b border-white/50 mb-6">
                        <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
                            <Search className="w-6 h-6 text-indigo-600"/>
                            Interview Analysis
                        </h2>
                        <div className="flex gap-4 mt-4">
                            <button
                                onClick={() => setView('list')}
                                className={`p-2 rounded-lg flex items-center gap-2 text-gray-700 hover:text-gray-900
                                    ${view === 'list' ? 'bg-white/50 backdrop-blur-sm' : ''}`}
                            >
                                List View
                            </button>
                            <button
                                onClick={() => setView('timeline')}
                                className={`p-2 rounded-lg flex items-center gap-2 text-gray-700 hover:text-gray-900
                                    ${view === 'timeline' ? 'bg-white/50 backdrop-blur-sm' : ''}`}
                            >
                                Timeline View
                            </button>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 overflow-y-auto flex flex-col space-y-6">
                        {view === 'list' && (
                            <div className="space-y-4 w-full">
                                {interviewAnalyses.map((interview) => (
                                    <div
                                        key={interview.id}
                                        className="bg-white/50 backdrop-blur-sm border border-white/30 cursor-pointer hover:bg-white/70 transition-all duration-300 rounded-2xl p-6"
                                        onClick={() => setSelectedInterview(interview)}
                                    >
                                        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                                            <FileText className="w-5 h-5"/>
                                            {interview.title}
                                        </h3>
                                        <p className="text-sm text-gray-600">
                                            {interview.company} - {interview.role}
                                        </p>
                                        <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                                            <Calendar className="w-3 h-3"/>
                                            {format(interview.date, 'PPP')}
                                            <Clock className="w-3 h-3 ml-2"/>
                                            {format(interview.date, 'h:mm a')}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        )}

                        {view === 'timeline' && (
                            <div className="relative w-full space-y-8">
                                <div className="absolute left-6 top-0 bottom-0 w-1 bg-gray-400"></div>
                                {interviewAnalyses
                                    .sort((a,b)=>b.date-a.date)
                                    .map((interview) => (
                                    <div key={interview.id} className="flex gap-6 items-start relative">
                                        <div className="relative z-10">
                                            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                                                <Calendar className="w-4 h-4 text-white"/>
                                            </div>
                                            <p className="text-sm text-gray-600 mt-2 text-center">
                                                {getMonthName(interview.date.getMonth())} {interview.date.getDate()}, {interview.date.getFullYear()}
                                            </p>
                                        </div>
                                        <div
                                            className="bg-white/50 backdrop-blur-sm border border-white/30 cursor-pointer hover:bg-white/70 transition-all duration-300 rounded-2xl p-6 -mt-1 w-full"
                                            onClick={() => setSelectedInterview(interview)}
                                        >
                                            <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                                                <FileText className="w-5 h-5"/>
                                                {interview.title}
                                            </h3>
                                            <p className="text-sm text-gray-600">{interview.company} - {interview.role}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Modal */}
                    {selectedInterview && (
                        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 overflow-y-auto p-4">
                            <div className="bg-white/30 backdrop-blur-2xl border border-white/50 rounded-3xl shadow-lg w-full max-w-2xl max-h-[80vh] overflow-y-auto transition-all duration-300">
                                <div className="p-6 border-b border-white/50 flex justify-between items-center">
                                    <div>
                                        <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
                                            <FileText className="w-6 h-6"/>
                                            {selectedInterview.title}
                                        </h2>
                                        <p className="text-sm text-gray-600 mt-1">
                                            {selectedInterview.company} - {selectedInterview.role}
                                        </p>
                                        <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                                            <Calendar className="w-3 h-3"/>
                                            {format(selectedInterview.date, 'PPP')}
                                            <Clock className="w-3 h-3 ml-2"/>
                                            {format(selectedInterview.date, 'h:mm a')}
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => setSelectedInterview(null)}
                                        className="text-gray-600 hover:text-gray-800 p-2 rounded-full transition-colors"
                                        title="Close"
                                    >
                                        <XCircle className="w-6 h-6"/>
                                    </button>
                                </div>
                                <div className="p-6 space-y-4 text-gray-700">
                                    <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                                        <BarChart className="w-5 h-5 text-blue-600"/> AI Analysis
                                    </h3>
                                    <p><span className="font-medium text-gray-800">Overall:</span> {selectedInterview.analysis.overall}</p>
                                    <p><span className="font-medium text-gray-800">Communication:</span> {selectedInterview.analysis.communication}</p>
                                    <p><span className="font-medium text-gray-800">Technical:</span> {selectedInterview.analysis.technical}</p>
                                    <p><span className="font-medium text-gray-800">Behavioral:</span> {selectedInterview.analysis.behavioral}</p>
                                    <h4 className="text-md font-semibold text-gray-800 mt-4">Suggestions:</h4>
                                    <ul className="list-disc list-inside space-y-1">
                                        {selectedInterview.analysis.suggestions.map((s,i)=> <li key={i}>{s}</li>)}
                                    </ul>
                                    <div className="flex flex-wrap gap-2 mt-4">
                                        {selectedInterview.tags.map(tag=>(
                                            <span key={tag} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/50 border border-white/30">{tag}</span>
                                        ))}
                                    </div>
                                    <div className="mt-6 flex justify-end">
                                        <button
                                            onClick={()=>setSelectedInterview(null)}
                                            className="bg-white/50 hover:bg-white/70 border border-white/30 text-gray-800 py-2 px-4 rounded-lg transition-all duration-300"
                                        >
                                            Close
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                </div>
            </main>
        </div>
    );
};

export default InterviewAnalysisPage;
