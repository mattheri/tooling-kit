import Spinner from "../spinner/Spinner";

const FullScreenLoading = () => {
  return (
    <div className="w-[100vw] h-[100vh] fixed top-0 left-0 z-50 bg-slate-300 grid place-items-center opacity-40">
      <Spinner />
    </div>
  );
};

export default FullScreenLoading;
