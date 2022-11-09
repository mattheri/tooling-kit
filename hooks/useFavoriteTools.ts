import { useLiveQuery } from "dexie-react-hooks";
import { nanoid } from "nanoid";
import { useMemo, useState } from "react";
import Db from "../favorites/db";

const useFavoriteTools = (componentName: string) => {
  const [isFavorited, setIsFavorited] = useState(false);

  const db = useMemo(() => new Db(), []);

  useLiveQuery(() => {
    db.tool.toArray().then((tools) => {
      const isFavorited = tools.some(
        (tool) => tool.component === componentName
      );

      setIsFavorited(isFavorited);
    });
  });

  const onClick = () => {
    db.tool.put({ component: componentName, id: nanoid() });
  };

  const onRemove = () => {
    db.tool.where("component").equals(componentName).delete();
  };

  return { isFavorited, onClick, onRemove };
};

export default useFavoriteTools;
