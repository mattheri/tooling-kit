import LoadingFeedsList from "../../components/loading-feeds-list/LoadingFeedsList";
import { normalizedNames } from "../../feeds/constants";

const Loading = () => {
  return Object.keys(normalizedNames).map((key) => <LoadingFeedsList />);
};

export default Loading;
