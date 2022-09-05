import React from "react";
import ComboBox from "../../common/ui/ComboBox";
import { useNavigate } from "react-router-dom";
import { useSearchChannelsMutation } from "../../app/enhancedApi";

interface Props {
  onSelected: () => void;
}

const ChannelSearch: React.FC<Props> = ({ onSelected }) => {
  const navigate = useNavigate();
  const [searchChannels, { data }] = useSearchChannelsMutation();

  // todo - make a formik form - and reset on submit

  return (
    <div>
      <ComboBox
        name="channel"
        placeholder="Search channels..."
        onChange={(value) => {
          if (value !== undefined) {
            navigate(`/channels/${value?.value}`);
          }
        }}
        onInputChange={(value) => searchChannels({ getChannelsSearchSuggestionsRequestDto: { value } })}
        options={data ? data.channels : []}
        wait={1000}
      />
    </div>
  );
};

export default ChannelSearch;
