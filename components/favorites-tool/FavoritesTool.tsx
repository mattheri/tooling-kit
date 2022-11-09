import { When } from "react-if";
import { StatelessComponent } from "../../types";

interface Props {
  favoritedComponents?: React.FC[];
}

const FavoritesTool: StatelessComponent<Props> = ({ favoritedComponents }) => {
  return (
    <When condition={!!favoritedComponents}>
      {() => (
        <>
          {favoritedComponents?.map((Component, index) => (
            <Component key={index} />
          ))}
        </>
      )}
    </When>
  );
};

export default FavoritesTool;
