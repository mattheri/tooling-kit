import { useLiveQuery } from "dexie-react-hooks";
import { nanoid } from "nanoid";
import React, { useMemo, useState } from "react";
import Db from "../../favorites/db";
import { StatelessComponent } from "../../types";

interface Props {
  componentName: string;
}

const FavoriteToolButton: StatelessComponent<Props> = ({ componentName }) => {
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

  const bgColor = isFavorited ? "bg-amber-400" : "white";

  const onClick = () => {
    db.tool.put({ component: componentName, id: nanoid() });
  };

  const onRemove = () => {
    db.tool.where("component").equals(componentName).delete();
  };

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
