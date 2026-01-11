// "use client";

// first 11111111111111111111111
// =======================================

// import { useEffect, useRef, useState } from "react";

// type MediaKind = "video" | "audio";

// export default function MediaRecorderPage() {
//   const videoRef = useRef<HTMLVideoElement | null>(null);
//   const recorderRef = useRef<MediaRecorder | null>(null);
//   const streamRef = useRef<MediaStream | null>(null);
//   const chunksRef = useRef<Blob[]>([]);

//   const [mediaType, setMediaType] = useState<MediaKind>("video");
//   const [recordings, setRecordings] = useState<
//     { url: string; type: MediaKind }[]
//   >([]);
//   const [isRecording, setIsRecording] = useState(false);

//   /* ------------------ Request Camera / Mic ------------------ */
//   const requestStream = async () => {
//     try {
//       if (!navigator.mediaDevices?.getUserMedia) {
//         alert("getUserMedia not supported");
//         return;
//       }

//       const constraints =
//         mediaType === "video"
//           ? { video: true, audio: true }
//           : { audio: true };

//       const stream = await navigator.mediaDevices.getUserMedia(constraints);
//       streamRef.current = stream;

//       if (mediaType === "video" && videoRef.current) {
//         videoRef.current.srcObject = stream;
//       }

//       const mimeType =
//         mediaType === "video"
//           ? "video/webm;codecs=vp8,opus"
//           : "audio/webm;codecs=opus";

//       const recorder = new MediaRecorder(stream, { mimeType });
//       recorderRef.current = recorder;
//       chunksRef.current = [];

//       recorder.ondataavailable = (e) => {
//         if (e.data.size > 0) {
//           chunksRef.current.push(e.data);
//         }
//       };

//       recorder.onstop = () => {
//         const blob = new Blob(chunksRef.current, { type: mimeType });
//         const url = URL.createObjectURL(blob);

//         setRecordings((prev) => [...prev, { url, type: mediaType }]);
//         chunksRef.current = [];
//       };
//     } catch (err) {
//       console.error("Media error:", err);
//       alert("Permission denied or device not available");
//     }
//   };

//   /* ------------------ Controls ------------------ */
//   const startRecording = () => {
//     if (!recorderRef.current) return;
//     recorderRef.current.start();
//     setIsRecording(true);
//   };

//   const stopRecording = () => {
//     if (!recorderRef.current) return;
//     recorderRef.current.stop();
//     setIsRecording(false);
//   };

//   /* ------------------ Cleanup ------------------ */
//   useEffect(() => {
//     return () => {
//       streamRef.current?.getTracks().forEach((t) => t.stop());
//     };
//   }, []);

//   /* ------------------ UI ------------------ */
//   return (
//     <div style={{ maxWidth: 720, margin: "0 auto", padding: 20 }}>
//       <h2 className="text-2xl font-bold mb-3">MediaRecorder – Next.js</h2>

//       {/* Media Type */}
//       <div style={{ marginBottom: 10 }}>
//         <label className="border border-white rounded px-2 py-1">
//           <input
//             type="radio"
//             checked={mediaType === "video"}
//             onChange={() => setMediaType("video")}
//           />{" "}
//           Video
//         </label>

//         <label  className="border border-white rounded px-2 py-1 ml-3">
//           <input
//             type="radio"
//             checked={mediaType === "audio"}
//             onChange={() => setMediaType("audio")}
//           />{" "}
//           Audio
//         </label>
//       </div>

//       {/* Buttons */}
//       <div style={{ marginBottom: 15 }} className="flex justify-start items-center gap-3">
//         <button onClick={requestStream} className="mb-1 text-green-500">Request Stream </button> 
//         <button onClick={startRecording} disabled={isRecording} className="border border-white rounded px-2">
//           Start
//         </button>
//         <button onClick={stopRecording} disabled={!isRecording} className="border border-white rounded px-2">
//           Stop
//         </button>
//       </div>

//       {/* Live Preview */}
//       {mediaType === "video" && (
//         <video
//           ref={videoRef}
//           autoPlay
//           muted
//           playsInline
//           style={{ width: "100%", borderRadius: 6 }}
//         />
//       )}

//       {/* Recordings */}
//       <ul>
//         {recordings.map((rec, i) => (
//           <li key={i} style={{ marginTop: 10 }}>
//             {rec.type === "video" ? (
//               <video src={rec.url} controls width={320} />
//             ) : (
//               <audio src={rec.url} controls />
//             )}
//             <br />
//             <a href={rec.url} download>
//               Download
//             </a>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }


// secont 2222222222222222222222222222222
// ======================================


"use client";
import { useEffect, useRef, useState } from "react";
import { FaPause, FaPlay } from "react-icons/fa";
import { FiCheck } from "react-icons/fi";
import { GoDownload } from "react-icons/go";

type MediaKind = "video" | "audio";

export default function MediaRecorderPage() {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const recorderRef = useRef<MediaRecorder | null>(null);
    const streamRef = useRef<MediaStream | null>(null);
    const chunksRef = useRef<Blob[]>([]);
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const [isStreaming, setIsStreaming] = useState(false);

    const [mediaType, setMediaType] = useState<MediaKind>("video");
    const [recordings, setRecordings] = useState<
        { url: string; type: MediaKind }[]
    >([]);
    const [isRecording, setIsRecording] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [seconds, setSeconds] = useState(0);

    console.log(recordings, "=================recordings");

    /* ------------------ TIMER ------------------ */
    const startTimer = () => {
        timerRef.current = setInterval(() => {
            setSeconds((s) => s + 1);
        }, 1000);
    };

    const stopTimer = () => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
        }
    };

    const resetTimer = () => {
        stopTimer();
        setSeconds(0);
    };

    const formatTime = (s: number) => {
        const m = Math.floor(s / 60);
        const sec = s % 60;
        return `${m.toString().padStart(2, "0")}:${sec
            .toString()
            .padStart(2, "0")}`;
    };

    /* ------------------ REQUEST STREAM ------------------ */
    const requestStream = async () => {
        try {
            const constraints =
                mediaType === "video"
                    ? { video: true, audio: true }
                    : { audio: true };

            const stream = await navigator.mediaDevices.getUserMedia(constraints);
            streamRef.current = stream;
            setIsStreaming(true);

            if (mediaType === "video" && videoRef.current) {
                videoRef.current.srcObject = stream;
            }

            const mimeType =
                mediaType === "video"
                    ? "video/webm;codecs=vp8,opus"
                    : "audio/webm;codecs=opus";

            const recorder = new MediaRecorder(stream, { mimeType });
            recorderRef.current = recorder;
            chunksRef.current = [];

            recorder.ondataavailable = (e) => {
                if (e.data.size > 0) chunksRef.current.push(e.data);
            };

            recorder.onstop = () => {
                const blob = new Blob(chunksRef.current, { type: mimeType });
                const url = URL.createObjectURL(blob);

                setRecordings((prev) => [...prev, { url, type: mediaType }]);
                chunksRef.current = [];
                resetTimer();
            };
        } catch (err) {
            alert("Camera/Mic permission denied");
            console.error(err);
        }
    };
    /* ------------------ REQUEST STREAM ------------------ */
    // Stop / Close microphone stream
    const closeStream = () => {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach((track) => track.stop());
            setIsStreaming(false);
            console.log("Microphone stream stopped");
        }
    };

    /* ------------------ CONTROLS ------------------ */
    const startRecording = () => {
        if (!recorderRef.current) return;
        recorderRef.current.start();
        setIsRecording(true);
        setIsPaused(false);
        startTimer();
    };

    const pauseRecording = () => {
        if (!recorderRef.current) return;
        recorderRef.current.pause();
        setIsPaused(true);
        stopTimer();
    };

    const resumeRecording = () => {
        if (!recorderRef.current) return;
        recorderRef.current.resume();
        setIsPaused(false);
        startTimer();
    };

    const stopRecording = () => {
        if (!recorderRef.current) return;
        recorderRef.current.stop();
        setIsRecording(false);
        setIsPaused(false);
        stopTimer();
    };

    // remove recorgin 
    const removeRecording = (index: number) => {
        setRecordings((prev) => {
            // revoke blob URL to avoid memory leak
            URL.revokeObjectURL(prev[index].url);

            return prev.filter((_, i) => i !== index);
        });
    };

    /* ------------------ CLEANUP ------------------ */
    useEffect(() => {
        return () => {
            streamRef.current?.getTracks().forEach((t) => t.stop());
            stopTimer();
        };
    }, []);

    /* ------------------ UI ------------------ */
    return (
        <div style={{ maxWidth: 720, margin: "0 auto", padding: 20 }}>
            <h2 className="text-2xl font-bold mb-3">MediaRecorder – Next.js</h2>

            {/* Media type */}
            <div>
                <label className="border border-white rounded px-2 py-1">
                    <input
                        type="radio"
                        checked={mediaType === "video"}
                        onChange={() => setMediaType("video")}
                    />{" "}
                    Video
                </label>

                <label className="border border-white rounded px-2 py-1 ml-3">
                    <input
                        type="radio"
                        checked={mediaType === "audio"}
                        onChange={() => setMediaType("audio")}
                    />{" "}
                    Audio
                </label>
            </div>

            {/* Buttons */}
            <div style={{ marginTop: 10 }} className="flex justify-start items-center gap-3">
                {
                    isStreaming ? (
                        <button onClick={closeStream}
                            disabled={!isStreaming}
                            className="border border-white rounded px-2"
                        >close Stream
                        </button>
                    ) : (
                        <button onClick={requestStream}
                            disabled={isStreaming}
                            className="border border-white rounded px-2"
                        >Request Stream
                        </button>
                    )
                }
                <button
                    className="border border-white rounded px-2"
                    onClick={startRecording}
                    disabled={isRecording}
                    style={{ marginLeft: 5 }}
                >
                    Start
                </button>
                <button
                    className="border border-white rounded px-2"
                    onClick={stopRecording}
                    disabled={!isRecording}
                    style={{ marginLeft: 5 }}
                >
                    Stop
                </button>
            </div>

            {/* Live video preview */}
            {mediaType === "video" && (
                <div
                    style={{
                        position: "relative",
                        width: "100%",
                        marginTop: 10,
                    }}
                >
                    {/* VIDEO */}
                    <video
                        ref={videoRef}
                        autoPlay
                        muted
                        playsInline
                        style={{
                            width: "100%",
                            borderRadius: 8,
                        }}
                    />
                    {/* OVERLAY CONTROLS */}
                    <div className="absolute inset-0 flex justify-center items-end mb-6 text-white gap-2">
                        {/* CONTROLS */}
                        <div className={`${isRecording && "bg-white"} rounded text-black flex justify-center items-center gap-2 px-2 py-1`} >
                            {isRecording && !isPaused && (
                                <button onClick={pauseRecording}>
                                    <FaPause />
                                </button>
                            )}

                            {isPaused && (
                                <button onClick={resumeRecording}>
                                    <FaPlay />
                                </button>
                            )}
                            {/* Timer */}
                            {isRecording && (
                                <span className="text-sm">{formatTime(seconds)}</span>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Live video preview */}
            {mediaType === "audio" && isStreaming && (
                <div className="mt-6 w-full">
                    {/* Fake audio bar */}
                    <div className="h-2 bg-gray-300 rounded overflow-hidden">
                        <div
                            className="h-full bg-green-500 transition-all"
                            style={{ width: `${(seconds % 60) * 1.6}%` }}
                        />
                    </div>

                    {/* AUDIO CONTROLS */}
                    <div className={`${isRecording && "bg-white"} mt-2 flex items-center justify-center gap-2 text-black px-3 py-2 rounded w-fit`}>
                        {isRecording && !isPaused && (
                            <button onClick={pauseRecording}>
                                <FaPause />
                            </button>
                        )}

                        {isPaused && (
                            <button onClick={resumeRecording}>
                                <FaPlay />
                            </button>
                        )}

                        {isRecording && (
                            <span className="text-sm">{formatTime(seconds)}</span>
                        )}
                    </div>
                </div>
            )}

            {/* Recordings */}
            <ul className="mt-4 space-y-4">
                {recordings.map((rec, i) => (
                    <li
                        key={i}
                    >
                        {/* MEDIA */}
                        {rec.type === "video" ? (
                            <video src={rec.url} controls width={320} />
                        ) : (
                            <audio src={rec.url} controls />
                        )}

                        {/* CONTROLS ROW */}
                        <div className="flex items-center justify-start gap-2 mt-2">
                            {/* DOWNLOAD */}
                            <a href={rec.url} download>
                                <button className="text-green-600 font-bold text-sm cursor-pointer px-3 py-1.5 bg-white rounded">
                                    <GoDownload />
                                </button>
                            </a>
                            {/* SAVE BUTTON */}
                            <button
                                onClick={() => removeRecording(i)}
                                className="text-green-600 font-bold text-lg cursor-pointer px-2 py-1 bg-white rounded"
                                title="save"
                            >
                                <FiCheck />
                            </button>
                            {/* CLOSE BUTTON */}
                            <button
                                onClick={() => removeRecording(i)}
                                className="text-red-600 font-bold text-sm cursor-pointer px-3 py-1 bg-white rounded"
                                title="Remove"
                            >
                                ✕
                            </button>
                        </div>
                    </li>
                ))}
            </ul>


        </div>
    );
}
