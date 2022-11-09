"use client";

import { StatefulComponent } from "../../types";

import { useEffect, useMemo, useRef, useState } from "react";
import { When } from "react-if";

import FeedLink from "./FeedLink";
import formateDate from "./formatDate";
import FavoriteButton from "../favorite-button/FavoriteButton";
import Db from "../../favorites/db";
import { useLiveQuery } from "dexie-react-hooks";

interface Props {
  title: string;
  description: string;
  pubDate: string;
  link: string;
  favoriteFeedId?: string;
}

const Feed: StatefulComponent<Props> = ({
  title,
  description,
  pubDate,
  link,
  favoriteFeedId,
}) => {
  const [html, setHtml] = useState("");
  const [date, setDate] = useState(pubDate);
  const [favoriteFeed, setFavoriteFeed] = useState(favoriteFeedId);

  const ref = useRef<HTMLElement>(null);
  const db = useMemo(() => new Db(), []);

  useEffect(() => setHtml(description), [description]);
  useEffect(() => setDate(formateDate(pubDate)), [pubDate]);

  useLiveQuery(() => {
    try {
      db.feed
        .where("link")
        .equals(link)
        .first()
        .then((feed) => {
          console.log(feed);
          if (feed) {
            setFavoriteFeed(feed.id);
          }
        });
    } catch (error) {
      console.log(error);
    }
  }, [link]);

  return (
    <article
      ref={ref}
      className="py-2 px-3 first-of-type:border-t-2 border-b-2 leading-loose bg-white rounded-lg relative"
    >
      <FeedLink
        link={link}
        className="no-underline hover:underline hover:underline-offset-4"
      >
        <When condition={!!title}>
          <h2 className="text-4xl font-black mb-3 text-sky-800">{title}</h2>
        </When>
        <When condition={!!html}>
          <div
            className="text-3xl text-slate-500"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </When>
        <When condition={!!pubDate}>
          <time className="text-xl text-slate-500">{date}</time>
        </When>
      </FeedLink>
      <FavoriteButton
        favoriteId={favoriteFeed}
        persistentLink={link}
        feed={{
          title,
          description,
          pubDate,
          link,
        }}
      />
    </article>
  );
};

export default Feed;
