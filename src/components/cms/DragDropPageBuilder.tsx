import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { 
  Type, 
  Image, 
  Layout, 
  Trash2, 
  Edit3, 
  Eye, 
  Plus,
  Move,
  Save,
  Palette
} from 'lucide-react';

interface PageSection {
  id: string;
  type: 'hero' | 'text' | 'image' | 'cta' | 'cards';
  content: {
    title?: string;
    subtitle?: string;
    text?: string;
    image?: string;
    buttonText?: string;
    buttonLink?: string;
    backgroundColor?: string;
    textColor?: string;
    items?: Array<{
      title: string;
      description: string;
      icon?: string;
    }>;
  };
}

interface DragDropPageBuilderProps {
  pageId: string;
  initialSections?: PageSection[];
  onSave: (sections: PageSection[]) => void;
}

const DragDropPageBuilder = ({ pageId, initialSections = [], onSave }: DragDropPageBuilderProps) => {
  const [sections, setSections] = useState<PageSection[]>(initialSections);
  const [editingSection, setEditingSection] = useState<PageSection | null>(null);
  const [previewMode, setPreviewMode] = useState(false);

  const sectionTemplates = [
    {
      type: 'hero',
      label: 'Hero Section',
      icon: Layout,
      template: {
        title: 'Welcome to VAMPForge',
        subtitle: 'Building Digital Solutions for Tomorrow',
        buttonText: 'Get Started',
        buttonLink: '/contact',
        backgroundColor: 'rgba(0,0,0,0.8)',
        textColor: '#ffffff'
      }
    },
    {
      type: 'text',
      label: 'Text Block',
      icon: Type,
      template: {
        title: 'Section Title',
        text: 'Your content goes here. Edit this text to customize your message.',
        backgroundColor: 'transparent',
        textColor: 'inherit'
      }
    },
    {
      type: 'image',
      label: 'Image Section',
      icon: Image,
      template: {
        title: 'Image Title',
        image: '/placeholder.svg',
        text: 'Image description goes here.',
        backgroundColor: 'transparent',
        textColor: 'inherit'
      }
    },
    {
      type: 'cta',
      label: 'Call to Action',
      icon: Plus,
      template: {
        title: 'Ready to Get Started?',
        subtitle: 'Join thousands of satisfied customers',
        buttonText: 'Contact Us Now',
        buttonLink: '/contact',
        backgroundColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        textColor: '#ffffff'
      }
    },
    {
      type: 'cards',
      label: 'Feature Cards',
      icon: Layout,
      template: {
        title: 'Our Services',
        items: [
          { title: 'Service 1', description: 'Description for service 1', icon: '🚀' },
          { title: 'Service 2', description: 'Description for service 2', icon: '💡' },
          { title: 'Service 3', description: 'Description for service 3', icon: '⚡' }
        ],
        backgroundColor: 'transparent',
        textColor: 'inherit'
      }
    }
  ];

  const generateId = () => `section_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

  const addSection = (type: string) => {
    const template = sectionTemplates.find(t => t.type === type);
    if (template) {
      const newSection: PageSection = {
        id: generateId(),
        type: type as PageSection['type'],
        content: { ...template.template }
      };
      setSections([...sections, newSection]);
    }
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(sections);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setSections(items);
  };

  const deleteSection = (id: string) => {
    setSections(sections.filter(s => s.id !== id));
  };

  const editSection = (section: PageSection) => {
    setEditingSection({ ...section });
  };

  const saveSection = () => {
    if (editingSection) {
      setSections(sections.map(s => 
        s.id === editingSection.id ? editingSection : s
      ));
      setEditingSection(null);
    }
  };

  const renderSectionPreview = (section: PageSection) => {
    const bgStyle = section.content.backgroundColor?.startsWith('linear-gradient') 
      ? { background: section.content.backgroundColor }
      : { backgroundColor: section.content.backgroundColor };

    switch (section.type) {
      case 'hero':
        return (
          <div 
            className="p-16 text-center glass-card"
            style={{
              ...bgStyle,
              color: section.content.textColor
            }}
          >
            <h1 className="text-4xl font-bold mb-4">{section.content.title}</h1>
            <p className="text-xl mb-8">{section.content.subtitle}</p>
            <Button className="hover-scale">
              {section.content.buttonText}
            </Button>
          </div>
        );

      case 'text':
        return (
          <div 
            className="p-8 glass-card"
            style={{
              ...bgStyle,
              color: section.content.textColor
            }}
          >
            <h2 className="text-2xl font-bold mb-4">{section.content.title}</h2>
            <p className="text-muted-foreground">{section.content.text}</p>
          </div>
        );

      case 'image':
        return (
          <div 
            className="p-8 glass-card"
            style={{
              ...bgStyle,
              color: section.content.textColor
            }}
          >
            <h2 className="text-2xl font-bold mb-4">{section.content.title}</h2>
            <img 
              src={section.content.image} 
              alt={section.content.title}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <p className="text-muted-foreground">{section.content.text}</p>
          </div>
        );

      case 'cta':
        return (
          <div 
            className="p-12 text-center glass-card"
            style={{
              ...bgStyle,
              color: section.content.textColor
            }}
          >
            <h2 className="text-3xl font-bold mb-4">{section.content.title}</h2>
            <p className="text-lg mb-8">{section.content.subtitle}</p>
            <Button size="lg" className="hover-scale">
              {section.content.buttonText}
            </Button>
          </div>
        );

      case 'cards':
        return (
          <div 
            className="p-8 glass-card"
            style={{
              ...bgStyle,
              color: section.content.textColor
            }}
          >
            <h2 className="text-2xl font-bold mb-8 text-center">{section.content.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {section.content.items?.map((item, index) => (
                <Card key={index} className="glass-card">
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl mb-4">{item.icon}</div>
                    <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      default:
        return <div>Unknown section type</div>;
    }
  };

  if (previewMode) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Page Preview</h2>
          <Button onClick={() => setPreviewMode(false)}>
            <Edit3 className="w-4 h-4 mr-2" />
            Edit Mode
          </Button>
        </div>
        <div className="space-y-6">
          {sections.map((section) => (
            <div key={section.id}>
              {renderSectionPreview(section)}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Page Builder</h2>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => setPreviewMode(true)}>
            <Eye className="w-4 h-4 mr-2" />
            Preview
          </Button>
          <Button onClick={() => onSave(sections)}>
            <Save className="w-4 h-4 mr-2" />
            Save Page
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Component Library */}
        <Card className="card-shadow">
          <CardContent className="p-4">
            <h3 className="font-semibold mb-4">Components</h3>
            <div className="space-y-2">
              {sectionTemplates.map((template) => (
                <Button
                  key={template.type}
                  variant="outline"
                  size="sm"
                  className="w-full justify-start"
                  onClick={() => addSection(template.type)}
                >
                  <template.icon className="w-4 h-4 mr-2" />
                  {template.label}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Page Structure */}
        <div className="lg:col-span-3">
          <Card className="card-shadow">
            <CardContent className="p-4">
              <h3 className="font-semibold mb-4">Page Structure</h3>
              
              {sections.length === 0 ? (
                <div className="text-center py-12 border-2 border-dashed border-muted rounded-lg">
                  <Layout className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground mb-4">
                    Start building your page by adding components
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Drag and drop components from the sidebar to get started
                  </p>
                </div>
              ) : (
                <DragDropContext onDragEnd={handleDragEnd}>
                  <Droppable droppableId="sections">
                    {(provided) => (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className="space-y-4"
                      >
                        {sections.map((section, index) => (
                          <Draggable key={section.id} draggableId={section.id} index={index}>
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                className={`border rounded-lg p-4 transition-all ${
                                  snapshot.isDragging ? 'shadow-lg scale-105' : 'hover:border-primary'
                                }`}
                              >
                                <div className="flex items-center justify-between mb-3">
                                  <div className="flex items-center space-x-2">
                                    <div {...provided.dragHandleProps}>
                                      <Move className="w-4 h-4 text-muted-foreground cursor-grab" />
                                    </div>
                                    <span className="font-medium capitalize">
                                      {section.type} Section
                                    </span>
                                  </div>
                                  <div className="flex space-x-1">
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() => editSection(section)}
                                    >
                                      <Edit3 className="w-3 h-3" />
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() => deleteSection(section.id)}
                                    >
                                      <Trash2 className="w-3 h-3" />
                                    </Button>
                                  </div>
                                </div>
                                <div className="scale-75 origin-top-left transform">
                                  {renderSectionPreview(section)}
                                </div>
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </DragDropContext>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Edit Section Dialog */}
      <Dialog open={!!editingSection} onOpenChange={() => setEditingSection(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit {editingSection?.type} Section</DialogTitle>
          </DialogHeader>
          {editingSection && (
            <div className="space-y-4">
              {/* Common fields */}
              {editingSection.content.title !== undefined && (
                <div className="space-y-2">
                  <label className="text-sm font-medium">Title</label>
                  <Input
                    value={editingSection.content.title || ''}
                    onChange={(e) => setEditingSection({
                      ...editingSection,
                      content: { ...editingSection.content, title: e.target.value }
                    })}
                  />
                </div>
              )}

              {editingSection.content.subtitle !== undefined && (
                <div className="space-y-2">
                  <label className="text-sm font-medium">Subtitle</label>
                  <Input
                    value={editingSection.content.subtitle || ''}
                    onChange={(e) => setEditingSection({
                      ...editingSection,
                      content: { ...editingSection.content, subtitle: e.target.value }
                    })}
                  />
                </div>
              )}

              {editingSection.content.text !== undefined && (
                <div className="space-y-2">
                  <label className="text-sm font-medium">Text Content</label>
                  <Textarea
                    value={editingSection.content.text || ''}
                    onChange={(e) => setEditingSection({
                      ...editingSection,
                      content: { ...editingSection.content, text: e.target.value }
                    })}
                    rows={4}
                  />
                </div>
              )}

              {editingSection.content.buttonText !== undefined && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Button Text</label>
                    <Input
                      value={editingSection.content.buttonText || ''}
                      onChange={(e) => setEditingSection({
                        ...editingSection,
                        content: { ...editingSection.content, buttonText: e.target.value }
                      })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Button Link</label>
                    <Input
                      value={editingSection.content.buttonLink || ''}
                      onChange={(e) => setEditingSection({
                        ...editingSection,
                        content: { ...editingSection.content, buttonLink: e.target.value }
                      })}
                    />
                  </div>
                </div>
              )}

              {editingSection.content.image !== undefined && (
                <div className="space-y-2">
                  <label className="text-sm font-medium">Image URL</label>
                  <Input
                    value={editingSection.content.image || ''}
                    onChange={(e) => setEditingSection({
                      ...editingSection,
                      content: { ...editingSection.content, image: e.target.value }
                    })}
                  />
                </div>
              )}

              {/* Style fields */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Background</label>
                  <Input
                    value={editingSection.content.backgroundColor || ''}
                    onChange={(e) => setEditingSection({
                      ...editingSection,
                      content: { ...editingSection.content, backgroundColor: e.target.value }
                    })}
                    placeholder="e.g., #000000 or rgba(0,0,0,0.5)"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Text Color</label>
                  <Input
                    value={editingSection.content.textColor || ''}
                    onChange={(e) => setEditingSection({
                      ...editingSection,
                      content: { ...editingSection.content, textColor: e.target.value }
                    })}
                    placeholder="e.g., #ffffff"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline" onClick={() => setEditingSection(null)}>
                  Cancel
                </Button>
                <Button onClick={saveSection}>
                  Save Changes
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DragDropPageBuilder;