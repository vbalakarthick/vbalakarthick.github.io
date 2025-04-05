import { useCallback, useState, useEffect } from "react";
import Particles from "react-tsparticles";
import type { Engine } from "tsparticles-engine";
import { loadFull } from "tsparticles";

interface ParticlesBackgroundProps {
  variant?: "default" | "hero" | "dense" | "minimal";
  className?: string;
  theme?: "light" | "dark";
}

export function ParticlesBackground({ 
  variant = "default", 
  className = "dark:opacity-40 opacity-30 absolute inset-0 z-0",
  theme
}: ParticlesBackgroundProps) {
  const [currentTheme, setCurrentTheme] = useState<"light" | "dark">("light");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Detect theme from props or document class
    const isDark = 
      theme === "dark" || 
      (!theme && document.documentElement.classList.contains("dark"));
    
    setCurrentTheme(isDark ? "dark" : "light");
    setIsMounted(true);
    
    return () => setIsMounted(false);
  }, [theme]);

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine);
  }, []);

  const getParticleConfig = () => {
    const isDark = currentTheme === "dark";
    
    // Base colors for light/dark theme
    const primaryColor = isDark ? "#60A5FA" : "#3B82F6"; // blue-400 for dark, blue-500 for light
    const secondaryColor = isDark ? "#93C5FD" : "#2563EB"; // blue-300 for dark, blue-600 for light
    const tertiaryColor = isDark ? "#BFDBFE" : "#1D4ED8"; // blue-200 for dark, blue-700 for light
    
    // Config variants
    const configs = {
      default: {
        particles: {
          color: {
            value: [primaryColor, secondaryColor],
          },
          links: {
            color: primaryColor,
            distance: 150,
            enable: true,
            opacity: 0.5,
            width: 1,
          },
          move: {
            direction: "none",
            enable: true,
            outModes: {
              default: "bounce",
            },
            random: false,
            speed: 2,
            straight: false,
          },
          number: {
            density: {
              enable: true,
              area: 800,
            },
            value: 80,
          },
          opacity: {
            value: { min: 0.3, max: 0.7 },
          },
          shape: {
            type: "circle",
          },
          size: {
            value: { min: 1, max: 3 },
          },
        },
        interactivity: {
          events: {
            onClick: {
              enable: true,
              mode: "push",
            },
            onHover: {
              enable: true,
              mode: "grab",
            },
            resize: true,
          },
          modes: {
            push: {
              quantity: 4,
            },
            grab: {
              distance: 140,
              links: {
                opacity: 0.5,
                color: secondaryColor,
              }
            },
          },
        },
      },
      
      hero: {
        particles: {
          color: {
            value: [primaryColor, secondaryColor, tertiaryColor],
          },
          links: {
            color: primaryColor,
            distance: 150,
            enable: true,
            opacity: 0.4,
            width: isDark ? 0.8 : 1.2,
          },
          move: {
            direction: "none",
            enable: true,
            outModes: {
              default: "out",
            },
            random: true,
            speed: 1.2,
            straight: false,
            path: {
              enable: true,
              delay: {
                value: 0.1
              },
              options: {
                size: 5,
                draw: false,
                increment: 0.001
              }
            }
          },
          number: {
            density: {
              enable: true,
              area: 1000,
            },
            value: 100,
          },
          opacity: {
            value: { min: 0.2, max: 0.6 },
            animation: {
              enable: true,
              speed: 0.5,
              minimumValue: 0.1,
              sync: false
            }
          },
          shape: {
            type: ["circle", "triangle", "polygon"],
            options: {
              polygon: {
                sides: 6
              }
            }
          },
          size: {
            value: { min: 1, max: 4 },
            animation: {
              enable: true,
              speed: 2,
              minimumValue: 0.5,
              sync: false
            }
          },
          twinkle: {
            lines: {
              enable: true,
              frequency: 0.05,
              opacity: 0.5,
              color: secondaryColor
            },
            particles: {
              enable: true,
              frequency: 0.05,
              opacity: 0.5,
              color: tertiaryColor
            }
          }
        },
        interactivity: {
          events: {
            onClick: {
              enable: true,
              mode: "repulse",
            },
            onHover: {
              enable: true,
              mode: "bubble",
              parallax: {
                enable: true,
                force: 60,
                smooth: 10
              }
            },
            resize: true,
          },
          modes: {
            bubble: {
              distance: 200,
              size: 6,
              duration: 0.4,
              opacity: 0.8,
            },
            repulse: {
              distance: 200,
              duration: 0.4,
            },
          },
        },
      },
      
      dense: {
        particles: {
          color: {
            value: [primaryColor, secondaryColor, tertiaryColor],
          },
          links: {
            color: primaryColor,
            distance: 120,
            enable: true,
            opacity: 0.4,
            width: 1,
            triangles: {
              enable: true,
              opacity: 0.1,
              color: secondaryColor
            }
          },
          move: {
            direction: "none",
            enable: true,
            outModes: {
              default: "bounce",
            },
            random: false,
            speed: 1,
            straight: false,
          },
          number: {
            density: {
              enable: true,
              area: 600,
            },
            value: 120,
          },
          opacity: {
            value: 0.5,
          },
          shape: {
            type: "circle",
          },
          size: {
            value: { min: 1, max: 2 },
          },
          zIndex: {
            value: {
              min: -1,
              max: 1
            }
          }
        },
        interactivity: {
          events: {
            onClick: {
              enable: true,
              mode: "push",
            },
            onHover: {
              enable: true,
              mode: "connect",
              parallax: {
                enable: true,
                force: 60,
                smooth: 10
              }
            },
            resize: true,
          },
          modes: {
            push: {
              quantity: 6,
            },
            connect: {
              distance: 150,
              links: {
                opacity: 0.3
              },
              radius: 120
            }
          },
        },
      },
      
      minimal: {
        particles: {
          color: {
            value: primaryColor,
          },
          links: {
            color: primaryColor,
            distance: 150,
            enable: true,
            opacity: 0.3,
            width: 0.8,
          },
          move: {
            direction: "top",
            enable: true,
            outModes: {
              default: "out",
              top: "out",
              bottom: "out",
              left: "out",
              right: "out",
            },
            random: true,
            speed: 0.8,
            straight: false,
          },
          number: {
            density: {
              enable: true,
              area: 1200,
            },
            value: 60,
          },
          opacity: {
            value: 0.3,
          },
          shape: {
            type: "circle",
          },
          size: {
            value: { min: 0.5, max: 1.5 },
          },
        },
        interactivity: {
          events: {
            onClick: {
              enable: false,
            },
            onHover: {
              enable: true,
              mode: "bubble",
              parallax: {
                enable: false,
              }
            },
            resize: true,
          },
          modes: {
            bubble: {
              distance: 200,
              size: 2,
              duration: 0.4,
              opacity: 0.6,
            },
          },
        },
      },
    };
    
    return configs[variant];
  };

  if (!isMounted) return null;

  return (
    <div className={className}>
      <Particles
        id={`tsparticles-${variant}`}
        init={particlesInit}
        options={{
          fullScreen: {
            enable: false,
          },
          background: {
            color: {
              value: "transparent",
            },
          },
          fpsLimit: 60,
          ...getParticleConfig(),
          detectRetina: true,
        }}
        className="w-full h-full absolute top-0 left-0"
      />
    </div>
  );
}
