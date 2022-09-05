import React from "react";
import { useParams } from "react-router-dom";

const ChannelPage: React.FC = () => {
  const { textId } = useParams();
  return <div>Channel with text ID {textId}</div>;
};

export default ChannelPage;
