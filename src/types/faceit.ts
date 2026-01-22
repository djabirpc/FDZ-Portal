// types/faceit.ts

export interface Championship {
  name: string;
  prize: string;
  region: string;
  totalSubscriptions: number;
  status: string;
  game: string;
  id: string;
  organizer?: {
    name: string;
    avatar: string;
  };
  background_image?: string;
  cover_image?: string;
  type: string;
  startDate?: string;
  endDate?: string;
}

export interface Team {
  id: string;
  name: string;
  avatar: string;
  wins: number;
  losses: number;
  winRate: number;
  rank?: number;        // Add this
  tag?: string;         // Add this
  rating?: string;      // Add this
  change?: string;      // Add this
}

export interface Match {
  id: string;
  team1: string;
  team2: string;
  score1: number;
  score2: number;
  status: string;
  startTime: string | null;
  map: string;
  date?: string;        // Add this
}

export interface Player {
  id: string;
  name: string;
  team: string;
  avatar: string;
  kd: number;
  rating: number;
  rank?: number;        // Add this
  adr?: number;         // Add this
  hs?: number;          // Add this
}

export interface ChampionshipSubscription {
  user: {
    user_id: string;
    nickname: string;
    avatar: string;
  };
  roster?: Array<{
    player_id: string;
    nickname: string;
    avatar: string;
  }>;
}

// API Response types
export interface FaceitChampionshipResponse {
  championship_id: string;
  name: string;
  description?: string;
  region: string;
  game_id: string;
  game_data?: {
    name: string;
  };
  organizer_id: string;
  organizer_data?: {
    name: string;
    avatar: string;
  };
  background_image?: string;
  cover_image?: string;
  type: string;
  status: string;
  total_prizes: string;
  prize_type?: string;
  subscription_start?: string;
  subscription_end?: string;
  championship_start?: string;
  championship_end?: string;
  total_rounds?: number;
  number_of_members?: number;
}

export interface FaceitChampionshipSubscriptionsResponse {
  items: ChampionshipSubscription[];
  start: number;
  end: number;
}

export interface FaceitMatchResponse {
  match_id: string;
  status: string;
}

export interface FaceitMatchesResponse {
  items: FaceitMatchResponse[];
}

export interface FaceitMatchDetails {
  teams: {
    faction1: { name: string };
    faction2: { name: string };
  };
  results?: {
    score?: {
      faction1?: number;
      faction2?: number;
    };
  };
  status: string;
  started_at: string | null;
  voting?: {
    map?: {
      pick?: string[];
    };
  };
}

export interface FaceitTeamStats {
  lifetime?: {
    wins?: number;
    losses?: number;
    'Current Win Streak'?: number;
  };
}

export interface FaceitPlayerStats {
  lifetime?: {
    'Average K/D Ratio'?: number;
    'Average Kills'?: number;
  };
}

export interface FaceitChampionshipResultsResponse {
  items: Array<{
    position: number;
    player?: {
      player_id: string;
      nickname: string;
      avatar: string;
    };
    team?: {
      team_id: string;
      name: string;
      avatar: string;
    };
    points: number;
  }>;
}

export interface FaceitOrganizer {
  organizer_id: string;
  name: string;
  avatar: string;
  cover_image?: string;
  description?: string;
  facebook?: string;
  twitter?: string;
  youtube?: string;
  website?: string;
}

export interface FaceitChampionshipListItem {
  championship_id: string;
  name: string;
  game_id: string;
  game_data?: {
    name: string;
  };
  region: string;
  status: string;
  type: string;
  total_prizes?: string;
  championship_start?: string;
  championship_end?: string;
  subscription_start?: string;
  subscription_end?: string;
  total_rounds?: number;
  number_of_members?: number;
  background_image?: string;
  cover_image?: string;
}

export interface FaceitChampionshipsResponse {
  items: FaceitChampionshipListItem[];
  start: number;
  end: number;
}
