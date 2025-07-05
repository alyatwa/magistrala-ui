import { getChannels } from "../actions";
import { ChannelsTable } from "../components/ChannelsTable";

export default function ChannelsPage() {
  const channels = getChannels();
  return (
    <>
      <ChannelsTable channels={channels} />
    </>
  );
}
