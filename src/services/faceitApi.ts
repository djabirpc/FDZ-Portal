// services/faceitApi.ts
import type {
  FaceitChampionshipResponse,
  FaceitChampionshipSubscriptionsResponse,
  FaceitMatchesResponse,
  FaceitMatchDetails,
  FaceitTeamStats,
  FaceitPlayerStats,
  FaceitChampionshipResultsResponse,
  FaceitOrganizer,                      
  FaceitChampionshipListItem,           
  FaceitChampionshipsResponse           
} from '../types/faceit';

const FACEIT_API_BASE = 'https://open.faceit.com/data/v4';
const API_KEY = import.meta.env.VITE_NEXT_PUBLIC_FACEIT_API_KEY;
// const API_KEY = "ce5bb4a9-1c37-4d6f-b813-decba6431a87";


const headers = {
  'Authorization': `Bearer ${API_KEY}`,
  'Accept': 'application/json'
};

const DEBUG = process.env.NODE_ENV === 'development';



// Get championship details with expanded organizer and game data
export async function getChampionship(
  championshipId: string
): Promise<FaceitChampionshipResponse> {
  const url = `${FACEIT_API_BASE}/championships/${championshipId}?expanded=organizer,game`;
  
  if (DEBUG) {
    console.log('🔵 Fetching championship:', url);
  }
  
  const response = await fetch(url, { headers });
  
  if (DEBUG) {
    console.log('📊 Response status:', response.status);
  }
  
  if (!response.ok) {
    console.error('❌ API Error:', response.status, response.statusText);
    throw new Error(`Failed to fetch championship: ${response.statusText}`);
  }
  
  const data = await response.json();
  
  if (DEBUG) {
    console.log('✅ Championship data:', data);
  }
  
  return data;
}

// Get all matches of a championship
export async function getChampionshipMatches(
  championshipId: string,
  type: 'all' | 'upcoming' | 'ongoing' | 'past' = 'all',
  offset: number = 0,
  limit: number = 20
): Promise<FaceitMatchesResponse> {
  const url = `${FACEIT_API_BASE}/championships/${championshipId}/matches?type=${type}&offset=${offset}&limit=${limit}`;
  
  if (DEBUG) {
    console.log('🔵 Fetching championship matches:', url);
  }
  
  const response = await fetch(url, { headers });
  
  if (!response.ok) {
    throw new Error(`Failed to fetch matches: ${response.statusText}`);
  }
  
  const data = await response.json();
  
  if (DEBUG) {
    console.log('✅ Matches data:', data);
  }
  
  return data;
}

// Get championship subscriptions (participants - players or teams)
export async function getChampionshipSubscriptions(
  championshipId: string,
  offset: number = 0,
  limit: number = 100
): Promise<FaceitChampionshipSubscriptionsResponse> {
  const url = `${FACEIT_API_BASE}/championships/${championshipId}/subscriptions?offset=${offset}&limit=${limit}`;
  
  if (DEBUG) {
    console.log('🔵 Fetching championship subscriptions:', url);
  }
  
  const response = await fetch(url, { headers });
  
  if (!response.ok) {
    throw new Error(`Failed to fetch subscriptions: ${response.statusText}`);
  }
  
  const data = await response.json();
  
  if (DEBUG) {
    console.log('✅ Subscriptions data:', data);
  }
  
  return data;
}

// Get championship results/standings
export async function getChampionshipResults(
  championshipId: string,
  offset: number = 0,
  limit: number = 100
): Promise<FaceitChampionshipResultsResponse> {
  const url = `${FACEIT_API_BASE}/championships/${championshipId}/results?offset=${offset}&limit=${limit}`;
  
  if (DEBUG) {
    console.log('🔵 Fetching championship results:', url);
  }
  
  const response = await fetch(url, { headers });
  
  if (!response.ok) {
    throw new Error(`Failed to fetch results: ${response.statusText}`);
  }
  
  const data = await response.json();
  
  if (DEBUG) {
    console.log('✅ Results data:', data);
  }
  
  return data;
}

// Get player stats
export async function getPlayerStats(
  playerId: string,
  gameId: string = 'cs2'
): Promise<FaceitPlayerStats> {
  const url = `${FACEIT_API_BASE}/players/${playerId}/stats/${gameId}`;
  
  const response = await fetch(url, { headers });
  
  if (!response.ok) {
    throw new Error(`Failed to fetch player stats: ${response.statusText}`);
  }
  
  return response.json();
}

// Get team stats
export async function getTeamStats(
  teamId: string,
  gameId: string = 'cs2'
): Promise<FaceitTeamStats> {
  const url = `${FACEIT_API_BASE}/teams/${teamId}/stats/${gameId}`;
  
  const response = await fetch(url, { headers });
  
  if (!response.ok) {
    throw new Error(`Failed to fetch team stats: ${response.statusText}`);
  }
  
  return response.json();
}

// Get match details
export async function getMatch(matchId: string): Promise<FaceitMatchDetails> {
  const url = `${FACEIT_API_BASE}/matches/${matchId}`;
  
  const response = await fetch(url, { headers });
  
  if (!response.ok) {
    throw new Error(`Failed to fetch match: ${response.statusText}`);
  }
  
  return response.json();
}


// Get organizer details
export async function getOrganizer(organizerId: string): Promise<FaceitOrganizer> {
  const url = `${FACEIT_API_BASE}/organizers/${organizerId}`;
  
  if (DEBUG) {
    console.log('🔵 Fetching organizer:', url);
  }
  
  const response = await fetch(url, { headers });
  
  if (!response.ok) {
    throw new Error(`Failed to fetch organizer: ${response.statusText}`);
  }
  
  const data = await response.json();
  
  if (DEBUG) {
    console.log('✅ Organizer data:', data);
  }
  
  return data;
}

// Get all championships for a specific game
export async function getChampionshipsByGame(
  gameId: string = 'cs2',
  type: 'all' | 'upcoming' | 'ongoing' | 'past' = 'all',
  offset: number = 0,
  limit: number = 100
): Promise<FaceitChampionshipsResponse> {
  const url = `${FACEIT_API_BASE}/championships?game=${gameId}&type=${type}&offset=${offset}&limit=${limit}`;
  
  if (DEBUG) {
    console.log('🔵 Fetching championships:', url);
  }
  
  const response = await fetch(url, { headers });
  
  if (!response.ok) {
    throw new Error(`Failed to fetch championships: ${response.statusText}`);
  }
  
  const data = await response.json();
  
  if (DEBUG) {
    console.log('✅ Championships data:', data);
  }
  
  return data;
}

// Get organizer's hubs (tournaments)
export async function getOrganizerHubs(
  organizerId: string,
  offset: number = 0,
  limit: number = 100
): Promise<{items: Array<{hub_id: string; name: string; game_id: string}>}> {
  const url = `${FACEIT_API_BASE}/organizers/${organizerId}/hubs?offset=${offset}&limit=${limit}`;
  
  if (DEBUG) {
    console.log('🔵 Fetching organizer hubs:', url);
  }
  
  const response = await fetch(url, { headers });
  
  if (!response.ok) {
    throw new Error(`Failed to fetch hubs: ${response.statusText}`);
  }
  
  const data = await response.json();
  
  if (DEBUG) {
    console.log('✅ Hubs data:', data);
  }
  
  return data;
}


// Get championships by organizer ID
export async function getOrganizerChampionships(
  organizerId: string,
  offset: number = 0,
  limit: number = 100
): Promise<FaceitChampionshipsResponse> {
  const url = `${FACEIT_API_BASE}/organizers/${organizerId}/championships?offset=${offset}&limit=${limit}`;
  
  if (DEBUG) {
    console.log('🔵 Fetching organizer championships:', url);
  }
  
  const response = await fetch(url, { headers });
  
  if (!response.ok) {
    throw new Error(`Failed to fetch organizer championships: ${response.statusText}`);
  }
  
  const data = await response.json();
  
  if (DEBUG) {
    console.log('✅ Organizer championships data:', data);
  }
  
  return data;
}

// Get organizer's games (to filter hubs)
export async function getOrganizerGames(
  organizerId: string,
  offset: number = 0,
  limit: number = 100
): Promise<{items: Array<{game_id: string; name: string}>}> {
  const url = `${FACEIT_API_BASE}/organizers/${organizerId}/games?offset=${offset}&limit=${limit}`;
  
  if (DEBUG) {
    console.log('🔵 Fetching organizer games:', url);
  }
  
  const response = await fetch(url, { headers });
  
  if (!response.ok) {
    throw new Error(`Failed to fetch organizer games: ${response.statusText}`);
  }
  
  const data = await response.json();
  
  if (DEBUG) {
    console.log('✅ Organizer games data:', data);
  }
  
  return data;
}