import useFavoriteTools from "../../hooks/useFavoriteTools";
import { StatelessComponent } from "../../types";

interface Props {
  componentName: string;
}

const FavoriteToolButton: StatelessComponent<Props> = ({ componentName }) => {
  const { isFavorited, onRemove, onClick } = useFavoriteTools(componentName);

  const bgColor = isFavorited ? "bg-amber-400" : "white";

  return (
    <div className="relative w-10 h-10">
      <span className="shape-star w-10 h-10 bg-slate-800 absolute top-[-0.25rem]"></span>
      <button
        onClick={isFavorited ? onRemove : onClick}
        type="button"
        className={`shape-star w-8 h-8 z-20 ${bgColor} absolute left-1`}
      ></button>
    </div>
  );
};

export default FavoriteToolButton;
