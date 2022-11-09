"use client";

import { StatefulComponent } from "../../types";

import { useEffect, useRef, useState } from "react";
import { When } from "react-if";

import FeedLink from "./FeedLink";
import formateDate from "./formatDate";
import FavoriteButton from "../favorite-button/FavoriteButton";

interface Props {
  title: string;
  description: string;
  pubDate: string;
  link: string;
}

const Feed: StatefulComponent<Props> = ({
  title,
  description,
  pubDate,
  link,
}) => {
  const [html, setHtml] = useState("");
  const [date, setDate] = useState(pubDate);

  const ref = useRef<HTMLElement>(null);

  useEffect(() => setHtml(description), [description]);
  useEffect(() => setDate(formateDate(pubDate)), [pubDate]);

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
