

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


"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";

export default function ShowVideo() {
    const recordings = useSelector(
        (state: RootState) => state.video.recordings
    );

    return (
        <div className="flex flex-col md:flex-row gap-6">
            {/* VIDEO SIDE */}
            <div className="flex-1">
                <h3 className="text-lg font-semibold mb-3">Videos</h3>

                <div className="flex flex-wrap gap-4">
                    {recordings
                        .filter((rec) => rec.type === "video")
                        .map((rec, i) => (
                            <video
                                key={i}
                                src={rec.url}
                                controls
                                className="w-full sm:w-[48%] rounded"
                            />
                        ))}
                </div>
            </div>

            {/* AUDIO SIDE */}
            <div className="flex-1">
                <h3 className="text-lg font-semibold mb-3">Audios</h3>

                <div className="flex flex-col gap-4">
                    {recordings
                        .filter((rec) => rec.type === "audio")
                        .map((rec, i) => (
                            <div key={i} className="bg-gray-100 p-3 rounded">
                                <audio src={rec.url} controls className="w-full" />
                            </div>
                        ))}
                </div>
            </div>
        </div>

    );
}

