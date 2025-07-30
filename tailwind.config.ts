import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				'cinzel': ['Cinzel', 'serif'],
				'cinzel-decorative': ['Cinzel Decorative', 'serif'], 
				'inter': ['Inter', 'sans-serif']
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
					glow: 'hsl(var(--primary-glow))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			backgroundImage: {
				'gradient-hero': 'linear-gradient(135deg, hsl(45 95% 65%) 0%, hsl(30 85% 55%) 50%, hsl(210 100% 60%) 100%)',
				'gradient-divine': 'linear-gradient(45deg, hsl(45 100% 75%) 0%, hsl(45 95% 65%) 100%)',
				'gradient-shadow': 'linear-gradient(180deg, transparent 0%, rgba(34, 28, 23, 0.8) 100%)',
				'gradient-card': 'linear-gradient(145deg, hsl(222 20% 12%) 0%, hsl(222 15% 18%) 100%)'
			},
			boxShadow: {
				'divine': '0 20px 60px rgba(201, 165, 56, 0.3)',
				'epic': '0 10px 40px rgba(34, 28, 23, 0.6)',
				'glow': '0 0 30px rgba(226, 187, 74, 0.4)'
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'glow-pulse': {
					'0%': { 
						boxShadow: '0 0 20px rgba(201, 165, 56, 0.3)' 
					},
					'100%': { 
						boxShadow: '0 0 40px rgba(201, 165, 56, 0.6)' 
					}
				},
				'float': {
					'0%, 100%': { 
						transform: 'translateY(0px)' 
					},
					'50%': { 
						transform: 'translateY(-10px)' 
					}
				},
				'shimmer': {
					'0%': { 
						backgroundPosition: '-200% center' 
					},
					'100%': { 
						backgroundPosition: '200% center' 
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'glow-pulse': 'glow-pulse 2s ease-in-out infinite alternate',
				'float': 'float 6s ease-in-out infinite',
				'shimmer': 'shimmer 3s linear infinite'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;