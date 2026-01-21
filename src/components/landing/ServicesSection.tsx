import { motion } from 'framer-motion';
import { ArrowRight, Trophy, Users, BarChart3, Tv } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const services = [
  {
    icon: Trophy,
    title: 'Tournaments & Events',
    subtitle: 'Online & Offline',
    description: 'FDZ runs regular online and offline tournaments for CS2 and Valorant, with clear formats, brackets and rules so teams know exactly what they play for.',
    features: ['Live Broadcast', 'Professional Production', 'Prize Pools'],
  },
  {
    icon: Users,
    title: 'Leagues & Seasons',
    subtitle: 'Structured Competition',
    description: 'Our leagues are built around seasons, divisions and promotion/relegation, giving teams a clear path to climb through consistent performance.',
    features: ['Division System', 'Playoff Spots', 'Recognition'],
  },
  {
    icon: BarChart3,
    title: 'Data & Stats',
    subtitle: 'Meet DZ Portal',
    description: 'Track player performance, team rankings and tournament results in real-time on DZ PORTAL—the complete stats hub for Algerian Counter-Strike 2.',
    features: ['Real-time Stats', 'Player Profiles', 'Team Analytics'],
  },
  {
    icon: Tv,
    title: 'Live Broadcasting',
    subtitle: 'Watch Every Match',
    description: 'From open cups to invite-only events, every competition is built to be watchable, shareable and rewarding for players and viewers.',
    features: ['HD Streaming', 'Commentary', 'Highlights'],
  },
];

export function ServicesSection() {
  return (
    <section className="py-32 bg-background">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="inline-flex items-center px-4 py-2 rounded-full bg-primary/20 border border-primary/30 text-primary text-sm font-medium mb-6">
            SERVICES
          </span>
          <h2 className="font-heading text-4xl md:text-6xl font-bold text-foreground">
            WHAT WE BRING TO
            <br />
            <span className="text-gradient">ESPORT</span>
          </h2>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative bg-card rounded-2xl border border-border/50 p-8 hover:border-primary/50 transition-all duration-500 overflow-hidden"
            >
              {/* Glow effect on hover */}
              <div className="absolute inset-0 bg-glow opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                <div className="flex items-start gap-6">
                  <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/30 transition-colors">
                    <service.icon className="w-7 h-7 text-primary" />
                  </div>
                  <div className="flex-1">
                    <span className="text-primary text-sm font-medium">{service.subtitle}</span>
                    <h3 className="font-heading text-2xl font-bold text-foreground mt-1 mb-4">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      {service.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {service.features.map((feature, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 rounded-full bg-secondary text-sm text-muted-foreground"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Link to="/portal">
            <Button variant="hero" className="group">
              View Upcoming Events
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
