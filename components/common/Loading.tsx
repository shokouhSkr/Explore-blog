import { Loader } from "lucide-react";
import { Container } from "../../components";

const Loading = () => {
  return (
    <Container>
      <div className="min-h-[calc(100dvh-300px)] flex-center">
        <Loader className="animate-spin" />
      </div>
    </Container>
  );
};

export default Loading;
