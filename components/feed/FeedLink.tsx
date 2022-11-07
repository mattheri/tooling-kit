import { StatelessComponentWithChildren } from "../../types";

interface Props {
  link?: string;
  className?: string;
}

const FeedLink: StatelessComponentWithChildren<Props> = ({
  link,
  className,
  children,
}) => {
  if (link) {
    return (
      <a
        className={className}
        href={link}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    );
  }

  return <div className={className}>{children}</div>;
};

export default FeedLink;
