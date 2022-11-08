import dynamic from "next/dynamic";
import { useLiveQuery } from "dexie-react-hooks";
import { useMemo, useState } from "react";
import Db from "../../favorites/db";

const FavoritesTool = () => {
  const [favoritedComponents, setFavoritedComponents] = useState<any[]>([]);

  const db = useMemo(() => new Db(), []);

  const importFavoriteTool = async (componentName: string) => {
    const component = dynamic(() => import(`/components/${componentName}`));

    setFavoritedComponents((prev) => [...new Set([...prev, component])]);
  };

  useLiveQuery(() => {
    db.tool.toArray().then((tools) => {
      setFavoritedComponents([]);

      tools.forEach(({ component }) => {
        importFavoriteTool(component);
      });
    });
  });

  return (
    <div>
      {favoritedComponents.map((Component, index) => (
        <Component key={index} />
      ))}
    </div>
  );
};

export default FavoritesTool;
