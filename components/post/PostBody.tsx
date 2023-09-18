const PostBody = ({ body }: { body: string }) => {
  // fixxxxxxxxxxxxxxxx it
  return <div className="rich-text" dangerouslySetInnerHTML={{ __html: body }} />;
};

export default PostBody;
