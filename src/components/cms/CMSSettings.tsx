import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Settings, MessageCircle, Shield, Download, Upload, RotateCcw, Save } from 'lucide-react';
import { useCMSData } from '@/hooks/useCMSData';
import { useToast } from '@/hooks/use-toast';

const CMSSettings = () => {
  const { cmsData, updateSettings, resetCMS, exportData, importData } = useCMSData();
  const { toast } = useToast();
  
  const [whatsappSettings, setWhatsappSettings] = useState(cmsData.settings.whatsapp);
  const [adminSettings, setAdminSettings] = useState(cmsData.settings.admin);
  const [importFile, setImportFile] = useState<File | null>(null);

  const handleSaveWhatsApp = () => {
    updateSettings({ whatsapp: whatsappSettings });
    toast({
      title: "WhatsApp Settings Saved",
      description: "WhatsApp configuration has been updated.",
    });
  };

  const handleSaveAdmin = () => {
    updateSettings({ admin: adminSettings });
    toast({
      title: "Admin Settings Saved",
      description: "Admin credentials have been updated.",
    });
  };

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
    
    toast({
      title: "Data Exported",
      description: "CMS data has been exported successfully.",
    });
  };

  const handleImport = async () => {
    if (!importFile) return;
    
    try {
      const text = await importFile.text();
      const success = importData(text);
      
      if (success) {
        toast({
          title: "Data Imported",
          description: "CMS data has been imported successfully.",
        });
        // Refresh settings from imported data
        setWhatsappSettings(cmsData.settings.whatsapp);
        setAdminSettings(cmsData.settings.admin);
      } else {
        toast({
          title: "Import Failed",
          description: "Invalid file format or corrupted data.",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Import Error",
        description: "Failed to read the file.",
        variant: "destructive"
      });
    }
    
    setImportFile(null);
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to reset all CMS data? This action cannot be undone.')) {
      resetCMS();
      toast({
        title: "CMS Reset",
        description: "All CMS data has been reset to defaults.",
      });
    }
  };

  return (
    <div className="space-y-6">
      <Card className="card-shadow">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Settings className="w-5 h-5" />
            <span>CMS Settings</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="whatsapp" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="whatsapp">WhatsApp</TabsTrigger>
              <TabsTrigger value="admin">Admin</TabsTrigger>
              <TabsTrigger value="backup">Backup</TabsTrigger>
              <TabsTrigger value="system">System</TabsTrigger>
            </TabsList>

            <TabsContent value="whatsapp" className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium">WhatsApp Chatbot</h3>
                    <p className="text-sm text-muted-foreground">
                      Configure the WhatsApp chatbot widget
                    </p>
                  </div>
                  <Switch
                    checked={whatsappSettings.enabled}
                    onCheckedChange={(enabled) => 
                      setWhatsappSettings(prev => ({ ...prev, enabled }))
                    }
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="whatsapp-phone">Phone Number</Label>
                    <Input
                      id="whatsapp-phone"
                      value={whatsappSettings.phoneNumber}
                      onChange={(e) => 
                        setWhatsappSettings(prev => ({ ...prev, phoneNumber: e.target.value }))
                      }
                      placeholder="7464003631"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="whatsapp-message">Default Message</Label>
                  <Textarea
                    id="whatsapp-message"
                    value={whatsappSettings.message}
                    onChange={(e) => 
                      setWhatsappSettings(prev => ({ ...prev, message: e.target.value }))
                    }
                    placeholder="Hello, I have a query about VAMPForge services"
                    rows={3}
                  />
                </div>

                <Button onClick={handleSaveWhatsApp}>
                  <Save className="w-4 h-4 mr-2" />
                  Save WhatsApp Settings
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="admin" className="space-y-4">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium">Admin Credentials</h3>
                  <p className="text-sm text-muted-foreground">
                    Update the admin login credentials
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="admin-email">Admin Email</Label>
                    <Input
                      id="admin-email"
                      type="email"
                      value={adminSettings.email}
                      onChange={(e) => 
                        setAdminSettings(prev => ({ ...prev, email: e.target.value }))
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="admin-password">Admin Password</Label>
                    <Input
                      id="admin-password"
                      type="password"
                      value={adminSettings.password}
                      onChange={(e) => 
                        setAdminSettings(prev => ({ ...prev, password: e.target.value }))
                      }
                    />
                  </div>
                </div>

                <Button onClick={handleSaveAdmin}>
                  <Save className="w-4 h-4 mr-2" />
                  Save Admin Settings
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="backup" className="space-y-4">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium">Data Backup & Restore</h3>
                  <p className="text-sm text-muted-foreground">
                    Export and import your CMS data
                  </p>
                </div>

                <div className="space-y-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Export Data</h4>
                          <p className="text-sm text-muted-foreground">
                            Download all CMS data as JSON
                          </p>
                        </div>
                        <Button onClick={handleExport}>
                          <Download className="w-4 h-4 mr-2" />
                          Export
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium">Import Data</h4>
                          <p className="text-sm text-muted-foreground">
                            Upload and restore from JSON backup
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Input
                            type="file"
                            accept=".json"
                            onChange={(e) => setImportFile(e.target.files?.[0] || null)}
                          />
                          <Button 
                            onClick={handleImport} 
                            disabled={!importFile}
                          >
                            <Upload className="w-4 h-4 mr-2" />
                            Import
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="system" className="space-y-4">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium">System Actions</h3>
                  <p className="text-sm text-muted-foreground">
                    Dangerous actions that affect the entire system
                  </p>
                </div>

                <Card className="border-destructive">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-destructive">Reset CMS</h4>
                        <p className="text-sm text-muted-foreground">
                          Reset all data to default values. This cannot be undone.
                        </p>
                      </div>
                      <Button variant="destructive" onClick={handleReset}>
                        <RotateCcw className="w-4 h-4 mr-2" />
                        Reset
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="space-y-2">
                      <h4 className="font-medium">System Information</h4>
                      <div className="text-sm text-muted-foreground space-y-1">
                        <p>Pages: {cmsData.pages.length}</p>
                        <p>Form Responses: {cmsData.formResponses.length}</p>
                        <p>Reviews: {cmsData.reviews.length}</p>
                        <p>Last Updated: {new Date().toLocaleString()}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default CMSSettings;