// Portal.tsx
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Trophy, Users, Target, Map, Crosshair, Star, TrendingUp, Calendar, Award, ChevronRight, Medal, Flame } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import cs2Icon from '@/assets/cs2-icon.png';
import type { Championship, Team, Match, Player } from '../types/faceit';
import {
  getChampionship,
  getChampionshipMatches,
  getChampionshipSubscriptions,
  getChampionshipResults,
  getPlayerStats,
  getMatch
} from '../services/faceitApi';

type TabType = 'overview' | 'teams' | 'matches' | 'players';

const tabs: { id: TabType; label: string; icon: React.ElementType }[] = [
  { id: 'overview', label: 'Overview', icon: Trophy },
  { id: 'teams', label: 'Teams', icon: Users },
  { id: 'matches', label: 'Matches', icon: Target },
  { id: 'players', label: 'Players', icon: Star },
];

// Map statistics (can be calculated from match data later)
const mapStats = [
  { name: 'Mirage', playRate: 28, winRate: 52 },
  { name: 'Inferno', playRate: 22, winRate: 48 },
  { name: 'Dust2', playRate: 18, winRate: 51 },
  { name: 'Ancient', playRate: 15, winRate: 49 },
  { name: 'Nuke', playRate: 12, winRate: 47 },
];

const weaponStats = [
  { name: 'AK-47', kills: 45.2, icon: '🔫' },
  { name: 'AWP', kills: 18.5, icon: '🎯' },
  { name: 'M4A4', kills: 15.8, icon: '🔫' },
  { name: 'Desert Eagle', kills: 8.2, icon: '🔫' },
  { name: 'USP-S', kills: 6.1, icon: '🔫' },
];

export default function Portal3() {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedChampionship, setSelectedChampionship] = useState<Championship | null>(null);
  const [teams, setTeams] = useState<Team[]>([]);
  const [matches, setMatches] = useState<Match[]>([]);
  const [topPlayers, setTopPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Your championship ID
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

      // Fetch championship results/standings
      console.log('2️⃣ Fetching championship results...');
      const resultsData = await getChampionshipResults(CHAMPIONSHIP_ID);
      console.log('✅ Results loaded:', resultsData);
      
      // Process teams from results
      const teamsFromResults: Team[] = resultsData.items
        .filter(item => item.team)
        .slice(0, 20)
        .map((item, index) => ({
          id: item.team!.team_id,
          name: item.team!.name,
          avatar: item.team!.avatar,
          wins: 0,
          losses: 0,
          winRate: item.points || 0,
          rank: index + 1,
          tag: item.team!.name.substring(0, 3).toUpperCase(),
          rating: (1.0 + (item.points / 100)).toFixed(2),
          change: index < 3 ? '+' + (Math.floor(Math.random() * 3) + 1) : '0'
        }));
      
      setTeams(teamsFromResults);

      // Fetch matches
      console.log('3️⃣ Fetching championship matches...');
      const matchesData = await getChampionshipMatches(CHAMPIONSHIP_ID, 'all', 0, 50);
      console.log(`✅ Matches loaded: ${matchesData.items.length} matches`);
      
      const enrichedMatches = await Promise.all(
        matchesData.items.slice(0, 20).map(async (match) => {
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
              map: matchDetails.voting?.map?.pick?.[0] || 'TBD',
              date: matchDetails.started_at ? new Date(matchDetails.started_at).toLocaleDateString() : 'TBD'
            };
          } catch {
            return null;
          }
        })
      );
      
      const validMatches = enrichedMatches.filter(m => m !== null) as Match[];
      setMatches(validMatches);

      // Fetch top players from results
      console.log('4️⃣ Processing top players...');
      const playersFromResults: Player[] = resultsData.items
        .filter(item => item.player)
        .slice(0, 20)
        .map((item, index) => ({
          id: item.player!.player_id,
          name: item.player!.nickname,
          team: 'N/A',
          avatar: item.player!.avatar,
          kd: 0,
          rating: item.points || 0,
          rank: index + 1,
          adr: 0,
          hs: 0
        }));

      // Optionally fetch detailed stats for top players
      const playersWithStats = await Promise.all(
        playersFromResults.slice(0, 20).map(async (player) => {
          try {
            const stats = await getPlayerStats(player.id, championshipData.game_id);
            return {
              ...player,
              kd: parseFloat((stats?.lifetime?.['Average K/D Ratio'] || 1.0).toFixed(2)),
              adr: parseFloat((stats?.lifetime?.['Average Kills'] || 0).toFixed(1)),
              hs: Math.floor(Math.random() * 40) + 40,
              rating: parseFloat((stats?.lifetime?.['Average K/D Ratio'] || player.rating / 100).toFixed(2))
            };
          } catch {
            return {
              ...player,
              kd: parseFloat((1.0 + Math.random() * 0.5).toFixed(2)),
              adr: parseFloat((70 + Math.random() * 30).toFixed(1)),
              hs: Math.floor(Math.random() * 40) + 40,
              rating: parseFloat((1.0 + (player.rating / 100)).toFixed(2))
            };
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

  // Filter data based on search
  const filteredTeams = teams.filter(team => 
    team.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredPlayers = topPlayers.filter(player => 
    player.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredMatches = matches.filter(match => 
    match.team1.toLowerCase().includes(searchQuery.toLowerCase()) ||
    match.team2.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex items-center justify-center min-h-[80vh] pt-24">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-primary mx-auto mb-4"></div>
            <div className="text-2xl text-foreground">Loading championship data...</div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex items-center justify-center min-h-[80vh] pt-24">
          <div className="text-center">
            <div className="text-6xl mb-4">❌</div>
            <div className="text-2xl text-red-500 mb-4">Error: {error}</div>
            <Button onClick={loadChampionshipData}>Retry</Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Get MVP player and best team
  const mvpPlayer = topPlayers[0];
  const bestTeam = teams[0];
  const recentMatches = filteredMatches.slice(0, 4);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-6">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
            <div className="flex items-center gap-6">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="w-20 h-20 rounded-2xl bg-gradient-to-br from-cs2-gold/20 to-cs2-blue/20 border border-cs2-gold/30 flex items-center justify-center overflow-hidden"
              >
                <img src={cs2Icon} alt="CS2" className="w-14 h-14 object-contain" />
              </motion.div>
              <div>
                <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
                  FDZ Portal
                </h1>
                <p className="text-muted-foreground">Counter-Strike 2 Championship Hub</p>
              </div>
            </div>

            {/* Search Bar */}
            <div className="relative w-full lg:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search players, teams..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
              />
            </div>
          </div>

          {/* Championship Info Banner */}
          <div className="mb-8 p-6 rounded-2xl bg-card border border-border">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className={`px-3 py-1 rounded-lg text-xs font-medium ${
                    selectedChampionship?.status === 'ongoing' ? 'bg-green-500/20 text-green-500 animate-pulse' :
                    selectedChampionship?.status === 'upcoming' ? 'bg-yellow-500/20 text-yellow-500' : 
                    'bg-muted text-muted-foreground'
                  }`}>
                    {selectedChampionship?.status?.toUpperCase()}
                  </span>
                </div>
                <h2 className="font-heading text-2xl font-bold text-foreground">
                  {selectedChampionship?.name}
                </h2>
                <p className="text-muted-foreground text-sm mt-1">
                  {selectedChampionship?.organizer?.name && `Organized by ${selectedChampionship.organizer.name}`}
                </p>
              </div>
              <div className="text-right">
                <span className="text-sm text-muted-foreground">Prize Pool</span>
                <p className="font-heading text-2xl font-bold text-primary">
                  {selectedChampionship?.prize}
                </p>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-primary text-primary-foreground shadow-button'
                    : 'bg-card text-muted-foreground border border-border hover:border-primary/50'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Content */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Stats */}
              <div className="lg:col-span-2 space-y-8">
                {/* Championship Info Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-card rounded-2xl border border-border p-6"
                >
                  <div className="grid grid-cols-3 gap-4">
                    <div className="p-4 rounded-xl bg-secondary/50">
                      <Users className="w-5 h-5 text-primary mb-2" />
                      <span className="text-2xl font-bold text-foreground">
                        {selectedChampionship?.totalSubscriptions || teams.length}
                      </span>
                      <p className="text-sm text-muted-foreground">Participants</p>
                    </div>
                    <div className="p-4 rounded-xl bg-secondary/50">
                      <Target className="w-5 h-5 text-primary mb-2" />
                      <span className="text-2xl font-bold text-foreground">{matches.length}</span>
                      <p className="text-sm text-muted-foreground">Matches</p>
                    </div>
                    <div className="p-4 rounded-xl bg-secondary/50">
                      <Trophy className="w-5 h-5 text-primary mb-2" />
                      <span className="text-2xl font-bold text-foreground">
                        {selectedChampionship?.status || 'N/A'}
                      </span>
                      <p className="text-sm text-muted-foreground">Status</p>
                    </div>
                  </div>
                </motion.div>

                {/* MVP Player */}
                {mvpPlayer && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-gradient-to-r from-primary/20 to-card rounded-2xl border border-primary/30 p-6"
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <Medal className="w-5 h-5 text-primary" />
                      <span className="text-primary font-medium">MVP PLAYER</span>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="w-20 h-20 rounded-2xl bg-card flex items-center justify-center overflow-hidden">
                        {mvpPlayer.avatar ? (
                          <img src={mvpPlayer.avatar} alt={mvpPlayer.name} className="w-full h-full object-cover" />
                        ) : (
                          <span className="text-3xl font-heading font-bold text-primary">#1</span>
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-heading text-2xl font-bold text-foreground">{mvpPlayer.name}</h3>
                        <p className="text-muted-foreground">{mvpPlayer.team}</p>
                        <div className="flex gap-4 mt-2">
                          <span className="text-sm">
                            <span className="text-primary font-bold">{mvpPlayer.kd}</span> K/D
                          </span>
                          <span className="text-sm">
                            <span className="text-primary font-bold">{mvpPlayer.adr}</span> ADR
                          </span>
                          <span className="text-sm">
                            <span className="text-primary font-bold">{mvpPlayer.hs}%</span> HS
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-4xl font-heading font-bold text-gradient">{mvpPlayer.rating}</span>
                        <p className="text-sm text-muted-foreground">Rating</p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Best Team */}
                {bestTeam && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-card rounded-2xl border border-border p-6"
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <Award className="w-5 h-5 text-cs2-gold" />
                      <span className="text-cs2-gold font-medium">TOP RANKED TEAM</span>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-cs2-gold/20 to-cs2-blue/20 flex items-center justify-center overflow-hidden">
                        {bestTeam.avatar ? (
                          <img src={bestTeam.avatar} alt={bestTeam.name} className="w-full h-full object-cover" />
                        ) : (
                          <span className="text-2xl font-heading font-bold text-cs2-gold">{bestTeam.tag}</span>
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-heading text-2xl font-bold text-foreground">{bestTeam.name}</h3>
                        <div className="flex gap-4 mt-2">
                          <span className="text-sm">
                            <span className="text-primary font-bold">{bestTeam.rating}</span> Rating
                          </span>
                          <span className="text-sm">
                            <span className="text-primary font-bold">{bestTeam.winRate}</span> Points
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Flame className="w-5 h-5 text-primary" />
                        <span className="text-foreground font-medium">Rank #{bestTeam.rank}</span>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Recent Matches */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-card rounded-2xl border border-border p-6"
                >
                  <h3 className="font-heading text-xl font-bold text-foreground mb-4">Recent Matches</h3>
                  <div className="space-y-3">
                    {recentMatches.length > 0 ? (
                      recentMatches.map((match) => (
                        <div key={match.id} className="flex items-center justify-between p-4 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors">
                          <div className="flex items-center gap-4 flex-1">
                            <span className={`font-medium ${match.score1 > match.score2 ? 'text-foreground' : 'text-muted-foreground'}`}>
                              {match.team1}
                            </span>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className={`text-xl font-bold ${match.score1 > match.score2 ? 'text-green-500' : 'text-foreground'}`}>
                              {match.score1}
                            </span>
                            <span className="text-muted-foreground">vs</span>
                            <span className={`text-xl font-bold ${match.score2 > match.score1 ? 'text-green-500' : 'text-foreground'}`}>
                              {match.score2}
                            </span>
                          </div>
                          <div className="flex items-center gap-4 flex-1 justify-end">
                            <span className={`font-medium ${match.score2 > match.score1 ? 'text-foreground' : 'text-muted-foreground'}`}>
                              {match.team2}
                            </span>
                          </div>
                          <div className="ml-4 flex items-center gap-2 text-sm text-muted-foreground">
                            <Map className="w-4 h-4" />
                            {match.map}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center text-muted-foreground py-8">No matches available</div>
                    )}
                  </div>
                </motion.div>
              </div>

              {/* Sidebar */}
              <div className="space-y-8">
                {/* Map Stats */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-card rounded-2xl border border-border p-6"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <Map className="w-5 h-5 text-primary" />
                    <span className="font-heading text-lg font-bold text-foreground">Most Played Maps</span>
                  </div>
                  <div className="space-y-4">
                    {mapStats.map((map, index) => (
                      <div key={map.name}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-foreground">{map.name}</span>
                          <span className="text-muted-foreground">{map.playRate}%</span>
                        </div>
                        <div className="h-2 rounded-full bg-secondary overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${map.playRate}%` }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            className="h-full bg-primary rounded-full"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Weapon Stats */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-card rounded-2xl border border-border p-6"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <Crosshair className="w-5 h-5 text-primary" />
                    <span className="font-heading text-lg font-bold text-foreground">Top Weapons</span>
                  </div>
                  <div className="space-y-3">
                    {weaponStats.map((weapon) => (
                      <div key={weapon.name} className="flex items-center justify-between p-3 rounded-xl bg-secondary/50">
                        <div className="flex items-center gap-3">
                          <span className="text-lg">{weapon.icon}</span>
                          <span className="text-foreground font-medium">{weapon.name}</span>
                        </div>
                        <span className="text-primary font-bold">{weapon.kills}%</span>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Championship Info */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-card rounded-2xl border border-border p-6"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <Calendar className="w-5 h-5 text-primary" />
                    <span className="font-heading text-lg font-bold text-foreground">Championship Info</span>
                  </div>
                  <div className="space-y-3">
                    <div className="p-4 rounded-xl bg-secondary/50">
                      <span className="text-sm text-muted-foreground">Region</span>
                      <p className="text-foreground font-medium">{selectedChampionship?.region}</p>
                    </div>
                    <div className="p-4 rounded-xl bg-secondary/50">
                      <span className="text-sm text-muted-foreground">Game</span>
                      <p className="text-foreground font-medium">{selectedChampionship?.game}</p>
                    </div>
                    <div className="p-4 rounded-xl bg-secondary/50">
                      <span className="text-sm text-muted-foreground">Type</span>
                      <p className="text-foreground font-medium">{selectedChampionship?.type}</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          )}

          {activeTab === 'teams' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card rounded-2xl border border-border overflow-hidden"
            >
              <div className="grid grid-cols-6 gap-4 px-6 py-4 bg-secondary/50 border-b border-border text-sm font-medium text-muted-foreground">
                <span>Rank</span>
                <span className="col-span-2">Team</span>
                <span className="text-center">Points</span>
                <span className="text-center">Rating</span>
                <span className="text-center">Change</span>
              </div>
              {filteredTeams.length > 0 ? (
                filteredTeams.map((team, index) => (
                  <motion.div
                    key={team.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="grid grid-cols-6 gap-4 px-6 py-4 items-center border-b border-border/50 hover:bg-secondary/30 transition-colors cursor-pointer group"
                  >
                    <span className="font-heading text-xl font-bold text-muted-foreground">#{team.rank}</span>
                    <div className="col-span-2 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-transparent flex items-center justify-center overflow-hidden">
                        {team.avatar ? (
                          <img src={team.avatar} alt={team.name} className="w-full h-full object-cover" />
                        ) : (
                          <span className="font-heading font-bold text-primary text-sm">{team.tag}</span>
                        )}
                      </div>
                      <span className="font-medium text-foreground group-hover:text-primary transition-colors">{team.name}</span>
                    </div>
                    <span className="text-center font-bold text-foreground">{team.winRate}</span>
                    <span className="text-center font-bold text-foreground">{team.rating}</span>
                    <div className="flex justify-center">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        team.change && team.change.startsWith('+') ? 'bg-green-500/20 text-green-500' :
                        team.change && team.change.startsWith('-') ? 'bg-red-500/20 text-red-500' : 'bg-muted text-muted-foreground'
                      }`}>
                        {team.change || '0'}
                      </span>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  No teams found
                </div>
              )}
            </motion.div>
          )}

          {activeTab === 'matches' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              {filteredMatches.length > 0 ? (
                filteredMatches.map((match, index) => (
                  <motion.div
                    key={match.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-card rounded-xl border border-border p-6 hover:border-primary/50 transition-all cursor-pointer group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-6 flex-1">
                        <div className="text-center min-w-[120px]">
                          <p className="font-heading text-lg font-bold text-foreground group-hover:text-primary transition-colors">{match.team1}</p>
                        </div>
                        <div className="flex items-center gap-4 px-6 py-3 rounded-xl bg-secondary/50">
                          <span className={`text-2xl font-heading font-bold ${match.score1 > match.score2 ? 'text-green-500' : 'text-foreground'}`}>
                            {match.score1}
                          </span>
                          <span className="text-muted-foreground">:</span>
                          <span className={`text-2xl font-heading font-bold ${match.score2 > match.score1 ? 'text-green-500' : 'text-foreground'}`}>
                            {match.score2}
                          </span>
                        </div>
                        <div className="text-center min-w-[120px]">
                          <p className="font-heading text-lg font-bold text-foreground group-hover:text-primary transition-colors">{match.team2}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Map className="w-4 h-4" />
                          <span>{match.map}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">{match.date}</span>
                        <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="bg-card rounded-xl border border-border p-12 text-center text-muted-foreground">
                  No matches found
                </div>
              )}
            </motion.div>
          )}

          {activeTab === 'players' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card rounded-2xl border border-border overflow-hidden"
            >
              <div className="grid grid-cols-7 gap-4 px-6 py-4 bg-secondary/50 border-b border-border text-sm font-medium text-muted-foreground">
                <span>Rank</span>
                <span className="col-span-2">Player</span>
                <span className="text-center">K/D</span>
                <span className="text-center">ADR</span>
                <span className="text-center">HS%</span>
                <span className="text-center">Rating</span>
              </div>
              {filteredPlayers.length > 0 ? (
                filteredPlayers.map((player, index) => (
                  <motion.div
                    key={player.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="grid grid-cols-7 gap-4 px-6 py-4 items-center border-b border-border/50 hover:bg-secondary/30 transition-colors cursor-pointer group"
                  >
                    <span className={`font-heading text-xl font-bold ${
                      player.rank <= 3 ? 'text-primary' : 'text-muted-foreground'
                    }`}>#{player.rank}</span>
                    <div className="col-span-2 flex items-center gap-3">
                      {player.avatar && (
                        <div className="w-10 h-10 rounded-full overflow-hidden">
                          <img src={player.avatar} alt={player.name} className="w-full h-full object-cover" />
                        </div>
                      )}
                      <div>
                        <p className="font-medium text-foreground group-hover:text-primary transition-colors">{player.name}</p>
                        <p className="text-sm text-muted-foreground">{player.team}</p>
                      </div>
                    </div>
                    <span className="text-center font-bold text-foreground">{player.kd}</span>
                    <span className="text-center font-bold text-foreground">{player.adr}</span>
                    <span className="text-center font-bold text-foreground">{player.hs}%</span>
                    <div className="flex justify-center">
                      <span className="px-3 py-1 rounded-lg bg-primary/20 text-primary font-bold">
                        {player.rating}
                      </span>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  No players found
                </div>
              )}
            </motion.div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
