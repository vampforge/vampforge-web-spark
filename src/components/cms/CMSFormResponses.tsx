import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Eye, Trash2, Check, Clock, MessageSquare, Calendar } from 'lucide-react';
import { useCMSData } from '@/hooks/useCMSData';
import { useToast } from '@/hooks/use-toast';

const CMSFormResponses = () => {
  const { cmsData, updateFormResponse, deleteFormResponse } = useCMSData();
  const { toast } = useToast();
  const [selectedResponse, setSelectedResponse] = useState<any>(null);

  const contactResponses = cmsData.formResponses.filter(r => r.type === 'contact');
  const scheduleResponses = cmsData.formResponses.filter(r => r.type === 'call');
  const projectResponses = cmsData.formResponses.filter(r => r.type === 'project');

  const handleMarkAsRead = (responseId: string) => {
    updateFormResponse(responseId, { status: 'read' });
    toast({
      title: "Marked as Read",
      description: "Response has been marked as read.",
    });
  };

  const handleDelete = (responseId: string) => {
    deleteFormResponse(responseId);
    setSelectedResponse(null);
    toast({
      title: "Response Deleted",
      description: "Form response has been deleted.",
    });
  };

  const ResponseCard = ({ response, type }: { response: any; type: string }) => (
    <div className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 rounded-full bg-primary"></div>
          <span className="font-medium">{response.data.name || 'Anonymous'}</span>
          {response.status === 'unread' && (
            <Badge variant="secondary" className="text-xs">New</Badge>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSelectedResponse(response)}
          >
            <Eye className="w-4 h-4" />
          </Button>
          {response.status === 'unread' && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleMarkAsRead(response.id)}
            >
              <Check className="w-4 h-4" />
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleDelete(response.id)}
            className="text-destructive hover:text-destructive"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
      
      <div className="space-y-2 text-sm">
        <p><strong>Email:</strong> {response.data.email}</p>
        {type === 'contact' && response.data.projectType && (
          <p><strong>Project Type:</strong> {response.data.projectType}</p>
        )}
        {type === 'schedule' && response.data.preferredDateTime && (
          <p><strong>Preferred Date/Time:</strong> {response.data.preferredDateTime}</p>
        )}
        <p><strong>Message:</strong> {response.data.message}</p>
        <p className="text-muted-foreground text-xs">
          <Clock className="w-3 h-3 inline mr-1" />
          {new Date(response.timestamp).toLocaleString()}
        </p>
      </div>
    </div>
  );

  if (selectedResponse) {
    return (
      <Card className="card-shadow">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Response Details</span>
            <div className="flex space-x-2">
              <Button variant="outline" onClick={() => setSelectedResponse(null)}>
                Back
              </Button>
              {selectedResponse.status === 'unread' && (
                <Button onClick={() => handleMarkAsRead(selectedResponse.id)}>
                  <Check className="w-4 h-4 mr-2" />
                  Mark as Read
                </Button>
              )}
              <Button 
                variant="destructive" 
                onClick={() => handleDelete(selectedResponse.id)}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Form Type</label>
                <p className="text-lg font-medium capitalize">{selectedResponse.type}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Submitted</label>
                <p className="text-lg">{new Date(selectedResponse.timestamp).toLocaleString()}</p>
              </div>
            </div>

            <div className="space-y-4">
              {Object.entries(selectedResponse.data).map(([key, value]) => (
                <div key={key}>
                  <label className="text-sm font-medium text-muted-foreground capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </label>
                  <p className="text-lg border rounded p-3 bg-muted/30">
                    {value as string}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex items-center space-x-2 p-3 bg-muted/50 rounded">
              {selectedResponse.status === 'read' ? (
                <Check className="w-4 h-4 text-green-500" />
              ) : (
                <Clock className="w-4 h-4 text-orange-500" />
              )}
              <span className="text-sm">
                {selectedResponse.status === 'read' ? 'Read' : 'Unread'}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="card-shadow">
      <CardHeader>
        <CardTitle>Form Responses</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="contact" className="w-full">
          <TabsList>
            <TabsTrigger value="contact" className="flex items-center space-x-2">
              <MessageSquare className="w-4 h-4" />
              <span>Contact Forms ({contactResponses.length})</span>
            </TabsTrigger>
            <TabsTrigger value="schedule" className="flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span>Schedule Calls ({scheduleResponses.length})</span>
            </TabsTrigger>
            <TabsTrigger value="project" className="flex items-center space-x-2">
              <MessageSquare className="w-4 h-4" />
              <span>Projects ({projectResponses.length})</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="contact" className="space-y-4">
            {contactResponses.length === 0 ? (
              <div className="text-center py-8">
                <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No contact form responses yet</p>
              </div>
            ) : (
              <div className="space-y-4">
                {contactResponses.map((response) => (
                  <ResponseCard key={response.id} response={response} type="contact" />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="schedule" className="space-y-4">
            {scheduleResponses.length === 0 ? (
              <div className="text-center py-8">
                <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No schedule call responses yet</p>
              </div>
            ) : (
              <div className="space-y-4">
                {scheduleResponses.map((response) => (
                  <ResponseCard key={response.id} response={response} type="schedule" />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="project" className="space-y-4">
            {projectResponses.length === 0 ? (
              <div className="text-center py-8">
                <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No project requests yet</p>
              </div>
            ) : (
              <div className="space-y-4">
                {projectResponses.map((response) => (
                  <ResponseCard key={response.id} response={response} type="project" />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default CMSFormResponses;