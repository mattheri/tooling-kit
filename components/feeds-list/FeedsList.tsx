"use client";

import type { Feed as IFeed } from "../../feeds/client";
import type { StatelessComponentWithChildren } from "../../types";

import { When, If, Then, Else } from "react-if";

import Feed from "../feed/Feed";

interface Props {
  feeds?: IFeed[];
  title?: string;
}

const FeedsList: StatelessComponentWithChildren<Props> = ({
  feeds,
  title,
  children,
}) => {
  return (
    <section className="overflow-auto overflow-x-hidden w-full lg:max-h-[calc(100vh-5rem)] flex flex-col gap-4 bg-slate-400 px-3 lg:last-of-type:pl-0 lg:first-of-type:pr-0">
      <When condition={!!title}>
        <h1 className="w-[calc(100%+1.5rem)] translate-x-[calc(-0.75rem)] text-5xl font-black text-sky-800 lg:sticky top-0 z-10 bg-white p-3 -mb-4">
          {title}
        </h1>
      </When>
      <If condition={feeds && feeds.length}>
        <Then>
          {feeds?.map((feed, index) => (
            <Feed key={index} {...feed} />
          ))}
        </Then>
        <Else>{children}</Else>
      </If>
    </section>
  );
};

export default FeedsList;
