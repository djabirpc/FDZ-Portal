import { motion } from 'framer-motion';
import { ArrowRight, TrendingUp, Award, Target } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const topPlayers = [
  { rank: 1, name: 'ENNY-K', level: 10, winStreak: '+2', prize: '10,000 DZD' },
  { rank: 2, name: 'MAHI_DZ', level: 10, winStreak: '0', prize: '8000 DZD' },
  { rank: 3, name: 'NAPS__', level: 10, winStreak: '+7 🔥', prize: '5000 DZD' },
  { rank: 4, name: 'DADY', level: 10, winStreak: '+10 🔥', prize: '300 FP' },
  { rank: 5, name: 'zz3xyDyD~', level: 9, winStreak: '+8', prize: '150 FP' },
];

export function PortalPreview() {
  return (
    <section className="py-32 bg-background relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-glow opacity-30" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Stats Preview Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-2 lg:order-1"
          >
            <div className="relative">
              {/* Decorative gradient */}
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-transparent rounded-3xl blur-xl" />
              
              <div className="relative bg-card rounded-2xl border border-border/50 overflow-hidden shadow-card">
                {/* Header bar */}
                <div className="bg-gradient-to-r from-primary/30 to-primary/10 px-6 py-4 border-b border-border/50">
                  <div className="flex items-center gap-4">
                    <span className="text-primary font-medium text-sm">#</span>
                    <span className="flex-1 text-primary font-medium text-sm">Player</span>
                    <span className="text-primary font-medium text-sm w-16 text-center">Level</span>
                    <span className="text-primary font-medium text-sm w-20 text-center">Win Streak</span>
                    <span className="text-primary font-medium text-sm w-24 text-right">Prize</span>
                  </div>
                </div>
                
                {/* Player rows */}
                <div className="divide-y divide-border/30">
                  {topPlayers.map((player, index) => (
                    <motion.div
                      key={player.rank}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="px-6 py-4 flex items-center gap-4 hover:bg-card/50 transition-colors"
                    >
                      <span className="text-muted-foreground font-medium w-4">{player.rank}</span>
                      <div className="flex items-center gap-3 flex-1">
                        <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                          <span className="text-xs font-bold text-muted-foreground">
                            {player.name.charAt(0)}
                          </span>
                        </div>
                        <span className="text-foreground font-medium">{player.name}</span>
                      </div>
                      <div className="w-16 flex justify-center">
                        <span className="px-2 py-0.5 rounded bg-primary/20 text-primary text-sm font-medium">
                          +{player.level}
                        </span>
                      </div>
                      <span className={`w-20 text-center text-sm font-medium ${
                        player.winStreak.includes('🔥') ? 'text-primary' : 'text-muted-foreground'
                      }`}>
                        {player.winStreak}
                      </span>
                      <span className="w-24 text-right text-foreground font-medium text-sm">
                        {player.prize}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2"
          >
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-primary/20 border border-primary/30 text-primary text-sm font-medium mb-6">
              DATA & STATS
            </span>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-6">
              MEET DZ <span className="text-gradient">PORTAL</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Track player performance, team rankings and tournament results in real-time 
              on DZ PORTAL—the complete stats hub for Algerian Counter-Strike 2.
            </p>

            <div className="grid grid-cols-3 gap-4 mb-10">
              <div className="p-4 rounded-xl bg-card border border-border/50 text-center">
                <TrendingUp className="w-6 h-6 text-primary mx-auto mb-2" />
                <span className="text-sm text-muted-foreground">Live Stats</span>
              </div>
              <div className="p-4 rounded-xl bg-card border border-border/50 text-center">
                <Award className="w-6 h-6 text-primary mx-auto mb-2" />
                <span className="text-sm text-muted-foreground">Rankings</span>
              </div>
              <div className="p-4 rounded-xl bg-card border border-border/50 text-center">
                <Target className="w-6 h-6 text-primary mx-auto mb-2" />
                <span className="text-sm text-muted-foreground">Analytics</span>
              </div>
            </div>

            <Link to="/portal">
              <Button variant="hero" className="group">
                Discover DZ Portal
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
