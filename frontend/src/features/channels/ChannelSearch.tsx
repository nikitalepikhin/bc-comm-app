import React from "react";
import ComboBox from "../../common/ui/ComboBox";

const ChannelSearch: React.FC = () => {
  return (
    <ComboBox
      name="channel"
      placeholder="Search channels..."
      onChange={(c) => {
        console.log("selected channel", c);
      }}
      onInputChange={(v) => {
        console.log(`channel: ${v}`);
      }}
      options={[]}
    />
  );
};

export default ChannelSearch;
