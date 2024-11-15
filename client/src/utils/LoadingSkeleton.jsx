const LoadingSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {[...Array(6)].map((_, index) => (
      <div
        key={index}
        className="bg-white rounded-lg shadow-md p-4 animate-pulse"
      >
        <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
        <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
        <div className="flex gap-2 mb-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-6 w-16 bg-gray-200 rounded-full"></div>
          ))}
        </div>
        <div className="h-10 bg-gray-200 rounded"></div>
      </div>
    ))}
  </div>
);

export default LoadingSkeleton;
