

// "use client";

// import { useSelector } from "react-redux";
// import { RootState } from "@/app/redux/store";

// export default function ShowVideo() {
//     const recordings = useSelector(
//         (state: RootState) => state.video.recordings
//     );

//     return (
//         <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
//             {recordings.map((rec, i) => (
//                 <div key={i}>
//                     {rec.type === "video" ? (
//                         <video src={rec.url} controls width={320} />
//                     ) : (
//                         <audio src={rec.url} controls />
//                     )}
//                 </div>
//             ))}
//         </div>
//     );
// }


// "use client";

// import { useSelector } from "react-redux";
// import { RootState } from "@/app/redux/store";

// export default function ShowVideo() {
//     const recordings = useSelector(
//         (state: RootState) => state.video.recordings
//     );

//     return (
//         <div className="flex flex-col md:flex-row gap-6">
//             {/* VIDEO SIDE */}
//             <div className="flex-1">
//                 <h3 className="text-lg font-semibold mb-3">Videos</h3>

//                 <div className="flex flex-wrap gap-4">
//                     {recordings
//                         .filter((rec) => rec.type === "video")
//                         .map((rec, i) => (
//                             <video
//                                 key={i}
//                                 src={rec.url}
//                                 controls
//                                 className="w-full sm:w-[48%] rounded"
//                             />
//                         ))}
//                 </div>
//             </div>

//             {/* AUDIO SIDE */}
//             <div className="flex-1">
//                 <h3 className="text-lg font-semibold mb-3">Audios</h3>

//                 <div className="flex flex-col gap-4">
//                     {recordings
//                         .filter((rec) => rec.type === "audio")
//                         .map((rec, i) => (
//                             <div key={i} className="bg-gray-100 p-3 rounded">
//                                 <audio src={rec.url} controls className="w-full" />
//                             </div>
//                         ))}
//                 </div>
//             </div>
//         </div>

//     );
// }



"use client";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import { deleteRecording } from "../redux/features/video/videoSlice";
import { FiTrash2, FiVideo, FiMusic } from "react-icons/fi";

export default function ShowVideo() {
    const dispatch = useDispatch();

    const recordings = useSelector(
        (state: RootState) => state.video.recordings
    );

    const handleDelete = async (id: string, url: string) => {
        try {
            await fetch("/api/delete", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ url }),
            });

            dispatch(deleteRecording(id));
        } catch (err) {
            console.error("Delete failed", err);
        }
    };

    return (
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* ================= VIDEO SECTION ================= */}
            <section className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center gap-2 mb-5">
                    <FiVideo className="text-xl text-blue-600" />
                    <h3 className="text-xl font-semibold">Recorded Videos</h3>
                </div>

                {recordings.filter((rec) => rec.type === "video").length === 0 && (
                    <p className="text-sm text-gray-500">No videos recorded yet.</p>
                )}

                <div className="grid sm:grid-cols-2 gap-4">
                    {recordings
                        .filter((rec) => rec.type === "video")
                        .map((rec) => (
                            <div
                                key={rec.id}
                                className="group rounded-lg overflow-hidden border hover:shadow-md transition"
                            >
                                <video
                                    src={rec.url}
                                    controls
                                    className="w-full h-48 object-cover bg-black"
                                />

                                <div className="p-3 flex justify-between items-center">
                                    <span className="text-sm text-gray-600">
                                        {/* Video File */}
                                    </span>

                                    <button
                                        onClick={() => handleDelete(rec.id, rec.url)}
                                        className="flex items-center gap-1 text-sm text-red-600 hover:text-red-700"
                                    >
                                        <FiTrash2 />
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                </div>
            </section>

            {/* ================= AUDIO SECTION ================= */}
            <section className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center gap-2 mb-5">
                    <FiMusic className="text-xl text-green-600" />
                    <h3 className="text-xl font-semibold">Recorded Audios</h3>
                </div>

                {recordings.filter((rec) => rec.type === "audio").length === 0 && (
                    <p className="text-sm text-gray-500">No audios recorded yet.</p>
                )}

                <div className="space-y-4">
                    {recordings
                        .filter((rec) => rec.type === "audio")
                        .map((rec) => (
                            <div
                                key={rec.id}
                                className="flex items-center justify-between gap-3 p-4 border rounded-lg hover:shadow-md transition"
                            >
                                <audio src={rec.url} controls className="w-full" />

                                <button
                                    onClick={() => handleDelete(rec.id, rec.url)}
                                    className="flex items-center gap-1 text-sm text-red-600 hover:text-red-700"
                                >
                                    <FiTrash2 />
                                </button>
                            </div>
                        ))}
                </div>
            </section>
        </div>
    );
}
