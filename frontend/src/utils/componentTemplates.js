// Component templates/presets library
// These are pre-built component combinations that users can drag and drop

export const COMPONENT_TEMPLATES = {
  hero: {
    name: 'Hero Section',
    icon: '🎯',
    description: 'Eye-catching hero section with heading, text, and CTA button',
    components: [
      {
        type: 'Container',
        props: { 
          padding: 60, 
          backgroundColor: '#007bff', 
          textAlign: 'center',
          borderRadius: 0
        },
        children: [
          {
            type: 'Heading',
            props: { 
              text: 'Welcome to Our Website', 
              level: 1, 
              fontSize: 56, 
              color: '#ffffff' 
            }
          },
          {
            type: 'Text',
            props: { 
              content: 'Build amazing websites with our drag-and-drop builder. Create beautiful, responsive designs in minutes.', 
              fontSize: 20, 
              color: '#f0f0f0' 
            }
          },
          {
            type: 'Button',
            props: { 
              text: 'Get Started', 
              variant: 'primary', 
              size: 'large',
              backgroundColor: '#ffffff',
              textColor: '#007bff'
            }
          }
        ]
      }
    ]
  },
  navbar: {
    name: 'Navigation Bar',
    icon: '🧭',
    description: 'Full navigation bar with brand and menu links',
    components: [
      {
        type: 'Navbar',
        props: { 
          brand: 'My Website', 
          links: [
            { label: 'Home', path: '/' },
            { label: 'About', path: '/about' },
            { label: 'Services', path: '/services' },
            { label: 'Contact', path: '/contact' }
          ], 
          variant: 'light', 
          expand: 'md' 
        }
      }
    ]
  },
  footer: {
    name: 'Footer',
    icon: '📄',
    description: 'Complete footer with links, text, and social info',
    components: [
      {
        type: 'Container',
        props: { 
          padding: 40, 
          backgroundColor: '#343a40', 
          textAlign: 'center',
          borderRadius: 0
        },
        children: [
          {
            type: 'Heading',
            props: { 
              text: 'My Website', 
              level: 3, 
              fontSize: 24, 
              color: '#ffffff' 
            }
          },
          {
            type: 'Text',
            props: { 
              content: '© 2024 My Website. All rights reserved.', 
              fontSize: 14, 
              color: '#cccccc' 
            }
          },
          {
            type: 'Text',
            props: { 
              content: 'Privacy Policy | Terms of Service | Contact', 
              fontSize: 14, 
              color: '#cccccc' 
            }
          }
        ]
      }
    ]
  },
  contactForm: {
    name: 'Contact Form',
    icon: '📧',
    description: 'Complete contact form with name, email, and message fields',
    components: [
      {
        type: 'Container',
        props: { 
          padding: 40, 
          backgroundColor: '#f8f9fa', 
          borderRadius: 8
        },
        children: [
          {
            type: 'Heading',
            props: { 
              text: 'Contact Us', 
              level: 2, 
              fontSize: 36, 
              color: '#333333' 
            }
          },
          {
            type: 'Text',
            props: { 
              content: 'Fill out the form below and we\'ll get back to you as soon as possible.', 
              fontSize: 16, 
              color: '#666666' 
            }
          },
          {
            type: 'Input',
            props: { 
              placeholder: 'Your Name', 
              type: 'text', 
              label: 'Name',
              backgroundColor: '#ffffff',
              borderColor: '#dddddd'
            }
          },
          {
            type: 'Input',
            props: { 
              placeholder: 'your@email.com', 
              type: 'email', 
              label: 'Email',
              backgroundColor: '#ffffff',
              borderColor: '#dddddd'
            }
          },
          {
            type: 'Textarea',
            props: { 
              label: 'Message', 
              placeholder: 'Enter your message here...', 
              rows: 6,
              backgroundColor: '#ffffff',
              borderColor: '#dddddd'
            }
          },
          {
            type: 'Button',
            props: { 
              text: 'Send Message', 
              variant: 'primary', 
              size: 'large' 
            }
          }
        ]
      }
    ]
  },
  imageCarousel: {
    name: 'Image Carousel',
    icon: '🎠',
    description: 'Image carousel/slider with multiple images',
    components: [
      {
        type: 'Container',
        props: { 
          padding: 20, 
          backgroundColor: '#ffffff' 
        },
        children: [
          {
            type: 'Heading',
            props: { 
              text: 'Featured Images', 
              level: 2, 
              fontSize: 32, 
              color: '#333333' 
            }
          },
          {
            type: 'ImageCarousel',
            props: { 
              images: [
                'https://via.placeholder.com/1200x600/007bff/ffffff?text=Image+1',
                'https://via.placeholder.com/1200x600/28a745/ffffff?text=Image+2',
                'https://via.placeholder.com/1200x600/dc3545/ffffff?text=Image+3',
                'https://via.placeholder.com/1200x600/ffc107/000000?text=Image+4'
              ], 
              autoplay: true, 
              interval: 3000 
            }
          }
        ]
      }
    ]
  },
  accordion: {
    name: 'Accordion FAQ',
    icon: '📑',
    description: 'Accordion component for FAQs or collapsible content',
    components: [
      {
        type: 'Container',
        props: { 
          padding: 30, 
          backgroundColor: '#ffffff' 
        },
        children: [
          {
            type: 'Heading',
            props: { 
              text: 'Frequently Asked Questions', 
              level: 2, 
              fontSize: 32, 
              color: '#333333' 
            }
          },
          {
            type: 'Accordion',
            props: { 
              items: [
                { 
                  title: 'What is this website builder?', 
                  content: 'This is a drag-and-drop website builder that allows you to create beautiful websites without coding.' 
                },
                { 
                  title: 'How do I get started?', 
                  content: 'Simply drag components from the palette onto the canvas and customize them to your liking.' 
                },
                { 
                  title: 'Can I publish my website?', 
                  content: 'Yes! Once you\'re happy with your design, click the Publish button to deploy your website.' 
                },
                { 
                  title: 'Is it free to use?', 
                  content: 'Yes, the basic version is free. Premium features are available with a subscription.' 
                }
              ], 
              flush: false, 
              alwaysOpen: false 
            }
          }
        ]
      }
    ]
  },
  featureCards: {
    name: 'Feature Cards',
    icon: '🃏',
    description: 'Three-column feature cards layout',
    components: [
      {
        type: 'Container',
        props: { 
          padding: 40, 
          backgroundColor: '#ffffff' 
        },
        children: [
          {
            type: 'Heading',
            props: { 
              text: 'Our Features', 
              level: 2, 
              fontSize: 36, 
              color: '#333333',
              textAlign: 'center'
            }
          },
          {
            type: 'FlexGrid',
            props: { 
              rows: 1, 
              columns: 3, 
              gap: 24, 
              padding: 20, 
              backgroundColor: '#ffffff' 
            },
            children: [
              {
                type: 'Card',
                props: { 
                  title: 'Fast & Reliable', 
                  text: 'Lightning-fast performance with 99.9% uptime guarantee.', 
                  buttonText: 'Learn More',
                  buttonVariant: 'primary'
                }
              },
              {
                type: 'Card',
                props: { 
                  title: 'Easy to Use', 
                  text: 'Intuitive interface that anyone can master in minutes.', 
                  buttonText: 'Learn More',
                  buttonVariant: 'primary'
                }
              },
              {
                type: 'Card',
                props: { 
                  title: 'Secure', 
                  text: 'Enterprise-grade security to protect your data and users.', 
                  buttonText: 'Learn More',
                  buttonVariant: 'primary'
                }
              }
            ]
          }
        ]
      }
    ]
  },
  pricingTable: {
    name: 'Pricing Table',
    icon: '💰',
    description: 'Pricing comparison table',
    components: [
      {
        type: 'Container',
        props: { 
          padding: 40, 
          backgroundColor: '#f8f9fa' 
        },
        children: [
          {
            type: 'Heading',
            props: { 
              text: 'Choose Your Plan', 
              level: 2, 
              fontSize: 36, 
              color: '#333333',
              textAlign: 'center'
            }
          },
          {
            type: 'FlexGrid',
            props: { 
              rows: 1, 
              columns: 3, 
              gap: 24, 
              padding: 20, 
              backgroundColor: '#f8f9fa' 
            },
            children: [
              {
                type: 'Card',
                props: { 
                  title: 'Basic', 
                  subtitle: '$9/month',
                  text: 'Perfect for small projects\n• 5 Pages\n• Basic Support\n• 10GB Storage', 
                  buttonText: 'Get Started',
                  buttonVariant: 'secondary'
                }
              },
              {
                type: 'Card',
                props: { 
                  title: 'Pro', 
                  subtitle: '$29/month',
                  text: 'Best for growing businesses\n• Unlimited Pages\n• Priority Support\n• 100GB Storage\n• Advanced Features', 
                  buttonText: 'Get Started',
                  buttonVariant: 'primary'
                }
              },
              {
                type: 'Card',
                props: { 
                  title: 'Enterprise', 
                  subtitle: '$99/month',
                  text: 'For large organizations\n• Everything in Pro\n• Custom Domain\n• 24/7 Support\n• White Label', 
                  buttonText: 'Contact Sales',
                  buttonVariant: 'secondary'
                }
              }
            ]
          }
        ]
      }
    ]
  },
  testimonialSection: {
    name: 'Testimonials',
    icon: '💬',
    description: 'Customer testimonials section',
    components: [
      {
        type: 'Container',
        props: { 
          padding: 50, 
          backgroundColor: '#f8f9fa' 
        },
        children: [
          {
            type: 'Heading',
            props: { 
              text: 'What Our Customers Say', 
              level: 2, 
              fontSize: 36, 
              color: '#333333',
              textAlign: 'center'
            }
          },
          {
            type: 'FlexGrid',
            props: { 
              rows: 1, 
              columns: 2, 
              gap: 24, 
              padding: 20, 
              backgroundColor: '#f8f9fa' 
            },
            children: [
              {
                type: 'Card',
                props: { 
                  title: 'John Doe', 
                  subtitle: 'CEO, Company Inc.',
                  text: '"This website builder has transformed how we create web pages. It\'s intuitive, powerful, and saves us hours of work."', 
                  buttonText: '',
                  buttonVariant: 'primary'
                }
              },
              {
                type: 'Card',
                props: { 
                  title: 'Jane Smith', 
                  subtitle: 'Designer, Creative Studio',
                  text: '"I love how easy it is to build beautiful websites. The drag-and-drop interface is a game-changer!"', 
                  buttonText: '',
                  buttonVariant: 'primary'
                }
              }
            ]
          }
        ]
      }
    ]
  },
  statsSection: {
    name: 'Stats Section',
    icon: '📊',
    description: 'Statistics/metrics display section',
    components: [
      {
        type: 'Container',
        props: { 
          padding: 60, 
          backgroundColor: '#007bff',
          textAlign: 'center'
        },
        children: [
          {
            type: 'Heading',
            props: { 
              text: 'Our Impact', 
              level: 2, 
              fontSize: 36, 
              color: '#ffffff' 
            }
          },
          {
            type: 'FlexGrid',
            props: { 
              rows: 1, 
              columns: 4, 
              gap: 24, 
              padding: 20, 
              backgroundColor: 'transparent' 
            },
            children: [
              {
                type: 'Container',
                props: { 
                  padding: 20, 
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  borderRadius: 8
                },
                children: [
                  {
                    type: 'Heading',
                    props: { 
                      text: '10K+', 
                      level: 3, 
                      fontSize: 48, 
                      color: '#ffffff' 
                    }
                  },
                  {
                    type: 'Text',
                    props: { 
                      content: 'Happy Customers', 
                      fontSize: 16, 
                      color: '#ffffff' 
                    }
                  }
                ]
              },
              {
                type: 'Container',
                props: { 
                  padding: 20, 
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  borderRadius: 8
                },
                children: [
                  {
                    type: 'Heading',
                    props: { 
                      text: '50K+', 
                      level: 3, 
                      fontSize: 48, 
                      color: '#ffffff' 
                    }
                  },
                  {
                    type: 'Text',
                    props: { 
                      content: 'Websites Created', 
                      fontSize: 16, 
                      color: '#ffffff' 
                    }
                  }
                ]
              },
              {
                type: 'Container',
                props: { 
                  padding: 20, 
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  borderRadius: 8
                },
                children: [
                  {
                    type: 'Heading',
                    props: { 
                      text: '99.9%', 
                      level: 3, 
                      fontSize: 48, 
                      color: '#ffffff' 
                    }
                  },
                  {
                    type: 'Text',
                    props: { 
                      content: 'Uptime', 
                      fontSize: 16, 
                      color: '#ffffff' 
                    }
                  }
                ]
              },
              {
                type: 'Container',
                props: { 
                  padding: 20, 
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  borderRadius: 8
                },
                children: [
                  {
                    type: 'Heading',
                    props: { 
                      text: '24/7', 
                      level: 3, 
                      fontSize: 48, 
                      color: '#ffffff' 
                    }
                  },
                  {
                    type: 'Text',
                    props: { 
                      content: 'Support', 
                      fontSize: 16, 
                      color: '#ffffff' 
                    }
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  newsletterSignup: {
    name: 'Newsletter Signup',
    icon: '📬',
    description: 'Email newsletter subscription form',
    components: [
      {
        type: 'Container',
        props: { 
          padding: 50, 
          backgroundColor: '#007bff',
          textAlign: 'center',
          borderRadius: 8
        },
        children: [
          {
            type: 'Heading',
            props: { 
              text: 'Subscribe to Our Newsletter', 
              level: 2, 
              fontSize: 32, 
              color: '#ffffff' 
            }
          },
          {
            type: 'Text',
            props: { 
              content: 'Get the latest updates, news, and exclusive offers delivered to your inbox.', 
              fontSize: 16, 
              color: '#f0f0f0' 
            }
          },
          {
            type: 'FlexGrid',
            props: { 
              rows: 1, 
              columns: 2, 
              gap: 12, 
              padding: 20, 
              backgroundColor: 'transparent' 
            },
            children: [
              {
                type: 'Input',
                props: { 
                  placeholder: 'Enter your email', 
                  type: 'email',
                  backgroundColor: '#ffffff',
                  borderColor: '#ffffff'
                }
              },
              {
                type: 'Button',
                props: { 
                  text: 'Subscribe', 
                  variant: 'primary',
                  size: 'large',
                  backgroundColor: '#ffffff',
                  textColor: '#007bff'
                }
              }
            ]
          }
        ]
      }
    ]
  },
  teamSection: {
    name: 'Team Section',
    icon: '👥',
    description: 'Team members showcase',
    components: [
      {
        type: 'Container',
        props: { 
          padding: 50, 
          backgroundColor: '#ffffff' 
        },
        children: [
          {
            type: 'Heading',
            props: { 
              text: 'Meet Our Team', 
              level: 2, 
              fontSize: 36, 
              color: '#333333',
              textAlign: 'center'
            }
          },
          {
            type: 'FlexGrid',
            props: { 
              rows: 1, 
              columns: 3, 
              gap: 24, 
              padding: 20, 
              backgroundColor: '#ffffff' 
            },
            children: [
              {
                type: 'Card',
                props: { 
                  title: 'John Doe', 
                  subtitle: 'CEO & Founder',
                  image: 'https://via.placeholder.com/300x300/007bff/ffffff?text=JD',
                  text: 'Leading the company with vision and innovation.', 
                  buttonText: 'LinkedIn',
                  buttonVariant: 'primary'
                }
              },
              {
                type: 'Card',
                props: { 
                  title: 'Jane Smith', 
                  subtitle: 'CTO',
                  image: 'https://via.placeholder.com/300x300/28a745/ffffff?text=JS',
                  text: 'Driving technical excellence and innovation.', 
                  buttonText: 'LinkedIn',
                  buttonVariant: 'primary'
                }
              },
              {
                type: 'Card',
                props: { 
                  title: 'Bob Johnson', 
                  subtitle: 'Head of Design',
                  image: 'https://via.placeholder.com/300x300/dc3545/ffffff?text=BJ',
                  text: 'Creating beautiful and functional designs.', 
                  buttonText: 'LinkedIn',
                  buttonVariant: 'primary'
                }
              }
            ]
          }
        ]
      }
    ]
  }
}

// Helper function to apply template and generate IDs
export function applyTemplate(template, generateId) {
  const applyIds = (comps) => {
    return comps.map(comp => ({
      ...comp,
      id: generateId(),
      children: comp.children ? applyIds(comp.children) : []
    }))
  }
  
  return applyIds(template.components)
}

// Get all template keys
export function getTemplateKeys() {
  return Object.keys(COMPONENT_TEMPLATES)
}

// Get template by key
export function getTemplate(key) {
  return COMPONENT_TEMPLATES[key]
}
