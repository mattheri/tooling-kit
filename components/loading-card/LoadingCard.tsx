const LoadingCard = () => {
  return (
    <article className="p-3 first-of-type:border-t-2 border-b-2 leading-loose bg-white rounded-lg">
      <div className="flex flex-col h-60">
        <div className="animate-pulse w-full bg-gray-400 h-12 rounded-lg mb-auto" />
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="animate-pulse w-full bg-gray-400 h-6 rounded-lg mb-2"
          />
        ))}
      </div>
    </article>
  );
};

export default LoadingCard;
