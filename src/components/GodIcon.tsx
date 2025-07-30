import { Replay } from "@/data/replays-data";

// A simple mapping of gods to emojis for visual representation
const godIconMap: Record<Replay['players'][0]['god'], string> = {
  Zeus: '⚡️',
  Poseidon: '🔱',
  Hades: '💀',
  Odin: '🐺',
  Thor: '🔨',
  Loki: '🐍',
  Ra: '☀️',
  Isis: '🦅',
  Set: '🐊',
  Oranos: '☁️',
  Kronos: '⏳',
  Gaia: '🌳',
};

interface GodIconProps {
  god: Replay['players'][0]['god'];
}

export const GodIcon = ({ god }: GodIconProps) => {
  return <span title={god} className="text-lg">{godIconMap[god] || '❔'}</span>;
};

