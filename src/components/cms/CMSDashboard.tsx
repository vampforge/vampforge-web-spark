import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard, 
  FileText, 
  MessageSquare, 
  Calendar,
  Settings,
  LogOut,
  Users,
  Star,
  Shield,
  Download,
  Upload,
  RotateCcw,
  Edit,
  Eye,
  Trash2
} from 'lucide-react';
import { useCMSData } from '@/hooks/useCMSData';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CMSPageEditor from './CMSPageEditor';
import CMSFormResponses from './CMSFormResponses';
import CMSSettings from './CMSSettings';
import CMSReviews from './CMSReviews';

const CMSDashboard = () => {
  const { cmsData, logout, resetCMS, exportData } = useCMSData();
  const [activeTab, setActiveTab] = useState('dashboard');

  const handleExport = () => {
    const data = exportData();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `vampforge-cms-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'pages', label: 'Pages', icon: FileText },
    { id: 'forms', label: 'Form Responses', icon: MessageSquare },
    { id: 'reviews', label: 'Reviews', icon: Star },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const stats = [
    {
      title: 'Total Pages',
      value: cmsData.pages.length,
      icon: FileText,
      color: 'text-blue-500'
    },
    {
      title: 'Form Responses',
      value: cmsData.formResponses.length,
      icon: MessageSquare,
      color: 'text-green-500'
    },
    {
      title: 'Unread Responses',
      value: cmsData.formResponses.filter(r => !r.read).length,
      icon: Calendar,
      color: 'text-orange-500'
    },
    {
      title: 'Customer Reviews',
      value: cmsData.reviews.length,
      icon: Star,
      color: 'text-purple-500'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 primary-gradient rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-primary-foreground" />
            </div>
            <h1 className="text-xl font-bold">VAMPForge CMS</h1>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={handleExport}>
              <Download className="w-4 h-4" />
              Export
            </Button>
            <Button variant="outline" size="sm" onClick={resetCMS}>
              <RotateCcw className="w-4 h-4" />
              Reset
            </Button>
            <Button variant="outline" size="sm" onClick={logout}>
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="card-shadow">
              <CardContent className="p-4">
                <nav className="space-y-2">
                  {sidebarItems.map((item) => (
                    <Button
                      key={item.id}
                      variant={activeTab === item.id ? "default" : "ghost"}
                      className="w-full justify-start"
                      onClick={() => setActiveTab(item.id)}
                    >
                      <item.icon className="w-4 h-4 mr-2" />
                      {item.label}
                    </Button>
                  ))}
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-4">
            {activeTab === 'dashboard' && (
              <div className="space-y-6">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {stats.map((stat, index) => (
                    <Card key={index} className="card-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">
                              {stat.title}
                            </p>
                            <p className="text-2xl font-bold">{stat.value}</p>
                          </div>
                          <stat.icon className={`w-8 h-8 ${stat.color}`} />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Recent Activity */}
                <Card className="card-shadow">
                  <CardHeader>
                    <CardTitle>Recent Form Responses</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {cmsData.formResponses.length === 0 ? (
                      <p className="text-muted-foreground text-center py-8">
                        No form responses yet
                      </p>
                    ) : (
                      <div className="space-y-4">
                        {cmsData.formResponses.slice(0, 5).map((response) => (
                          <div
                            key={response.id}
                            className="flex items-center justify-between p-4 border rounded-lg"
                          >
                            <div className="flex-1">
                              <p className="font-medium">
                                {response.data.name || 'Anonymous'}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {response.formType === 'contact' ? 'Contact Form' : 'Schedule Call'}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {new Date(response.timestamp).toLocaleString()}
                              </p>
                            </div>
                            <div className="flex items-center space-x-2">
                              {!response.read && (
                                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                              )}
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setActiveTab('forms')}
                              >
                                <Eye className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === 'pages' && <CMSPageEditor />}
            {activeTab === 'forms' && <CMSFormResponses />}
            {activeTab === 'reviews' && <CMSReviews />}
            {activeTab === 'settings' && <CMSSettings />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CMSDashboard;