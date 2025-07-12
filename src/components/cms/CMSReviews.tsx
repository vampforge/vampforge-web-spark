import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

import { Star, Plus, Edit, Trash2, Save, X } from 'lucide-react';
import { useCMSData } from '@/hooks/useCMSData';
import { useToast } from '@/hooks/use-toast';

interface Review {
  id: string;
  name: string;
  content: string;
  rating: number;
  position: number;
}

const CMSReviews = () => {
  const { cmsData, updateReviews } = useCMSData();
  const { toast } = useToast();
  const [editingReview, setEditingReview] = useState<Review | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newReview, setNewReview] = useState({
    name: '',
    content: '',
    rating: 5
  });

  const handleEditReview = (review: Review) => {
    setEditingReview({ ...review });
    setShowAddForm(false);
  };

  const handleSaveEdit = () => {
    if (!editingReview) return;
    
    const updatedReviews = cmsData.reviews.map(review =>
      review.id === editingReview.id ? editingReview : review
    );
    
    updateReviews(updatedReviews);
    setEditingReview(null);
    
    toast({
      title: "Review Updated",
      description: "Customer review has been updated successfully.",
    });
  };

  const handleDeleteReview = (reviewId: string) => {
    if (!confirm('Are you sure you want to delete this review?')) return;
    
    const updatedReviews = cmsData.reviews.filter(review => review.id !== reviewId);
    updateReviews(updatedReviews);
    
    toast({
      title: "Review Deleted",
      description: "Customer review has been deleted.",
    });
  };

  const handleAddReview = () => {
    if (!newReview.name || !newReview.content) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }
    
    const review: Review = {
      id: Date.now().toString(),
      name: newReview.name,
      content: newReview.content,
      rating: newReview.rating,
      position: cmsData.reviews.length + 1
    };
    
    updateReviews([...cmsData.reviews, review]);
    setNewReview({ name: '', content: '', rating: 5 });
    setShowAddForm(false);
    
    toast({
      title: "Review Added",
      description: "New customer review has been added.",
    });
  };

  const renderStars = (rating: number, interactive = false, onChange?: (rating: number) => void) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-5 h-5 ${
              star <= rating 
                ? 'fill-yellow-400 text-yellow-400' 
                : 'text-gray-300'
            } ${interactive ? 'cursor-pointer hover:text-yellow-400' : ''}`}
            onClick={() => interactive && onChange?.(star)}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <Card className="card-shadow">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Customer Reviews Management</span>
            <Button onClick={() => setShowAddForm(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Review
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Add Review Form */}
          {showAddForm && (
            <Card className="mb-6 border-primary">
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-lg">
                  <span>Add New Review</span>
                  <Button variant="ghost" size="sm" onClick={() => setShowAddForm(false)}>
                    <X className="w-4 h-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="new-name">Customer Name</Label>
                    <Input
                      id="new-name"
                      value={newReview.name}
                      onChange={(e) => setNewReview(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Rating</Label>
                    {renderStars(newReview.rating, true, (rating) => 
                      setNewReview(prev => ({ ...prev, rating }))
                    )}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="new-content">Review Content</Label>
                  <Textarea
                    id="new-content"
                    value={newReview.content}
                    onChange={(e) => setNewReview(prev => ({ ...prev, content: e.target.value }))}
                    placeholder="Write the customer review here..."
                    rows={4}
                  />
                </div>
                
                <div className="flex space-x-2">
                  <Button onClick={handleAddReview}>
                    <Save className="w-4 h-4 mr-2" />
                    Add Review
                  </Button>
                  <Button variant="outline" onClick={() => setShowAddForm(false)}>
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Reviews List */}
          <div className="space-y-4">
            {cmsData.reviews.length === 0 ? (
              <div className="text-center py-8">
                <Star className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No customer reviews yet</p>
              </div>
            ) : (
              cmsData.reviews.map((review) => (
                <Card key={review.id} className="border">
                  <CardContent className="p-4">
                    {editingReview?.id === review.id ? (
                      /* Edit Form */
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Customer Name</Label>
                            <Input
                              value={editingReview.name}
                              onChange={(e) => setEditingReview(prev => 
                                prev ? { ...prev, name: e.target.value } : null
                              )}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Rating</Label>
                            {renderStars(editingReview.rating, true, (rating) => 
                              setEditingReview(prev => 
                                prev ? { ...prev, rating } : null
                              )
                            )}
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label>Review Content</Label>
                          <Textarea
                            value={editingReview.content}
                            onChange={(e) => setEditingReview(prev => 
                              prev ? { ...prev, content: e.target.value } : null
                            )}
                            rows={4}
                          />
                        </div>
                        
                        <div className="flex space-x-2">
                          <Button onClick={handleSaveEdit}>
                            <Save className="w-4 h-4 mr-2" />
                            Save Changes
                          </Button>
                          <Button variant="outline" onClick={() => setEditingReview(null)}>
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      /* Display Review */
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <h3 className="font-medium">{review.name}</h3>
                            {renderStars(review.rating)}
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEditReview(review)}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteReview(review.id)}
                              className="text-destructive hover:text-destructive"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                        
                        <p className="text-muted-foreground italic">
                          "{review.content}"
                        </p>
                        
                        <div className="text-xs text-muted-foreground">
                          Position: {review.position}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CMSReviews;