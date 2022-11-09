import React from "react";
import { When } from "react-if";
import { IFeed } from "../../favorites/db";
import { StatelessComponent } from "../../types";
import Feed from "../feed/Feed";
import FeedsList from "../feeds-list/FeedsList";

interface Props {
  feeds?: IFeed[];
}

const FavoriteFeeds: StatelessComponent<Props> = ({ feeds }) => {
  return (
    <div className="max-w-[120rem] mx-auto">
      <When condition={feeds && feeds.length}>
        <FeedsList title="Feeds">
          <div className="p-4 flex flex-col gap-4">
            {feeds?.map((feed) => (
              <Feed key={feed?.id} {...feed!} />
            ))}
          </div>
        </FeedsList>
      </When>
    </div>
  );
};

export default FavoriteFeeds;
