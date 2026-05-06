import { useEffect, useState } from "react";

function App() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchVideos() {
    setLoading(true);
    const url = "https://api.freeapi.app/api/v1/public/youtube/videos";
    try {
      const response = await fetch(url);
      const data = await response.json();
      // Data Path based on your JSON: data.data.data
      setVideos(data.data.data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchVideos();
  }, []);

  return (
    <div className="min-h-screen bg-[#4e4a4a] text-white p-4">
      {/* Navbar Style */}
      <nav className="flex justify-between items-center mb-8 px-4">
        <div className="flex items-center gap-1">
          <span className="text-red-600 text-3xl font-bold">▶</span>
          <h1 className="text-xl font-bold tracking-tighter">YouTube</h1>
        </div>
        <p className="text-gray-400 text-sm italic">Student: Rupesh Pradhan</p>
      </nav>

      {loading ? (
        <div className="flex justify-center mt-20">
          <div className="animate-spin h-10 w-10 border-4 border-gray-600 border-t-white rounded-full"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8">
          {videos.map((video) => (
            <div key={video.items.id} className="group cursor-pointer">
              {/* Thumbnail */}
              <div className="relative aspect-video overflow-hidden rounded-xl mb-3">
                <img 
                  src={video.items.snippet.thumbnails.high.url} 
                  alt={video.items.snippet.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
                <span className="absolute bottom-2 right-2 bg-black/80 px-1.5 py-0.5 rounded text-xs font-medium">
                  {video.items.contentDetails.duration.replace('PT', '').replace('M', ':').replace('S', '')}
                </span>
              </div>

              {/* Video Info */}
              <div className="flex gap-3">
                <div className="flex-shrink-0">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-orange-500 to-purple-600 flex items-center justify-center font-bold">
                    {video.items.snippet.channelTitle[0]}
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-sm line-clamp-2 leading-snug mb-1">
                    {video.items.snippet.title}
                  </h3>
                  <p className="text-gray-400 text-xs hover:text-white transition">
                    {video.items.snippet.channelTitle}
                  </p>
                  <p className="text-gray-400 text-xs">
                    {Number(video.items.statistics.viewCount).toLocaleString()} views • 1 year ago
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
