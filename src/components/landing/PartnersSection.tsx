import { motion } from 'framer-motion';

const partners = [
  'Mouloudia Club d\'Alger',
  'Novacore',
  'Stream',
  'Leetify',
  'WTFast',
  'Fifteen Average',
  'Institut Français',
  'Game Sphere',
  'AGI Galaxy',
  'FACEIT',
  'USTHB',
];

export function PartnersSection() {
  return (
    <section className="py-20 bg-card/50 border-y border-border/50 overflow-hidden">
      <div className="container mx-auto px-6 mb-12">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-muted-foreground text-sm uppercase tracking-widest"
        >
          Trusted by leading organizations
        </motion.p>
      </div>

      {/* Scrolling logos */}
      <div className="relative">
        <div className="flex animate-[scroll_30s_linear_infinite]">
          {[...partners, ...partners].map((partner, index) => (
            <div
              key={index}
              className="flex-shrink-0 px-12 flex items-center justify-center"
            >
              <span className="font-heading text-xl md:text-2xl font-bold text-muted-foreground/50 hover:text-foreground transition-colors duration-300 whitespace-nowrap">
                {partner}
              </span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
