export const formatHashtags = (text, onTagClick) => {
  if (!text) return "";
  const parts = text.split(/(\s+)/);
  return parts.map((part, i) => {
    if (part.startsWith('#') && part.length > 1) {
      return (
        <span 
          key={i} 
          onClick={(e) => {
            e.preventDefault();
            onTagClick(part.substring(1));
          }}
          className="text-blue-500 hover:underline cursor-pointer font-medium"
        >
          {part}
        </span>
      );
    }
    return part;
  });
};