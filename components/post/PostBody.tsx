import ReactMarkdown from "react-markdown";

const PostBody = ({ body }: { body: string }) => {
  return <div className="rich-text" dangerouslySetInnerHTML={{ __html: body }} />;
};

export default PostBody;
