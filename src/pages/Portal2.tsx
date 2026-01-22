import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Trophy, Users, Target, Map, Crosshair, Star, TrendingUp, Calendar, Award, ChevronRight, Medal, Flame } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import cs2Icon from '@/assets/cs2-icon.png';

type TabType = 'overview' | 'teams' | 'matches' | 'players';

const tabs: { id: TabType; label: string; icon: React.ElementType }[] = [
  { id: 'overview', label: 'Overview', icon: Trophy },
  { id: 'teams', label: 'Teams', icon: Users },
  { id: 'matches', label: 'Matches', icon: Target },
  { id: 'players', label: 'Players', icon: Star },
];

const tournaments = [
  { id: 1, name: 'DZ Pro League Season 1', status: 'Live', teams: 16, prize: '500,000 DZD' },
  { id: 2, name: 'USTHB Open Cup', status: 'Upcoming', teams: 32, prize: '200,000 DZD' },
  { id: 3, name: 'Game Sphere Invitational', status: 'Completed', teams: 8, prize: '150,000 DZD' },
];

const cs2Teams = [
  { rank: 1, name: 'Team PHOENIX', tag: 'PHX', wins: 24, losses: 3, rating: 1.42, change: '+2' },
  { rank: 2, name: 'Wolves Gaming', tag: 'WLV', wins: 22, losses: 5, rating: 1.38, change: '+1' },
  { rank: 3, name: 'Desert Eagles', tag: 'DSE', wins: 20, losses: 7, rating: 1.31, change: '-1' },
  { rank: 4, name: 'Atlas Esports', tag: 'ATL', wins: 19, losses: 8, rating: 1.28, change: '0' },
  { rank: 5, name: 'Nova Force', tag: 'NVF', wins: 18, losses: 9, rating: 1.25, change: '+3' },
  { rank: 6, name: 'Thunder Strike', tag: 'THS', wins: 17, losses: 10, rating: 1.22, change: '-2' },
  { rank: 7, name: 'Sahara Squad', tag: 'SAH', wins: 16, losses: 11, rating: 1.19, change: '+1' },
  { rank: 8, name: 'Medina Crew', tag: 'MDN', wins: 15, losses: 12, rating: 1.15, change: '-1' },
];

const recentMatches = [
  { id: 1, team1: 'Team PHOENIX', team2: 'Wolves Gaming', score1: 16, score2: 12, map: 'Mirage', date: 'Today' },
  { id: 2, team1: 'Desert Eagles', team2: 'Atlas Esports', score1: 13, score2: 16, map: 'Inferno', date: 'Today' },
  { id: 3, team1: 'Nova Force', team2: 'Thunder Strike', score1: 16, score2: 9, map: 'Dust2', date: 'Yesterday' },
  { id: 4, team1: 'Sahara Squad', team2: 'Medina Crew', score1: 16, score2: 14, map: 'Ancient', date: 'Yesterday' },
];

const topPlayers = [
  { rank: 1, name: 'ENNY-K', team: 'Team PHOENIX', kd: 1.52, adr: 98.4, hs: 58, rating: 1.48 },
  { rank: 2, name: 'MAHI_DZ', team: 'Wolves Gaming', kd: 1.45, adr: 92.1, hs: 52, rating: 1.42 },
  { rank: 3, name: 'NAPS__', team: 'Desert Eagles', kd: 1.38, adr: 88.6, hs: 61, rating: 1.36 },
  { rank: 4, name: 'DADY', team: 'Atlas Esports', kd: 1.35, adr: 85.2, hs: 48, rating: 1.32 },
  { rank: 5, name: 'ZeRo_DZ', team: 'Nova Force', kd: 1.31, adr: 82.8, hs: 55, rating: 1.29 },
];

const recentEvents = [
  { name: 'Game Sphere USTHB', winner: 'Fifteen Average', date: 'Jan 2025' },
  { name: 'DZ Winter Cup', winner: 'Team PHOENIX', date: 'Dec 2024' },
  { name: 'Novacore Showdown', winner: 'Wolves Gaming', date: 'Nov 2024' },
];

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

export default function Portal2() {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTournament, setSelectedTournament] = useState(tournaments[0]);

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
                <p className="text-muted-foreground">Counter-Strike 2 Tournament Hub</p>
              </div>
            </div>

            {/* Search Bar */}
            <div className="relative w-full lg:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search players, teams, tournaments..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
              />
            </div>
          </div>

          {/* Tournament Selector */}
          <div className="flex flex-wrap gap-3 mb-8">
            {tournaments.map((tournament) => (
              <button
                key={tournament.id}
                onClick={() => setSelectedTournament(tournament)}
                className={`px-4 py-2 rounded-lg border transition-all duration-300 ${
                  selectedTournament.id === tournament.id
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-card text-muted-foreground border-border hover:border-primary/50'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${
                    tournament.status === 'Live' ? 'bg-green-500 animate-pulse' :
                    tournament.status === 'Upcoming' ? 'bg-yellow-500' : 'bg-muted-foreground'
                  }`} />
                  {tournament.name}
                </div>
              </button>
            ))}
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
                {/* Tournament Info Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-card rounded-2xl border border-border p-6"
                >
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          selectedTournament.status === 'Live' ? 'bg-green-500/20 text-green-500' :
                          selectedTournament.status === 'Upcoming' ? 'bg-yellow-500/20 text-yellow-500' : 'bg-muted text-muted-foreground'
                        }`}>
                          {selectedTournament.status}
                        </span>
                      </div>
                      <h2 className="font-heading text-2xl font-bold text-foreground">
                        {selectedTournament.name}
                      </h2>
                    </div>
                    <div className="text-right">
                      <span className="text-sm text-muted-foreground">Prize Pool</span>
                      <p className="font-heading text-2xl font-bold text-primary">{selectedTournament.prize}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="p-4 rounded-xl bg-secondary/50">
                      <Users className="w-5 h-5 text-primary mb-2" />
                      <span className="text-2xl font-bold text-foreground">{selectedTournament.teams}</span>
                      <p className="text-sm text-muted-foreground">Teams</p>
                    </div>
                    <div className="p-4 rounded-xl bg-secondary/50">
                      <Target className="w-5 h-5 text-primary mb-2" />
                      <span className="text-2xl font-bold text-foreground">48</span>
                      <p className="text-sm text-muted-foreground">Matches</p>
                    </div>
                    <div className="p-4 rounded-xl bg-secondary/50">
                      <Trophy className="w-5 h-5 text-primary mb-2" />
                      <span className="text-2xl font-bold text-foreground">Round 4</span>
                      <p className="text-sm text-muted-foreground">Current Stage</p>
                    </div>
                  </div>
                </motion.div>

                {/* MVP Player */}
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
                    <div className="w-20 h-20 rounded-2xl bg-card flex items-center justify-center text-3xl font-heading font-bold text-primary">
                      #1
                    </div>
                    <div className="flex-1">
                      <h3 className="font-heading text-2xl font-bold text-foreground">ENNY-K</h3>
                      <p className="text-muted-foreground">Team PHOENIX</p>
                      <div className="flex gap-4 mt-2">
                        <span className="text-sm"><span className="text-primary font-bold">1.52</span> K/D</span>
                        <span className="text-sm"><span className="text-primary font-bold">98.4</span> ADR</span>
                        <span className="text-sm"><span className="text-primary font-bold">58%</span> HS</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-4xl font-heading font-bold text-gradient">1.48</span>
                      <p className="text-sm text-muted-foreground">Rating</p>
                    </div>
                  </div>
                </motion.div>

                {/* Best Team */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-card rounded-2xl border border-border p-6"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <Award className="w-5 h-5 text-cs2-gold" />
                    <span className="text-cs2-gold font-medium">BEST TEAM</span>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-cs2-gold/20 to-cs2-blue/20 flex items-center justify-center">
                      <span className="text-2xl font-heading font-bold text-cs2-gold">PHX</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-heading text-2xl font-bold text-foreground">Team PHOENIX</h3>
                      <div className="flex gap-4 mt-2">
                        <span className="text-sm"><span className="text-green-500 font-bold">24</span> Wins</span>
                        <span className="text-sm"><span className="text-red-500 font-bold">3</span> Losses</span>
                        <span className="text-sm"><span className="text-primary font-bold">88.9%</span> Win Rate</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Flame className="w-5 h-5 text-primary" />
                      <span className="text-foreground font-medium">12 Win Streak</span>
                    </div>
                  </div>
                </motion.div>

                {/* Recent Matches */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-card rounded-2xl border border-border p-6"
                >
                  <h3 className="font-heading text-xl font-bold text-foreground mb-4">Recent Matches</h3>
                  <div className="space-y-3">
                    {recentMatches.map((match) => (
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
                    ))}
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

                {/* Recent Events */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-card rounded-2xl border border-border p-6"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <Calendar className="w-5 h-5 text-primary" />
                    <span className="font-heading text-lg font-bold text-foreground">Recent Events</span>
                  </div>
                  <div className="space-y-3">
                    {recentEvents.map((event, index) => (
                      <div key={index} className="p-4 rounded-xl bg-secondary/50 border border-border/50">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-foreground font-medium">{event.name}</span>
                          <span className="text-xs text-muted-foreground">{event.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Trophy className="w-4 h-4 text-cs2-gold" />
                          <span className="text-sm text-muted-foreground">Winner:</span>
                          <span className="text-sm text-primary font-medium">{event.winner}</span>
                        </div>
                      </div>
                    ))}
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
                <span className="text-center">W/L</span>
                <span className="text-center">Rating</span>
                <span className="text-center">Change</span>
              </div>
              {cs2Teams.map((team, index) => (
                <motion.div
                  key={team.rank}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="grid grid-cols-6 gap-4 px-6 py-4 items-center border-b border-border/50 hover:bg-secondary/30 transition-colors cursor-pointer group"
                >
                  <span className="font-heading text-xl font-bold text-muted-foreground">#{team.rank}</span>
                  <div className="col-span-2 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-transparent flex items-center justify-center">
                      <span className="font-heading font-bold text-primary text-sm">{team.tag}</span>
                    </div>
                    <span className="font-medium text-foreground group-hover:text-primary transition-colors">{team.name}</span>
                  </div>
                  <div className="text-center">
                    <span className="text-green-500 font-medium">{team.wins}</span>
                    <span className="text-muted-foreground">/</span>
                    <span className="text-red-500 font-medium">{team.losses}</span>
                  </div>
                  <span className="text-center font-bold text-foreground">{team.rating}</span>
                  <div className="flex justify-center">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      team.change.startsWith('+') ? 'bg-green-500/20 text-green-500' :
                      team.change.startsWith('-') ? 'bg-red-500/20 text-red-500' : 'bg-muted text-muted-foreground'
                    }`}>
                      {team.change}
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {activeTab === 'matches' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              {recentMatches.concat(recentMatches).map((match, index) => (
                <motion.div
                  key={`${match.id}-${index}`}
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
              ))}
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
              {topPlayers.concat(topPlayers).map((player, index) => (
                <motion.div
                  key={`${player.rank}-${index}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="grid grid-cols-7 gap-4 px-6 py-4 items-center border-b border-border/50 hover:bg-secondary/30 transition-colors cursor-pointer group"
                >
                  <span className={`font-heading text-xl font-bold ${
                    player.rank <= 3 ? 'text-primary' : 'text-muted-foreground'
                  }`}>#{player.rank}</span>
                  <div className="col-span-2">
                    <p className="font-medium text-foreground group-hover:text-primary transition-colors">{player.name}</p>
                    <p className="text-sm text-muted-foreground">{player.team}</p>
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
              ))}
            </motion.div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
