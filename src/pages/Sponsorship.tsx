import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Star, Crown, Diamond, Sparkles, Tv, Shirt, Gift, Monitor, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

const tiers = [
  {
    id: 'silver',
    name: 'Silver',
    icon: Star,
    price: 'Starting at',
    priceValue: '50,000 DZD',
    gradient: 'from-gray-400 to-gray-600',
    borderColor: 'border-gray-500/30',
    bgGradient: 'from-gray-500/10 to-transparent',
    features: [
      { name: 'Logo on stream overlay', included: true, icon: Monitor },
      { name: 'Social media mentions', included: true, icon: Sparkles },
      { name: 'Logo on jersey', included: false, icon: Shirt },
      { name: 'Product giveaways', included: false, icon: Gift },
      { name: 'Portal integration', included: false, icon: Tv },
    ],
    description: 'Perfect for emerging brands looking to enter the Algerian esports market.',
  },
  {
    id: 'gold',
    name: 'Gold',
    icon: Crown,
    price: 'Starting at',
    priceValue: '150,000 DZD',
    gradient: 'from-yellow-400 to-amber-600',
    borderColor: 'border-yellow-500/50',
    bgGradient: 'from-yellow-500/20 to-transparent',
    popular: true,
    features: [
      { name: 'Logo on stream overlay', included: true, icon: Monitor },
      { name: 'Social media mentions', included: true, icon: Sparkles },
      { name: 'Logo on jersey', included: true, icon: Shirt },
      { name: 'Product giveaways', included: true, icon: Gift },
      { name: 'Portal integration', included: false, icon: Tv },
    ],
    description: 'The most popular choice for brands wanting comprehensive exposure.',
  },
  {
    id: 'diamond',
    name: 'Diamond',
    icon: Diamond,
    price: 'Custom',
    priceValue: 'Contact Us',
    gradient: 'from-cyan-400 via-blue-500 to-purple-600',
    borderColor: 'border-cyan-500/50',
    bgGradient: 'from-cyan-500/20 via-blue-500/10 to-purple-500/10',
    features: [
      { name: 'Logo on stream overlay', included: true, icon: Monitor },
      { name: 'Social media mentions', included: true, icon: Sparkles },
      { name: 'Logo on jersey', included: true, icon: Shirt },
      { name: 'Product giveaways', included: true, icon: Gift },
      { name: 'Portal integration', included: true, icon: Tv },
    ],
    description: 'Full partnership with maximum brand integration across all FDZ platforms.',
  },
];

const benefits = [
  {
    icon: Monitor,
    title: 'Stream Visibility',
    description: 'Your logo featured prominently during all live tournament broadcasts.',
  },
  {
    icon: Sparkles,
    title: 'Social Reach',
    description: 'Regular mentions across our social media channels reaching 50K+ followers.',
  },
  {
    icon: Shirt,
    title: 'Jersey Branding',
    description: 'Your logo on official team jerseys worn at all offline events.',
  },
  {
    icon: Gift,
    title: 'Giveaways',
    description: 'Product integration in community giveaways and prize pools.',
  },
  {
    icon: Tv,
    title: 'Portal Integration',
    description: 'Deep integration into FDZ Portal with branded stats and features.',
  },
];

export default function Sponsorship() {
  const [hoveredTier, setHoveredTier] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-32 pb-20">
        {/* Hero */}
        <section className="container mx-auto px-6 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-primary/20 border border-primary/30 text-primary text-sm font-medium mb-6">
              PARTNERSHIPS
            </span>
            <h1 className="font-heading text-5xl md:text-7xl font-bold text-foreground mb-6">
              PARTNER WITH <span className="text-gradient">FDZ</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Join Algeria's fastest-growing esports organization and reach thousands of 
              passionate gamers through our tournaments, streams, and community events.
            </p>
          </motion.div>
        </section>

        {/* Tiers */}
        <section className="container mx-auto px-6 mb-32">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {tiers.map((tier, index) => (
              <motion.div
                key={tier.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onMouseEnter={() => setHoveredTier(tier.id)}
                onMouseLeave={() => setHoveredTier(null)}
                className={`relative rounded-3xl border ${tier.borderColor} p-8 transition-all duration-500 ${
                  hoveredTier === tier.id ? 'scale-105 shadow-glow' : ''
                } ${tier.popular ? 'ring-2 ring-primary' : ''}`}
              >
                {/* Background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-b ${tier.bgGradient} rounded-3xl`} />

                {/* Popular badge */}
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-primary text-primary-foreground text-sm font-bold">
                    MOST POPULAR
                  </div>
                )}

                <div className="relative z-10">
                  {/* Icon */}
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${tier.gradient} flex items-center justify-center mb-6`}>
                    <tier.icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Name & Price */}
                  <h3 className="font-heading text-3xl font-bold text-foreground mb-2">
                    {tier.name}
                  </h3>
                  <div className="mb-6">
                    <span className="text-sm text-muted-foreground">{tier.price}</span>
                    <p className={`font-heading text-2xl font-bold bg-gradient-to-r ${tier.gradient} bg-clip-text text-transparent`}>
                      {tier.priceValue}
                    </p>
                  </div>

                  <p className="text-muted-foreground text-sm mb-8">
                    {tier.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-4 mb-8">
                    {tier.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                          feature.included ? 'bg-green-500/20 text-green-500' : 'bg-muted text-muted-foreground'
                        }`}>
                          {feature.included ? <Check className="w-3 h-3" /> : <span className="text-xs">—</span>}
                        </div>
                        <span className={feature.included ? 'text-foreground' : 'text-muted-foreground'}>
                          {feature.name}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <Button
                    variant={tier.popular ? 'hero' : 'outline'}
                    className="w-full group"
                  >
                    Get Started
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Benefits */}
        <section className="container mx-auto px-6 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-primary/20 border border-primary/30 text-primary text-sm font-medium mb-6">
              BENEFITS
            </span>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground">
              WHAT YOU <span className="text-gradient">GET</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-2xl bg-card border border-border/50 text-center hover:border-primary/50 transition-all duration-300 group"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/30 transition-colors">
                  <benefit.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-heading text-lg font-bold text-foreground mb-2">
                  {benefit.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative rounded-3xl overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-primary/10" />
            <div className="absolute inset-0 bg-glow" />
            
            <div className="relative z-10 p-12 md:p-20 text-center">
              <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-6">
                READY TO <span className="text-gradient">PARTNER?</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
                Let's discuss how we can create a custom partnership that achieves your marketing goals 
                while supporting the growth of Algerian esports.
              </p>
              <Button variant="hero" size="xl" className="group">
                Contact Our Team
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
