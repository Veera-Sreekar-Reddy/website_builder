// Component templates/presets library
export const COMPONENT_TEMPLATES = {
  hero: {
    name: 'Hero Section',
    components: [
      {
        type: 'Container',
        props: { padding: 40, backgroundColor: '#f8f9fa', textAlign: 'center' },
        children: [
          {
            type: 'Heading',
            props: { text: 'Welcome to Our Website', level: 1, fontSize: 48, color: '#000000' }
          },
          {
            type: 'Text',
            props: { content: 'Build amazing websites with our drag-and-drop builder', fontSize: 18, color: '#666666' }
          },
          {
            type: 'Button',
            props: { text: 'Get Started', variant: 'primary', size: 'large' }
          }
        ]
      }
    ]
  },
  cardGrid: {
    name: 'Card Grid',
    components: [
      {
        type: 'Container',
        props: { padding: 20, backgroundColor: '#ffffff' },
        children: [
          {
            type: 'Card',
            props: { title: 'Card 1', text: 'Card content goes here', buttonText: 'Learn More' }
          },
          {
            type: 'Card',
            props: { title: 'Card 2', text: 'Card content goes here', buttonText: 'Learn More' }
          },
          {
            type: 'Card',
            props: { title: 'Card 3', text: 'Card content goes here', buttonText: 'Learn More' }
          }
        ]
      }
    ]
  },
  contactForm: {
    name: 'Contact Form',
    components: [
      {
        type: 'Container',
        props: { padding: 30, backgroundColor: '#ffffff' },
        children: [
          {
            type: 'Heading',
            props: { text: 'Contact Us', level: 2, fontSize: 32 }
          },
          {
            type: 'Input',
            props: { placeholder: 'Your Name', type: 'text', label: 'Name' }
          },
          {
            type: 'Input',
            props: { placeholder: 'your@email.com', type: 'email', label: 'Email' }
          },
          {
            type: 'Textarea',
            props: { label: 'Message', placeholder: 'Enter your message...', rows: 6 }
          },
          {
            type: 'Button',
            props: { text: 'Send Message', variant: 'primary', size: 'large' }
          }
        ]
      }
    ]
  },
  featureList: {
    name: 'Feature List',
    components: [
      {
        type: 'Container',
        props: { padding: 20 },
        children: [
          {
            type: 'Heading',
            props: { text: 'Features', level: 2, fontSize: 36 }
          },
          {
            type: 'ListGroup',
            props: { items: ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4'] }
          }
        ]
      }
    ]
  }
}

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

