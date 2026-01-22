// Portal.tsx
import { useEffect, useState } from 'react';
import type { Championship, Team, Match, Player } from '../types/faceit';
import {
  getChampionship,
  getChampionshipMatches,
  getChampionshipSubscriptions,
  getChampionshipResults,
  getPlayerStats,
  getMatch
} from '../services/faceitApi';

export default function Portal() {
  const [selectedChampionship, setSelectedChampionship] = useState<Championship | null>(null);
  const [teams, setTeams] = useState<Team[]>([]);
  const [matches, setMatches] = useState<Match[]>([]);
  const [topPlayers, setTopPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Your championship ID from the URL
  const CHAMPIONSHIP_ID = '94cc8f11-b553-4124-9bbf-e038ebfe346b';

  useEffect(() => {
    loadChampionshipData();
  }, []);

  async function loadChampionshipData() {
    try {
      console.log('🚀 Starting championship data load...');
      setLoading(true);
      setError(null);

      // Fetch championship details
      console.log('1️⃣ Fetching championship details...');
      const championshipData = await getChampionship(CHAMPIONSHIP_ID);
      console.log('✅ Championship loaded:', championshipData);
      
      setSelectedChampionship({
        id: championshipData.championship_id,
        name: championshipData.name,
        prize: championshipData.total_prizes || 'TBA',
        region: championshipData.region,
        totalSubscriptions: championshipData.number_of_members || 0,
        status: championshipData.status,
        game: championshipData.game_data?.name || championshipData.game_id,
        organizer: championshipData.organizer_data,
        background_image: championshipData.background_image,
        cover_image: championshipData.cover_image,
        type: championshipData.type,
        startDate: championshipData.championship_start,
        endDate: championshipData.championship_end
      });

      // Fetch championship subscriptions (participants)
      console.log('2️⃣ Fetching championship subscriptions...');
      const subscriptionsData = await getChampionshipSubscriptions(CHAMPIONSHIP_ID);
      console.log(`✅ Subscriptions loaded: ${subscriptionsData.items.length} participants`);
      
      // Fetch standings/results
      console.log('3️⃣ Fetching championship results...');
      const resultsData = await getChampionshipResults(CHAMPIONSHIP_ID);
      console.log('✅ Results loaded:', resultsData);
      
      // Process teams from results (if it's a team championship)
      const teamsFromResults: Team[] = resultsData.items
        .filter(item => item.team)
        .slice(0, 10)
        .map(item => ({
          id: item.team!.team_id,
          name: item.team!.name,
          avatar: item.team!.avatar,
          wins: 0, // Will be populated if we fetch team stats
          losses: 0,
          winRate: item.points || 0
        }));
      
      setTeams(teamsFromResults);

      // Fetch matches
      console.log('4️⃣ Fetching championship matches...');
      const matchesData = await getChampionshipMatches(CHAMPIONSHIP_ID, 'all', 0, 20);
      console.log(`✅ Matches loaded: ${matchesData.items.length} matches`);
      
      const enrichedMatches = await Promise.all(
        matchesData.items.slice(0, 10).map(async (match) => {
          try {
            const matchDetails = await getMatch(match.match_id);
            return {
              id: match.match_id,
              team1: matchDetails.teams.faction1.name,
              team2: matchDetails.teams.faction2.name,
              score1: matchDetails.results?.score?.faction1 || 0,
              score2: matchDetails.results?.score?.faction2 || 0,
              status: matchDetails.status,
              startTime: matchDetails.started_at,
              map: matchDetails.voting?.map?.pick?.[0] || 'TBD'
            };
          } catch {
            return {
              id: match.match_id,
              team1: 'Team 1',
              team2: 'Team 2',
              score1: 0,
              score2: 0,
              status: match.status,
              startTime: null,
              map: 'TBD'
            };
          }
        })
      );
      setMatches(enrichedMatches);

      // Fetch top players from results
      console.log('5️⃣ Processing top players...');
      const playersFromResults: Player[] = resultsData.items
        .filter(item => item.player)
        .slice(0, 10)
        .map(item => ({
          id: item.player!.player_id,
          name: item.player!.nickname,
          team: 'N/A',
          avatar: item.player!.avatar,
          kd: 0,
          rating: item.points || 0
        }));

      // Optionally fetch detailed stats for top players
      const playersWithStats = await Promise.all(
        playersFromResults.slice(0, 10).map(async (player) => {
          try {
            const stats = await getPlayerStats(player.id, championshipData.game_id);
            return {
              ...player,
              kd: stats?.lifetime?.['Average K/D Ratio'] || 0,
              rating: stats?.lifetime?.['Average Kills'] || player.rating
            };
          } catch {
            return player;
          }
        })
      );
      
      setTopPlayers(playersWithStats);
      console.log('🏁 Championship data load complete');

    } catch (err) {
      console.error('💥 Fatal Error:', err);
      setError(err instanceof Error ? err.message : 'Failed to load championship data');
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-purple-500 mx-auto mb-4"></div>
          <div className="text-2xl text-white">Loading championship data...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
        <div className="text-center">
          <div className="text-6xl mb-4">❌</div>
          <div className="text-2xl text-red-500">Error: {error}</div>
          <button
            onClick={loadChampionshipData}
            className="mt-6 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
      {/* Header with Championship Cover */}
      {selectedChampionship?.cover_image && (
        <div 
          className="h-64 bg-cover bg-center relative"
          style={{ backgroundImage: `url(${selectedChampionship.cover_image})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900"></div>
        </div>
      )}

      {/* Header */}
      <header className="bg-black/30 backdrop-blur-md border-b border-purple-500/30">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {selectedChampionship?.organizer?.avatar && (
                <img 
                  src={selectedChampionship.organizer.avatar} 
                  alt="Organizer" 
                  className="w-12 h-12 rounded-full border-2 border-purple-500"
                />
              )}
              <div>
                <h1 className="text-3xl font-bold text-white">FDZ Portal</h1>
                <span className="text-purple-300 text-sm">Counter-Strike 2 Championship Hub</span>
              </div>
            </div>
            <nav className="flex gap-6">
              <a href="#teams" className="text-white hover:text-purple-300 transition">Teams</a>
              <a href="#matches" className="text-white hover:text-purple-300 transition">Matches</a>
              <a href="#players" className="text-white hover:text-purple-300 transition">Players</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Championship Info Section */}
      <section className="container mx-auto px-4 py-8">
        <div className="bg-black/40 backdrop-blur-lg rounded-2xl border border-purple-500/30 p-8 shadow-2xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-4xl font-bold text-white mb-2">
                {selectedChampionship?.name}
              </h2>
              <div className="flex gap-6 text-lg flex-wrap">
                <span className="text-purple-300">
                  💰 Prize Pool: <span className="text-white font-semibold">{selectedChampionship?.prize}</span>
                </span>
                <span className="text-purple-300">
                  🌍 Region: <span className="text-white font-semibold">{selectedChampionship?.region}</span>
                </span>
                <span className="text-purple-300">
                  👥 Participants: <span className="text-white font-semibold">{selectedChampionship?.totalSubscriptions}</span>
                </span>
                <span className="text-purple-300">
                  🎮 Game: <span className="text-white font-semibold">{selectedChampionship?.game}</span>
                </span>
              </div>
            </div>
            <div className="px-6 py-3 bg-purple-600 rounded-lg">
              <span className="text-white font-bold uppercase">{selectedChampionship?.status}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Overview */}
      <section className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-black/40 backdrop-blur-lg rounded-xl border border-purple-500/30 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-300 text-sm uppercase mb-1">Total Teams</p>
                <p className="text-4xl font-bold text-white">{teams.length}</p>
              </div>
              <div className="text-5xl">🏆</div>
            </div>
          </div>
          <div className="bg-black/40 backdrop-blur-lg rounded-xl border border-purple-500/30 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-300 text-sm uppercase mb-1">Total Matches</p>
                <p className="text-4xl font-bold text-white">{matches.length}</p>
              </div>
              <div className="text-5xl">⚔️</div>
            </div>
          </div>
          <div className="bg-black/40 backdrop-blur-lg rounded-xl border border-purple-500/30 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-300 text-sm uppercase mb-1">Championship Status</p>
                <p className="text-2xl font-bold text-white">{selectedChampionship?.status || 'N/A'}</p>
              </div>
              <div className="text-5xl">📊</div>
            </div>
          </div>
        </div>
      </section>

      {/* Rest of the sections remain the same as before */}
      {/* Teams, Matches, Players sections... */}
      
    </div>
  );
}
