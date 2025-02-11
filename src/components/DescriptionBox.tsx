import { useState } from "react";

const DescriptionBox = ({ description }: { description: string }) => {
  const [expanded, setExpanded] = useState(false);
  const MAX_LENGTH = 200; // Character limit before "Show More"

  const toggleExpand = () => setExpanded(!expanded);

  // Convert `\n` to `<br />`
  const formattedDescription = description.replace(/\n/g, "<br />");

  return (
    <div className="bg-violet-400 bg-opacity-20 backdrop-blur-lg backdrop-filter text-white p-4 rounded-lg shadow-lg">
      <p
        className="text-sm"
        dangerouslySetInnerHTML={{
          __html: expanded ? formattedDescription : `${formattedDescription.slice(0, MAX_LENGTH)}...`,
        }}
      />

      {description.length > MAX_LENGTH && (
        <button
          onClick={toggleExpand}
          className="mt-2 text-white font-semibold underline text-sm"
        >
          {expanded ? "Show Less" : "Show More"}
        </button>
      )}
    </div>
  );
};

export default DescriptionBox;
