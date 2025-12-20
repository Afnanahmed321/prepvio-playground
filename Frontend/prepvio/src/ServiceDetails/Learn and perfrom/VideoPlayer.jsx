import React, { useState, useEffect, useRef, useCallback } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import YouTube from "react-youtube";

/* -------------------- Helpers -------------------- */

// Extract a playlist id or video id from various YouTube links or direct ids.
// typeHint: "playlist" | "video" - gives priority for the expected id type
const extractYouTubeId = (linkOrId, typeHint = "video") => {
  if (!linkOrId) return "";

  // If it's already a short id (no slashes, not long)
  if (!linkOrId.includes("youtube") && !linkOrId.includes("youtu.be") && !linkOrId.includes("/")) {
    return linkOrId;
  }

  try {
    // Playlist query param ?list=PL...
    const listMatch = linkOrId.match(/[?&]list=([a-zA-Z0-9_-]+)/);
    if (listMatch && typeHint === "playlist") return listMatch[1];

    // Video watch?v=...
    const watchMatch = linkOrId.match(/[?&]v=([a-zA-Z0-9_-]+)/);
    if (watchMatch && typeHint === "video") return watchMatch[1];

    // youtu.be short link
    const shortMatch = linkOrId.match(/youtu\.be\/([a-zA-Z0-9_-]+)/);
    if (shortMatch && typeHint === "video") return shortMatch[1];

    // embed url .../embed/VIDEOID
    const embedMatch = linkOrId.match(/\/embed\/([a-zA-Z0-9_-]+)/);
    if (embedMatch && typeHint === "video") return embedMatch[1];

    // Fallback: try to find any list or v in string
    if (listMatch) return listMatch[1];
    if (watchMatch) return watchMatch[1];
    if (shortMatch) return shortMatch[1];
    if (embedMatch) return embedMatch[1];

    // If nothing matched, return original string (maybe it's already an id)
    return linkOrId;
  } catch (err) {
    console.debug("extractYouTubeId error:", err, linkOrId);
    return linkOrId;
  }
};

/* -------------------- UI Components -------------------- */

const ChannelCard = ({ name, imageUrl }) => (
  <div className="bg-indigo-400 rounded-xl text-white p-4 mb-4 flex items-center space-x-4">
    <img src={imageUrl || "/fallback.jpg"} alt={name} className="w-16 h-16 rounded-sm object-cover" />
    <div>
      <div className="text-lg font-semibold">{name}</div>
      <div className="mt-2 underline cursor-pointer">My Notes</div>
    </div>
  </div>
);

const PlayListItem = ({ video, index, duration, onVideoSelect, isPlaying }) => {
  const title = video?.snippet?.title || "No Title";
  const thumbnail = video?.snippet?.thumbnails?.medium?.url;
  return (
    <div
      onClick={() => onVideoSelect(video)}
      className={`cursor-pointer rounded-xl text-black p-2 flex items-center space-x-4 transition
      ${isPlaying ? "bg-gray-300 text-black" : "bg-gray-100 hover:bg-gray-200"}`}
    >
      <div className="w-[100px] h-[70px] flex-shrink-0 overflow-hidden rounded bg-black">
        {thumbnail && <img src={thumbnail} alt={title} className="w-full h-full object-contain" />}
      </div>
      <div className="flex flex-col justify-between h-[70px] w-full">
        <div className="text-sm font-semibold leading-tight line-clamp-2">
          {index + 1}. {title}
        </div>
        <div className="text-xs text-black mt-1 flex items-center space-x-2">
          <span>Duration: {duration || "N/A"}</span>
          {isPlaying && <span className="text-blue-900 font-semibold whitespace-nowrap">Now Playing</span>}
        </div>
      </div>
    </div>
  );
};

// Player: robust extraction of videoId from various response shapes
const PlayListPlayer = ({ video, onPlayerReady, onPlay, onPause }) => {
  const videoId =
    video?.snippet?.resourceId?.videoId ||
    video?.id ||
    video?.contentDetails?.videoId ||
    // sometimes id may be object for playlistItem; try snippet.resourceId.videoId above
    null;

  const title = video?.snippet?.title || "";

  useEffect(() => {
    const disableContextMenu = (e) => e.preventDefault();
    const disableSelect = (e) => e.preventDefault();
    document.addEventListener("contextmenu", disableContextMenu);
    document.addEventListener("selectstart", disableSelect);
    return () => {
      document.removeEventListener("contextmenu", disableContextMenu);
      document.removeEventListener("selectstart", disableSelect);
    };
  }, []);

  useEffect(() => {
    console.debug("[PlayListPlayer] video changed:", {
      video,
      videoId,
      title,
    });
  }, [video, videoId, title]);

  if (!videoId) {
    return (
      <div className="w-full lg:w-2/3 bg-white p-2 rounded-xl shadow-md text-center">
        <div className="h-64 flex items-center justify-center text-gray-500">Select a video to play.</div>
      </div>
    );
  }

  const opts = {
    height: "475",
    width: "845",
    playerVars: { autoplay: 1, controls: 1 },
  };

  const handleReady = (event) => {
    // pass the actual YT player instance
    onPlayerReady(event.target);
  };

  const handleStateChange = (event) => {
    if (event.data === 1) onPlay(event.target);
    else if (event.data === 2) onPause(event.target);
  };

  return (
    <div className="w-full lg:w-2/3 bg-white p-4 rounded-xl shadow-md">
      <div className="aspect-video mb-4 overflow-hidden rounded-lg">
        <YouTube videoId={videoId} opts={opts} onReady={handleReady} onStateChange={handleStateChange} />
      </div>
      <div className="flex items-start justify-between gap-2 mb-2">
        <h2 className="text-lg font-semibold line-clamp-2 w-full pr-2">{title}</h2>
        <button className="border border-black bg-white hover:bg-gray-300 text-black text-md px-3 py-1 rounded-md whitespace-nowrap">
          Watch Later
        </button>
      </div>
    </div>
  );
};

const PlayListSidebar = ({ videos, durations, onVideoSelect, selectedVideoId, channelData }) => {
  return (
    <div className="w-full lg:w-1/3 bg-white p-2 rounded-xl shadow-md">
      <ChannelCard name={channelData?.name} imageUrl={channelData?.imageUrl} />
      <div className="text-sm font-semibold mb-1">Lesson Playlist</div>
      <div className="max-h-[400px] overflow-y-auto pr-1 space-y-4">
        {videos.map((video, index) => {
          // use same robust extraction here
          const videoId =
            video?.snippet?.resourceId?.videoId || video?.id || video?.contentDetails?.videoId || `item-${index}`;
          const key = videoId || video?.id || index;
          return (
            <PlayListItem
              key={key}
              index={index}
              video={video}
              duration={durations[videoId]}
              onVideoSelect={onVideoSelect}
              isPlaying={selectedVideoId === videoId}
            />
          );
        })}
      </div>
    </div>
  );
};

const QuizModal = ({ quiz, onAnswer, onClose }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const handleButtonClick = (option) => {
    setSelectedAnswer(option);
    onAnswer(option);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 bg-gray-900 bg-opacity-80 backdrop-blur-sm z-[100] animate-fadeIn">
      <div className="relative bg-gray-800 rounded-3xl p-8 w-full max-w-lg mx-4 shadow-2xl transform transition-transform duration-300 scale-100">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-extrabold text-white">Quiz Question</h2>
          {selectedAnswer && (
            <button onClick={onClose} className="text-gray-400 hover:text-white text-xl font-bold">
              ✖
            </button>
          )}
        </div>
        <span className="text-gray-500 text-sm font-semibold block mb-4">{quiz.questionNumber || ""}</span>
        <p className="mb-8 text-gray-300 text-xl font-medium leading-relaxed">{quiz.question}</p>
        <div className="flex flex-col gap-4">
          {quiz.options.map((option, i) => {
            let buttonClasses = "w-full py-4 rounded-xl font-bold transition-all duration-200 ease-in-out transform";
            let hoverClasses = "hover:-translate-y-1 hover:shadow-lg";
            if (selectedAnswer) {
              if (option === quiz.correctAnswer) {
                buttonClasses += " bg-green-600 text-white shadow-green-500/30";
                hoverClasses = "";
              } else if (option === selectedAnswer && option !== quiz.correctAnswer) {
                buttonClasses += " bg-red-600 text-white shadow-red-500/30";
                hoverClasses = "";
              } else {
                buttonClasses += " bg-gray-700 text-gray-400 cursor-not-allowed";
                hoverClasses = "";
              }
            } else {
              buttonClasses += " bg-gray-700 text-gray-200 " + hoverClasses;
            }
            return (
              <button key={i} className={buttonClasses} onClick={() => handleButtonClick(option)} disabled={!!selectedAnswer}>
                {option}
              </button>
            );
          })}
        </div>
        {selectedAnswer && (
          <div className="mt-6 text-center text-lg font-bold">
            {selectedAnswer === quiz.correctAnswer ? (
              <span className="text-green-400">Correct! You've got it.</span>
            ) : (
              <span className="text-red-400">
                Incorrect! The correct answer was:
                <span className="block mt-1 font-extrabold text-white">"{quiz.correctAnswer}"</span>
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

/* -------------------- Main Component -------------------- */

export default function VideoPlayer() {
  const { channelId, courseId } = useParams();
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [videos, setVideos] = useState([]);
  const [durations, setDurations] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [selectedVideoId, setSelectedVideoId] = useState(null);

  // Quiz state
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [isQuizActive, setIsQuizActive] = useState(false);
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [quizQueue, setQuizQueue] = useState([]);
  const [shownQuizzes, setShownQuizzes] = useState(new Set());

  // refs
  const playerRef = useRef(null);
  const masterIntervalRef = useRef(null);

  const BASE_URL = "http://localhost:8000/api";
  const YOUTUBE_API_KEY = "AIzaSyDk8Am9xbfvLkg9agXr2B90IDRlJv6GhJ0";

  const formatDuration = (iso) => {
    if (!iso) return "N/A";
    const match = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
    const h = parseInt(match?.[1] || 0, 10);
    const m = parseInt(match?.[2] || 0, 10);
    const s = parseInt(match?.[3] || 0, 10);
    const hh = h > 0 ? `${h}:` : "";
    const mm = h > 0 ? (m < 10 ? `0${m}` : `${m}`) : `${m}`;
    const ss = s < 10 ? `0${s}` : `${s}`;
    return `${hh}${mm}:${ss}`;
  };

  const clearMasterInterval = () => {
    if (masterIntervalRef.current) {
      clearInterval(masterIntervalRef.current);
      masterIntervalRef.current = null;
    }
  };

  // 1. Fetch playlists (server-side list)
  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${BASE_URL}/playlists/${channelId}/${courseId}`);
        const data = response.data.data;
        if (Array.isArray(data) && data.length > 0) {
          setSelectedPlaylist(data[0]);
        } else {
          setSelectedPlaylist(null);
        }
      } catch (error) {
        console.error("Failed to fetch playlists:", error);
        setSelectedPlaylist(null);
      } finally {
        setLoading(false);
      }
    };

    if (channelId && courseId) fetchPlaylists();
  }, [channelId, courseId]);

  // 2. Fetch videos (either playlistItems or single videos). Normalize link -> id first.
  useEffect(() => {
    const fetchContent = async () => {
      if (!selectedPlaylist) return;
      let videoItems = [];
      try {
        const contentLink = selectedPlaylist.link; // could be id or full url
        const contentType = selectedPlaylist.type; // "playlist" or "video"
        const youtubeApiConfig = { withCredentials: false };

        if (contentType === "playlist") {
          const playlistId = extractYouTubeId(contentLink, "playlist");
          console.debug("[fetchContent] Playlist id:", { contentLink, playlistId });
          const playlistUrl = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&playlistId=${playlistId}&key=${YOUTUBE_API_KEY}&maxResults=50`;
          const playlistRes = await axios.get(playlistUrl, youtubeApiConfig);
          videoItems = playlistRes.data.items || [];
        } else if (contentType === "video") {
          const videoId = extractYouTubeId(contentLink, "video");
          console.debug("[fetchContent] Single video id:", { contentLink, videoId });
          const videoUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&id=${videoId}&key=${YOUTUBE_API_KEY}`;
          const videoRes = await axios.get(videoUrl, youtubeApiConfig);
          const videoItem = videoRes.data.items?.[0];
          if (videoItem) {
            // normalize to similar shape as playlist item for UI convenience
            videoItems = [
              {
                id: videoItem.id,
                snippet: { ...videoItem.snippet, resourceId: { videoId: videoItem.id } },
                contentDetails: videoItem.contentDetails,
              },
            ];
          } else {
            console.warn("[fetchContent] No video found for id:", videoId);
            videoItems = [];
          }
        } else {
          console.warn("[fetchContent] Unknown contentType:", contentType);
        }

        setVideos(videoItems);

        if (videoItems.length > 0) {
          const first = videoItems[0];
          const firstVideoId = first?.snippet?.resourceId?.videoId || first?.id || first?.contentDetails?.videoId;
          setSelectedVideo(first);
          setSelectedVideoId(firstVideoId);
        } else {
          setSelectedVideo(null);
          setSelectedVideoId(null);
        }

        // Fetch durations for visible videos (if any ids exist)
        const videoIds = videoItems
          .map((v) => v?.snippet?.resourceId?.videoId || v?.id || v?.contentDetails?.videoId)
          .filter(Boolean)
          .join(",");
        if (videoIds) {
          const videosUrl = `https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${videoIds}&key=${YOUTUBE_API_KEY}`;
          const videosRes = await axios.get(videosUrl, youtubeApiConfig);
          const videoDetails = videosRes.data.items || [];
          const newDurations = {};
          videoDetails.forEach((vd) => {
            if (vd && vd.id && vd.contentDetails) {
              newDurations[vd.id] = formatDuration(vd.contentDetails.duration);
            }
          });
          setDurations(newDurations);
        } else {
          setDurations({});
        }

        // Fetch quizzes (if any)
        try {
          const quizResponse = await axios.get(`${BASE_URL}/quizzes/by-playlist-document/${selectedPlaylist._id}`);
          if (quizResponse.data.success) {
            const quizData = quizResponse.data.data;
            const videoQuizzes = quizData?.videos || [];
            const allQuestions = videoQuizzes.reduce((acc, videoQuiz) => {
              if (videoQuiz.questions) {
                return acc.concat(
                  videoQuiz.questions.map((q) => ({
                    ...q,
                    videoId: videoQuiz.videoId,
                  }))
                );
              }
              return acc;
            }, []);
            setQuizQuestions(allQuestions);
          } else {
            setQuizQuestions([]);
          }
        } catch (quizErr) {
          console.warn("No quizzes or quiz fetch failed:", quizErr);
          setQuizQuestions([]);
        }
      } catch (err) {
        console.error("Error fetching content:", err);
        setVideos([]);
        setDurations({});
      }
    };

    fetchContent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPlaylist]);

  // 3. Quiz time logic
  const handleTimeUpdate = useCallback(
    (currentTime) => {
      if (!quizQuestions || quizQuestions.length === 0 || !selectedVideoId || isQuizActive) return;

      const dueQuizzes = quizQuestions.filter((q) => {
        if (q.videoId !== selectedVideoId) return false;
        const quizTime = Math.floor(q.timestamp || 0);
        const timeDiff = Math.abs(quizTime - currentTime);
        return timeDiff <= 1 && !shownQuizzes.has(q._id);
      });

      if (dueQuizzes.length > 0) {
        setQuizQueue((prev) => [...prev, ...dueQuizzes]);
        setShownQuizzes((prev) => {
          const newSet = new Set(prev);
          dueQuizzes.forEach((q) => newSet.add(q._id));
          return newSet;
        });
      }
    },
    [quizQuestions, selectedVideoId, isQuizActive, shownQuizzes]
  );

  // 4. On selecting a video from sidebar
  const handleVideoSelect = (video) => {
    clearMasterInterval();
    setSelectedVideo(video);
    const newVid = video?.snippet?.resourceId?.videoId || video?.id || video?.contentDetails?.videoId || null;
    setSelectedVideoId(newVid);
    setShownQuizzes(new Set());
    setQuizQueue([]);
    setIsQuizActive(false);
    setCurrentQuiz(null);
    // debug
    console.debug("[handleVideoSelect] new selected video id:", newVid, video);
  };

  // 5. Player ready
  const handlePlayerReady = (playerInstance) => {
    playerRef.current = playerInstance;
    if (selectedVideoId) {
      const savedTime = localStorage.getItem(`video_progress_${selectedVideoId}`);
      const startTime = savedTime ? parseInt(savedTime, 10) : 0;
      if (startTime > 0) {
        try {
          playerInstance.seekTo(startTime, true);
          console.debug("[handlePlayerReady] sought to saved time", startTime);
        } catch (err) {
          console.warn("seekTo failed:", err);
        }
      }
    }
  };

  // 6. Play handler - start master interval
  const handlePlay = (playerInstance) => {
    clearMasterInterval();
    masterIntervalRef.current = setInterval(async () => {
      if (!playerInstance || !selectedVideoId) return;
      try {
        const currentTime = await playerInstance.getCurrentTime();
        const timeToProcess = Math.floor(currentTime || 0);
        localStorage.setItem(`video_progress_${selectedVideoId}`, timeToProcess);
        handleTimeUpdate(timeToProcess);
      } catch (err) {
        console.error("Error in master interval:", err);
        clearMasterInterval();
      }
    }, 1000);
  };

  // 7. Pause handler
  const handlePause = async (playerInstance) => {
    clearMasterInterval();
    if (playerInstance && selectedVideoId) {
      try {
        const finalTime = await playerInstance.getCurrentTime();
        localStorage.setItem(`video_progress_${selectedVideoId}`, Math.floor(finalTime || 0));
      } catch (err) {
        console.error("Error saving progress on pause:", err);
      }
    }
  };

  // 8. When quizQueue receives items, pause and show modal
  useEffect(() => {
    if (!isQuizActive && quizQueue.length > 0) {
      if (playerRef.current) {
        try {
          playerRef.current.pauseVideo();
        } catch (err) {
          console.warn("pauseVideo failed:", err);
        }
        clearMasterInterval();
      }
      setCurrentQuiz(quizQueue[0]);
      setIsQuizActive(true);
    }
  }, [quizQueue, isQuizActive]);

  const handleQuizSubmitClose = (answer) => {
    // show feedback, then resume
    setTimeout(() => {
      setQuizQueue((prev) => prev.slice(1));
      setIsQuizActive(false);
      setCurrentQuiz(null);
      if (playerRef.current) {
        try {
          playerRef.current.playVideo();
        } catch (err) {
          console.warn("playVideo failed:", err);
        }
        handlePlay(playerRef.current);
      }
    }, 2000);
  };

  const handleQuizClose = () => {
    setQuizQueue((prev) => prev.slice(1));
    setIsQuizActive(false);
    setCurrentQuiz(null);
    if (playerRef.current) {
      try {
        playerRef.current.playVideo();
      } catch (err) {
        console.warn("playVideo failed:", err);
      }
      handlePlay(playerRef.current);
    }
  };

  // Cleanup
  useEffect(() => {
    return () => {
      clearMasterInterval();
    };
  }, []);

  // dev debug panel (only in dev builds)
  useEffect(() => {
    console.debug("[VideoPlayer state]", {
      selectedPlaylist,
      selectedVideoId,
      videosCount: videos.length,
      quizCount: quizQuestions.length,
    });
  }, [selectedPlaylist, selectedVideoId, videos, quizQuestions]);

  if (loading)
    return (
      <div className="p-6 bg-gray-50 min-h-screen flex items-center justify-center">
        <p className="text-xl font-semibold text-gray-700">Loading playlists...</p>
      </div>
    );

  if (!selectedPlaylist)
    return (
      <div className="p-6 bg-gray-50 min-h-screen flex items-center justify-center">
        <p className="text-xl font-semibold text-gray-700">No playlists found for this course.</p>
      </div>
    );

  return (
    <div className="p-6 bg-gray-50 min-h-screen font-sans relative">
      {process.env.NODE_ENV === "development" && (
        <div className="fixed top-4 right-4 bg-black text-white p-2 rounded text-xs z-50">
          <div>Quizzes loaded: {quizQuestions.length}</div>
          <div>Quiz active: {isQuizActive ? "Yes" : "No"}</div>
          <div>Queue: {quizQueue.length}</div>
          <div>Player state: {playerRef.current ? "Ready" : "Not Ready"}</div>
          <div>Selected video id: {selectedVideoId}</div>
          <div>Videos count: {videos.length}</div>
        </div>
      )}

      {isQuizActive && currentQuiz && <QuizModal quiz={currentQuiz} onAnswer={handleQuizSubmitClose} onClose={handleQuizClose} />}

      <div className="flex flex-col lg:flex-row space-y-10 lg:space-y-0 lg:space-x-10">
        <PlayListPlayer video={selectedVideo} onPlayerReady={handlePlayerReady} onPlay={handlePlay} onPause={handlePause} />
        <PlayListSidebar videos={videos} durations={durations} onVideoSelect={handleVideoSelect} selectedVideoId={selectedVideoId} channelData={selectedPlaylist} />
      </div>
    </div>
  );
}






// import React, { useState, useEffect, useRef, useCallback } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import YouTube from "react-youtube";

// // Reusable component for displaying channel information
// const ChannelCard = ({ name, imageUrl }) => (
//   <div className="bg-indigo-400 rounded-xl text-white p-4 mb-4 flex items-center space-x-4">
//     <img
//       src={imageUrl || "/fallback.jpg"}
//       alt={name}
//       className="w-16 h-16 rounded-sm object-cover"
//     />
//     <div>
//       <div className="text-lg font-semibold">{name}</div>
//       <div className="mt-2 underline cursor-pointer">My Notes</div>
//     </div>
//   </div>
// );

// // Single playlist item
// const PlayListItem = ({ video, index, duration, onVideoSelect, isPlaying }) => {
//   const title = video?.snippet?.title || "No Title";
//   const thumbnail = video?.snippet?.thumbnails?.medium?.url;

//   return (
//     <div
//       onClick={() => onVideoSelect(video)}
//       className={`cursor-pointer rounded-xl text-black p-2 flex items-center space-x-4 transition
//       ${isPlaying ? "bg-gray-300 text-black" : "bg-gray-100 hover:bg-gray-200"}`}
//     >
//       <div className="w-[100px] h-[70px] flex-shrink-0 overflow-hidden rounded bg-black">
//         {thumbnail && (
//           <img src={thumbnail} alt={title} className="w-full h-full object-contain" />
//         )}
//       </div>
//       <div className="flex flex-col justify-between h-[70px] w-full">
//         <div className="text-sm font-semibold leading-tight line-clamp-2">
//           {index + 1}. {title}
//         </div>
//         <div className="text-xs text-black mt-1 flex items-center space-x-2">
//           <span>Duration: {duration || "N/A"}</span>
//           {isPlaying && (
//             <span className="text-blue-900 font-semibold whitespace-nowrap">
//               Now Playing
//             </span>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// // Video player (using react-youtube)
// const PlayListPlayer = ({ video, onPlayerReady, onPlay, onPause }) => {
//   const videoId = video?.snippet?.resourceId?.videoId;
//   const title = video?.snippet?.title;

//   // Basic security listeners (context menu/selection)
//   useEffect(() => {
//     const disableContextMenu = (e) => e.preventDefault();
//     const disableSelect = (e) => e.preventDefault();
//     // Removed aggressive copy/print screen listeners for development stability

//     document.addEventListener("contextmenu", disableContextMenu);
//     document.addEventListener("selectstart", disableSelect);

//     return () => {
//       document.removeEventListener("contextmenu", disableContextMenu);
//       document.removeEventListener("selectstart", disableSelect);
//     };
//   }, []);

//   if (!videoId) {
//     return (
//       <div className="w-full lg:w-2/3 bg-white p-2 rounded-xl shadow-md text-center">
//         <div className="h-64 flex items-center justify-center text-gray-500">
//           Select a video to play.
//         </div>
//       </div>
//     );
//   }

//   const opts = {
//     height: "475",
//     width: "845",
//     playerVars: {
//       autoplay: 1,
//       controls: 1,
//     },
//   };

//   const handleReady = (event) => {
//     onPlayerReady(event.target);
//   };

//   const handleStateChange = (event) => {
//     // Pass the player instance to the parent play/pause handlers 
//     if (event.data === 1) {
//       onPlay(event.target); 
//     } else if (event.data === 2) {
//       onPause(event.target);
//     }
//   };

//   return (
//     <div className="w-full lg:w-2/3 bg-white p-4 rounded-xl shadow-md">
//       <div className="aspect-video mb-4 overflow-hidden rounded-lg">
//         <YouTube
//           videoId={videoId}
//           opts={opts}
//           onReady={handleReady}
//           onStateChange={handleStateChange}
//         />
//       </div>

//       <div className="flex items-start justify-between gap-2 mb-2">
//         <h2 className="text-lg font-semibold line-clamp-2 w-full pr-2">{title}</h2>
//         <button className="border border-black bg-white hover:bg-gray-300 text-black text-md px-3 py-1 rounded-md whitespace-nowrap">
//           Watch Later
//         </button>
//       </div>
//     </div>
//   );
// };

// // Sidebar with playlist
// const PlayListSidebar = ({ videos, durations, onVideoSelect, selectedVideoId, channelData }) => {
//   return (
//     <div className="w-full lg:w-1/3 bg-white p-2 rounded-xl shadow-md">
//       <ChannelCard name={channelData?.name} imageUrl={channelData?.imageUrl} />
//       <div className="text-sm font-semibold mb-1">Lesson Playlist</div>
//       <div className="max-h-[400px] overflow-y-auto pr-1 space-y-4">
//         {videos.map((video, index) => {
//           const videoId = video?.snippet?.resourceId?.videoId;
//           return (
//             <PlayListItem
//               key={video.id}
//               index={index}
//               video={video}
//               duration={durations[videoId]}
//               onVideoSelect={onVideoSelect}
//               isPlaying={selectedVideoId === videoId}
//             />
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// // Quiz Modal
// const QuizModal = ({ quiz, onAnswer, onClose }) => {
//   const [selectedAnswer, setSelectedAnswer] = useState(null);

//   const handleButtonClick = (option) => {
//     setSelectedAnswer(option);
//     onAnswer(option);
//   };

//   return (
//     <div className="fixed inset-0 flex items-center justify-center p-4 bg-gray-900 bg-opacity-80 backdrop-blur-sm z-[100] animate-fadeIn">
//       <div className="relative bg-gray-800 rounded-3xl p-8 w-full max-w-lg mx-4 shadow-2xl transform transition-transform duration-300 scale-100">
        
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-3xl font-extrabold text-white">Quiz Question</h2>
//           {selectedAnswer && (
//             <button
//               onClick={onClose}
//               className="text-gray-400 hover:text-white text-xl font-bold"
//             >
//               ✖
//             </button>
//           )}
//         </div>

//         <span className="text-gray-500 text-sm font-semibold block mb-4">
//           {quiz.questionNumber || ""}
//         </span>

//         <p className="mb-8 text-gray-300 text-xl font-medium leading-relaxed">
//           {quiz.question}
//         </p>

//         <div className="flex flex-col gap-4">
//           {quiz.options.map((option, i) => {
//             let buttonClasses =
//               "w-full py-4 rounded-xl font-bold transition-all duration-200 ease-in-out transform";
//             let hoverClasses = "hover:-translate-y-1 hover:shadow-lg";

//             if (selectedAnswer) {
//               if (option === quiz.correctAnswer) {
//                 buttonClasses += " bg-green-600 text-white shadow-green-500/30";
//                 hoverClasses = "";
//               } else if (option === selectedAnswer && option !== quiz.correctAnswer) {
//                 buttonClasses += " bg-red-600 text-white shadow-red-500/30";
//                 hoverClasses = "";
//               } else {
//                 buttonClasses += " bg-gray-700 text-gray-400 cursor-not-allowed";
//                 hoverClasses = "";
//               }
//             } else {
//               buttonClasses += " bg-gray-700 text-gray-200 " + hoverClasses;
//             }

//             return (
//               <button
//                 key={i}
//                 className={buttonClasses}
//                 onClick={() => handleButtonClick(option)}
//                 disabled={!!selectedAnswer}
//               >
//                 {option}
//               </button>
//             );
//           })}
//         </div>

//         {selectedAnswer && (
//           <div className="mt-6 text-center text-lg font-bold">
//             {selectedAnswer === quiz.correctAnswer ? (
//               <span className="text-green-400">Correct! You've got it.</span>
//             ) : (
//               <span className="text-red-400">
//                 Incorrect! The correct answer was:
//                 <span className="block mt-1 font-extrabold text-white">
//                   "{quiz.correctAnswer}"
//                 </span>
//               </span>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// // Main VideoPlayer Component
// export default function VideoPlayer() {
//   const { channelId, courseId } = useParams();
//   const [selectedPlaylist, setSelectedPlaylist] = useState(null);
//   const [videos, setVideos] = useState([]);
//   const [durations, setDurations] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [selectedVideo, setSelectedVideo] = useState(null);
//   const [selectedVideoId, setSelectedVideoId] = useState(null);

//   // Quiz state
//   const [quizQuestions, setQuizQuestions] = useState([]);
//   const [isQuizActive, setIsQuizActive] = useState(false);
//   const [currentQuiz, setCurrentQuiz] = useState(null);
//   const [quizQueue, setQuizQueue] = useState([]);
//   const [shownQuizzes, setShownQuizzes] = useState(new Set());
  
//   // Refs for player and interval
//   const playerRef = useRef(null);
//   // Ref for the single combined interval (progress saving + quiz checking)
//   const masterIntervalRef = useRef(null); 

//   const BASE_URL = "http://localhost:8000/api";
//   const YOUTUBE_API_KEY = "AIzaSyDk8Am9xbfvLkg9agXr2B90IDRlJv6GhJ0";

//   const formatDuration = (iso) => {
//     const match = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
//     const h = parseInt(match?.[1] || 0);
//     const m = parseInt(match?.[2] || 0);
//     const s = parseInt(match?.[3] || 0);
//     const hh = h > 0 ? `${h}:` : "";
//     const mm = m < 10 && h > 0 ? `0${m}` : `${m}`;
//     const ss = s < 10 ? `0${s}` : `${s}`;
//     return `${hh}${mm}:${ss}`;
//   };

//   // Helper to clear all intervals
//   const clearMasterInterval = () => {
//     if (masterIntervalRef.current) {
//       clearInterval(masterIntervalRef.current);
//       masterIntervalRef.current = null;
//     }
//   };

//   // 1. Fetch playlists
//   useEffect(() => {
//     const fetchPlaylists = async () => {
//       try {
//         setLoading(true);
//         const response = await axios.get(`${BASE_URL}/playlists/${channelId}/${courseId}`);
//         const data = response.data.data;
//         if (data.length > 0) {
//           setSelectedPlaylist(data[0]);
//         }
//       } catch (error) {
//         console.error("Failed to fetch playlists:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     if (channelId && courseId) {
//       fetchPlaylists();
//     }
//   }, [channelId, courseId, BASE_URL]);

//   // 2. Fetch videos + durations + quizzes
//   useEffect(() => {
//     const fetchContent = async () => {
//       if (!selectedPlaylist) return;
//       const contentLink = selectedPlaylist.link;
//       const contentType = selectedPlaylist.type;

//       let videoItems = [];
//       try {
//         const youtubeApiConfig = { withCredentials: false };
        
//         if (contentType === "playlist") {
//           const playlistUrl = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&playlistId=${contentLink}&key=${YOUTUBE_API_KEY}&maxResults=50`;
//           const playlistRes = await axios.get(playlistUrl, youtubeApiConfig);
//           videoItems = playlistRes.data.items || [];
//         } else if (contentType === "video") {
//           const videoUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&id=${contentLink}&key=${YOUTUBE_API_KEY}`;
//           const videoRes = await axios.get(videoUrl, youtubeApiConfig);
//           const videoItem = videoRes.data.items?.[0];
//           if (videoItem) {
//             videoItems = [
//               {
//                 id: videoItem.id,
//                 snippet: { ...videoItem.snippet, resourceId: { videoId: videoItem.id } },
//                 contentDetails: videoItem.contentDetails,
//               },
//             ];
//           }
//         }

//         setVideos(videoItems);
//         if (videoItems.length > 0) {
//           setSelectedVideo(videoItems[0]);
//           setSelectedVideoId(videoItems[0].snippet.resourceId.videoId);
//         }

//         const videoIds = videoItems.map((v) => v.snippet.resourceId.videoId).join(",");
//         if (videoIds) {
//           const videosUrl = `https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${videoIds}&key=${YOUTUBE_API_KEY}`;
//           const videosRes = await axios.get(videosUrl, youtubeApiConfig);
//           const videoDetails = videosRes.data.items || [];
//           const newDurations = {};
//           videoDetails.forEach((video) => {
//             newDurations[video.id] = formatDuration(video.contentDetails.duration);
//           });
//           setDurations(newDurations);
//         }

//         try {
//           const quizResponse = await axios.get(`${BASE_URL}/quizzes/by-playlist-document/${selectedPlaylist._id}`);
          
//           if (quizResponse.data.success) {
//             const quizData = quizResponse.data.data;
//             const videoQuizzes = quizData?.videos || [];
            
//             const allQuestions = videoQuizzes.reduce((acc, videoQuiz) => {
//               if (videoQuiz.questions) {
//                 return acc.concat(videoQuiz.questions.map(q => ({
//                   ...q,
//                   videoId: videoQuiz.videoId
//                 })));
//               }
//               return acc;
//             }, []);

//             setQuizQuestions(allQuestions);
//           } else {
//             setQuizQuestions([]);
//           }
//         } catch (quizError) {
//           console.error("Error fetching quizzes (Backend 404 or no quizzes exist):", quizError);
//           setQuizQuestions([]);
//         }

//       } catch (error) {
//         console.error("Error fetching content:", error);
//       }
//     };
//     fetchContent();
//   }, [selectedPlaylist, YOUTUBE_API_KEY, BASE_URL]);

//   // 3. Quiz Time Check Logic - Wrapped in useCallback for stable interval access
//   const handleTimeUpdate = useCallback((currentTime) => {
//     // Return early if any essential data is missing or a quiz is already active
//     if (!quizQuestions || quizQuestions.length === 0 || !selectedVideoId || isQuizActive) return;

//     const dueQuizzes = quizQuestions.filter((q) => {
//       if (q.videoId !== selectedVideoId) {
//         return false;
//       }
      
//       const quizTime = Math.floor(q.timestamp); 
//       // Check if current time is within 1 second of the quiz timestamp AND it hasn't been shown
//       const timeDiff = Math.abs(quizTime - currentTime); 
//       const isDue = timeDiff <= 1 && !shownQuizzes.has(q._id);
      
//       return isDue;
//     });

//     if (dueQuizzes.length > 0) {
//       setQuizQueue((prev) => [...prev, ...dueQuizzes]);
//       setShownQuizzes((prev) => {
//         const newSet = new Set(prev);
//         dueQuizzes.forEach((q) => newSet.add(q._id));
//         return newSet;
//       });
//       // console.log(`[DEBUG] Found ${dueQuizzes.length} quiz(zes) at ${currentTime}s. Queue length: ${quizQueue.length + dueQuizzes.length}`);
//     }
//   }, [quizQuestions, selectedVideoId, isQuizActive, shownQuizzes, setQuizQueue, setShownQuizzes]);

//   // 4. Video selection handler
//   const handleVideoSelect = (video) => {
//     clearMasterInterval();
    
//     setSelectedVideo(video);
//     const newVideoId = video.snippet.resourceId.videoId;
//     setSelectedVideoId(newVideoId);
    
//     // Reset states for new video
//     setShownQuizzes(new Set());
//     setQuizQueue([]);
//     setIsQuizActive(false);
//     setCurrentQuiz(null);
//   };

//   // 5. Player ready handler
//   const handlePlayerReady = (playerInstance) => {
//     playerRef.current = playerInstance;
    
//     // Load saved progress
//     if (selectedVideoId) {
//       const savedTime = localStorage.getItem(`video_progress_${selectedVideoId}`);
//       const startTime = savedTime ? parseInt(savedTime, 10) : 0;
//       if (startTime > 0) {
//         playerInstance.seekTo(startTime, true);
//       }
//     }
//   };

//   // 6. Play handler - Starts the single, 1-second master interval
//   const handlePlay = (playerInstance) => {
//     // Clear any previous interval before starting a new one
//     clearMasterInterval();
    
//     // Start interval for time check and progress saving (every 1s)
//     masterIntervalRef.current = setInterval(async () => {
//       if (playerInstance && selectedVideoId) {
//         try {
//           const currentTime = await playerInstance.getCurrentTime();
//           const timeToProcess = Math.floor(currentTime);
          
//           // 1. Progress Save (Save every 1s for best accuracy)
//           localStorage.setItem(`video_progress_${selectedVideoId}`, timeToProcess);

//           // 2. Quiz Check
//           // ⚠️ This is the crucial line that triggers quiz queueing ⚠️
//           handleTimeUpdate(timeToProcess); 
          
//           // console.log(`[DEBUG] Time: ${timeToProcess}s | Queue: ${quizQueue.length}`);

//         } catch (error) {
//           console.error("Error in master interval:", error);
//           clearMasterInterval(); // Stop interval on error
//         }
//       }
//     }, 1000); // Check every 1 second for reliable quiz triggering
//   };

//   // 7. Pause handler - Stops the master interval and saves final time
//   const handlePause = async (playerInstance) => {
//     // Clear intervals
//     clearMasterInterval();
    
//     // Save final time
//     if (playerInstance && selectedVideoId) {
//       try {
//         const finalTime = await playerInstance.getCurrentTime();
//         const timeToSave = Math.floor(finalTime);
//         localStorage.setItem(`video_progress_${selectedVideoId}`, timeToSave);
//       } catch (error) {
//         console.error("Error saving progress on pause:", error);
//       }
//     }
//   };
  
//   // 8. Quiz Pop-up Effect (Watches the quizQueue and pauses video)
//   useEffect(() => {
//     if (!isQuizActive && quizQueue.length > 0) {
//       // 1. Pause video and clear intervals
//       if (playerRef.current) {
//         playerRef.current.pauseVideo();
//         clearMasterInterval();
//       }
      
//       // 2. Activate quiz modal
//       const nextQuiz = quizQueue[0];
//       setCurrentQuiz(nextQuiz);
//       setIsQuizActive(true);
//     }
//   }, [quizQueue, isQuizActive]); // Reruns when quizQueue changes or isQuizActive changes

//   // 9. Resume video after quiz
//   const handleQuizSubmitClose = (answer) => {
//     // Wait 2 seconds (for feedback) and then close/resume
//     setTimeout(() => {
//       setQuizQueue((prev) => prev.slice(1));
//       setIsQuizActive(false);
//       setCurrentQuiz(null);
      
//       if (playerRef.current) {
//         playerRef.current.playVideo();
//         handlePlay(playerRef.current); // Restart master interval
//       }
//     }, 2000);
//   };

//   const handleQuizClose = () => {
//     setQuizQueue((prev) => prev.slice(1));
//     setIsQuizActive(false);
//     setCurrentQuiz(null);
    
//     if (playerRef.current) {
//       playerRef.current.playVideo();
//       handlePlay(playerRef.current); // Restart master interval
//     }
//   };

//   // 10. Final cleanup effect
//   useEffect(() => {
//     return () => {
//       clearMasterInterval(); // Clear interval on component unmount
//     };
//   }, []);

//   if (loading)
//     return (
//       <div className="p-6 bg-gray-50 min-h-screen flex items-center justify-center">
//         <p className="text-xl font-semibold text-gray-700">Loading playlists...</p>
//       </div>
//     );

//   if (!selectedPlaylist)
//     return (
//       <div className="p-6 bg-gray-50 min-h-screen flex items-center justify-center">
//         <p className="text-xl font-semibold text-gray-700">
//           No playlists found for this course.
//         </p>
//       </div>
//     );

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen font-sans relative">
//       {/* Debug Panel - You should now see the Queue value change */}
//       {process.env.NODE_ENV === 'development' && (
//         <div className="fixed top-4 right-4 bg-black text-white p-2 rounded text-xs z-50">
//           <div>Quizzes loaded: {quizQuestions.length}</div>
//           <div>Quiz active: {isQuizActive ? 'Yes' : 'No'}</div>
//           <div>Queue: {quizQueue.length}</div>
//           <div>Player state: {playerRef.current ? 'Ready' : 'Not Ready'}</div>
//         </div>
//       )}
      
//       {isQuizActive && currentQuiz && (
//         <QuizModal 
//           quiz={currentQuiz} 
//           onAnswer={handleQuizSubmitClose} 
//           onClose={handleQuizClose}
//         />
//       )}
      
//       <div className="flex flex-col lg:flex-row space-y-10 lg:space-y-0 lg:space-x-10">
//         <PlayListPlayer 
//           video={selectedVideo} 
//           onPlayerReady={handlePlayerReady} 
//           onPlay={handlePlay} 
//           onPause={handlePause} 
//         />
//         <PlayListSidebar
//           videos={videos}
//           durations={durations}
//           onVideoSelect={handleVideoSelect}
//           selectedVideoId={selectedVideoId}
//           channelData={selectedPlaylist.channelId}
//         />
//       </div>
//     </div>
//   );
// }
