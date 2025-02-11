const Skeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="w-56 h-48 bg-gray-300 rounded-lg mb-2"></div>
      <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-300 rounded w-1/2"></div>
    </div>
  );    
};

export default Skeleton; 