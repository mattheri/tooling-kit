import LoadingCard from "../loading-card/LoadingCard";

const LoadingFeedsList = () => {
  return (
    <section className="overflow-auto w-full lg:max-h-[calc(100vh-5rem)] flex flex-col gap-4 bg-slate-400 px-3 lg:last-of-type:pl-0 lg:first-of-type:pr-0">
      {Object.keys(Array.from({ length: 15 })).map((_, index) => (
        <LoadingCard key={index} />
      ))}
    </section>
  );
};

export default LoadingFeedsList;
