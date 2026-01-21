import { motion } from 'framer-motion';
import { CheckCircle2, Circle, Clock, Rocket } from 'lucide-react';

const roadmapItems = [
  {
    phase: 'Phase 1',
    title: 'Foundation',
    status: 'completed',
    date: 'Q4 2024',
    items: [
      'Platform architecture design',
      'Core tournament system',
      'Basic stats tracking',
      'Community launch',
    ],
  },
  {
    phase: 'Phase 2',
    title: 'Portal Launch',
    status: 'current',
    date: 'Q1 2025',
    items: [
      'FDZ Portal beta release',
      'CS2 full integration',
      'Team & player profiles',
      'Live match tracking',
    ],
  },
  {
    phase: 'Phase 3',
    title: 'Expansion',
    status: 'upcoming',
    date: 'Q2 2025',
    items: [
      'Valorant integration',
      'Advanced analytics',
      'Mobile app launch',
      'API for partners',
    ],
  },
  {
    phase: 'Phase 4',
    title: 'Scale',
    status: 'future',
    date: 'Q3-Q4 2025',
    items: [
      'Regional expansion',
      'Pro league system',
      'Broadcasting studio',
      'Talent development',
    ],
  },
];

const statusIcons = {
  completed: CheckCircle2,
  current: Rocket,
  upcoming: Clock,
  future: Circle,
};

const statusColors = {
  completed: 'text-green-500 border-green-500/30 bg-green-500/10',
  current: 'text-primary border-primary/30 bg-primary/10',
  upcoming: 'text-muted-foreground border-border bg-card',
  future: 'text-muted-foreground/50 border-border/50 bg-card/50',
};

export function RoadmapSection() {
  return (
    <section className="py-32 bg-card/30">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="inline-flex items-center px-4 py-2 rounded-full bg-primary/20 border border-primary/30 text-primary text-sm font-medium mb-6">
            ROADMAP
          </span>
          <h2 className="font-heading text-4xl md:text-6xl font-bold text-foreground">
            OUR <span className="text-gradient">JOURNEY</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mt-6">
            Building the future of Algerian esports, one milestone at a time.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Connection line */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-1 bg-gradient-to-r from-green-500/50 via-primary to-border/50" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {roadmapItems.map((item, index) => {
              const StatusIcon = statusIcons[item.status as keyof typeof statusIcons];
              const colorClass = statusColors[item.status as keyof typeof statusColors];

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                  className="relative"
                >
                  {/* Timeline dot */}
                  <div className="hidden lg:flex absolute -top-4 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full border-4 border-background bg-card items-center justify-center z-10">
                    <StatusIcon className={`w-5 h-5 ${item.status === 'completed' ? 'text-green-500' : item.status === 'current' ? 'text-primary' : 'text-muted-foreground'}`} />
                  </div>

                  {/* Card */}
                  <div className={`lg:mt-16 p-6 rounded-2xl border ${colorClass} transition-all duration-300 hover:scale-105`}>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-xs font-bold uppercase tracking-wider opacity-70">
                        {item.phase}
                      </span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-background/50">
                        {item.date}
                      </span>
                    </div>
                    <h3 className="font-heading text-xl font-bold text-foreground mb-4">
                      {item.title}
                    </h3>
                    <ul className="space-y-2">
                      {item.items.map((listItem, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <div className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${
                            item.status === 'completed' ? 'bg-green-500' : 
                            item.status === 'current' ? 'bg-primary' : 'bg-muted-foreground/30'
                          }`} />
                          {listItem}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
