export type Replay = {
  id: number;
  map: string;
  players: {
    name: string;
    god: 'Zeus' | 'Poseidon' | 'Hades' | 'Odin' | 'Thor' | 'Loki' | 'Ra' | 'Isis' | 'Set' | 'Oranos' | 'Kronos' | 'Gaia';
    rating: number;
  }[];
  version: string;
  duration: string;
  views: number;
  date: string;
  downloadUrl: string;
};

export const replays: Replay[] = [
  {
    id: 1,
    map: 'Tundra',
    players: [
      { name: 'Keven AOM', god: 'Odin', rating: 2100 },
      { name: 'MatReiz', god: 'Zeus', rating: 2050 },
    ],
    version: '1.0.3',
    duration: '22:15',
    views: 1254,
    date: '2024-07-28',
    downloadUrl: '#',
  },
  {
    id: 2,
    map: 'Mediterranean',
    players: [
      { name: 'Player1', god: 'Isis', rating: 1980 },
      { name: 'Player2', god: 'Loki', rating: 1950 },
    ],
    version: '1.0.3',
    duration: '18:40',
    views: 987,
    date: '2024-07-27',
    downloadUrl: '#',
  },
  {
    id: 3,
    map: 'Anatolia',
    players: [
      { name: 'Keven AOM', god: 'Ra', rating: 2105 },
      { name: 'Player3', god: 'Poseidon', rating: 2000 },
    ],
    version: '1.0.2',
    duration: '35:10',
    views: 2341,
    date: '2024-07-26',
    downloadUrl: '#',
  },
  {
    id: 5,
    map: 'Ghost Lake',
    players: [
      { name: 'Keven AOM', god: 'Thor', rating: 2110 },
      { name: 'Player6', god: 'Set', rating: 2020 },
    ],
    version: '1.0.1',
    duration: '28:30',
    views: 1890,
    date: '2024-07-24',
    downloadUrl: '#',
  },
];

