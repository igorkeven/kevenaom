import { Youtube, Twitter, Twitch, Disc } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const socialLinks = [
    { icon: Youtube, href: 'https://www.youtube.com/@kevenaom', name: 'YouTube' },
    { icon: Twitch, href: '#', name: 'Twitch' }, // ATUALIZE O LINK
    { icon: Twitter, href: '#', name: 'Twitter' }, // ATUALIZE O LINK
    { icon: Disc, href: '#', name: 'Discord' }, // ATUALIZE O LINK
  ];

  const navLinks = [
    { name: "Sobre", href: "#about" },
    { name: "Consultoria", href: "#consultoria" },
    { name: "Fórum", href: "/forum" },
    { name: "Replays", href: "/replays" },
  ];

  return (
    <footer className="bg-gradient-to-t from-background to-muted/20 border-t border-primary/10 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8 text-center md:text-left">
          {/* About */}
          <div>
            <h3 className="font-cinzel-decorative text-xl font-bold text-primary mb-4">Keven AOM</h3>
            <p className="font-inter text-muted-foreground text-sm max-w-xs mx-auto md:mx-0">
              O santuário definitivo para dominar Age of Mythology. Estratégias, replays e uma comunidade épica.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-cinzel text-lg font-semibold text-foreground mb-4">Navegação</h3>
            <ul className="space-y-2">
              {navLinks.map(link => (
                <li key={link.name}>
                  {link.href.startsWith('/') ? (
                    <Link to={link.href} className="font-inter text-sm text-muted-foreground hover:text-primary transition-colors">
                      {link.name}
                    </Link>
                  ) : (
                    <a href={link.href} className="font-inter text-sm text-muted-foreground hover:text-primary transition-colors">
                      {link.name}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-cinzel text-lg font-semibold text-foreground mb-4">Siga a Lenda</h3>
            <div className="flex justify-center md:justify-start gap-4">
              {socialLinks.map(social => (
                <a key={social.name} href={social.href} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                  <social.icon className="w-6 h-6" />
                  <span className="sr-only">{social.name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary/10 pt-6 mt-8 flex flex-col sm:flex-row justify-between items-center text-center">
          <p className="font-inter text-sm text-muted-foreground mb-4 sm:mb-0">
            © {new Date().getFullYear()} Keven AOM. Todos os direitos reservados.
          </p>
          <p className="font-inter text-sm text-muted-foreground">
            Desenvolvido por <a href="https://keventech.netlify.app/" target="_blank" rel="noopener noreferrer" className="font-semibold text-primary hover:underline">Keven Tech</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;