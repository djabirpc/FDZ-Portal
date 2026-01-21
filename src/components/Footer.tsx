import { Link } from 'react-router-dom';
import { Zap, Twitter, Instagram, Youtube, MessageCircle } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                <Zap className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="font-heading text-2xl font-bold text-foreground">
                FDZ
              </span>
            </Link>
            <p className="text-muted-foreground max-w-md mb-6">
              The platform Algeria's esports scene deserves. Running structured tournaments, 
              leagues and data-driven tools for Counter-Strike 2 and Valorant.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all">
                <Youtube className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all">
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-lg font-bold text-foreground mb-4">Platform</h4>
            <ul className="space-y-3">
              <li><Link to="/portal" className="text-muted-foreground hover:text-primary transition-colors">FDZ Portal</Link></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Tournaments</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Leagues</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Rankings</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-heading text-lg font-bold text-foreground mb-4">Company</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">About Us</a></li>
              <li><Link to="/sponsorship" className="text-muted-foreground hover:text-primary transition-colors">Partnerships</Link></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Contact</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Press Kit</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            © 2025 FDZ. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
