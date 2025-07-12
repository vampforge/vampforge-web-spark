import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Edit, Eye, Save, Plus } from 'lucide-react';
import { useCMSData } from '@/hooks/useCMSData';

const CMSPageEditor = () => {
  const { cmsData, updatePage } = useCMSData();
  const [selectedPage, setSelectedPage] = useState(cmsData.pages[0]?.id || '');
  const [editingPage, setEditingPage] = useState<any>(null);

  const currentPage = cmsData.pages.find(p => p.id === selectedPage);

  const handleEditPage = (page: any) => {
    setEditingPage({ ...page });
  };

  const handleSavePage = () => {
    if (editingPage) {
      updatePage(editingPage.id, editingPage);
      setEditingPage(null);
    }
  };

  const handleCancelEdit = () => {
    setEditingPage(null);
  };

  if (editingPage) {
    return (
      <Card className="card-shadow">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Edit Page: {editingPage.name}</span>
            <div className="flex space-x-2">
              <Button variant="outline" onClick={handleCancelEdit}>
                Cancel
              </Button>
              <Button onClick={handleSavePage}>
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="general" className="w-full">
            <TabsList>
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="seo">SEO</TabsTrigger>
              <TabsTrigger value="content">Content</TabsTrigger>
            </TabsList>

            <TabsContent value="general" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="page-name">Page Name</Label>
                  <Input
                    id="page-name"
                    value={editingPage.name}
                    onChange={(e) => setEditingPage(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="page-slug">Page Slug</Label>
                  <Input
                    id="page-slug"
                    value={editingPage.slug}
                    onChange={(e) => setEditingPage(prev => ({ ...prev, slug: e.target.value }))}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="page-title">Page Title</Label>
                <Input
                  id="page-title"
                  value={editingPage.title}
                  onChange={(e) => setEditingPage(prev => ({ ...prev, title: e.target.value }))}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="page-description">Page Description</Label>
                <Textarea
                  id="page-description"
                  value={editingPage.description}
                  onChange={(e) => setEditingPage(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                />
              </div>
            </TabsContent>

            <TabsContent value="seo" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="meta-title">Meta Title</Label>
                <Input
                  id="meta-title"
                  value={editingPage.seo.metaTitle}
                  onChange={(e) => setEditingPage(prev => ({ 
                    ...prev, 
                    seo: { ...prev.seo, metaTitle: e.target.value }
                  }))}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="meta-description">Meta Description</Label>
                <Textarea
                  id="meta-description"
                  value={editingPage.seo.metaDescription}
                  onChange={(e) => setEditingPage(prev => ({ 
                    ...prev, 
                    seo: { ...prev.seo, metaDescription: e.target.value }
                  }))}
                  rows={3}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="keywords">Keywords</Label>
                <Input
                  id="keywords"
                  value={editingPage.seo.keywords}
                  onChange={(e) => setEditingPage(prev => ({ 
                    ...prev, 
                    seo: { ...prev.seo, keywords: e.target.value }
                  }))}
                  placeholder="keyword1, keyword2, keyword3"
                />
              </div>
            </TabsContent>

            <TabsContent value="content" className="space-y-4">
              <div className="text-center py-8 border-2 border-dashed border-muted rounded-lg">
                <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground mb-4">
                  Visual Content Editor (Coming Soon)
                </p>
                <p className="text-sm text-muted-foreground">
                  This will include drag-and-drop components, rich text editing, and live preview.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="card-shadow">
        <CardHeader>
          <CardTitle>Page Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {cmsData.pages.map((page) => (
              <div
                key={page.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex-1">
                  <h3 className="font-medium">{page.name}</h3>
                  <p className="text-sm text-muted-foreground">{page.slug}</p>
                  <p className="text-xs text-muted-foreground mt-1">{page.description}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(page.slug === '/' ? '/' : page.slug, '_blank')}
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEditPage(page)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CMSPageEditor;