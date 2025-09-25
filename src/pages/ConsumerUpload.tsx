import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload, Camera, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ConsumerUploadProps {
  onAddComponent: (newComponent: any) => void; 
}

export const ConsumerUpload: React.FC<ConsumerUploadProps> = ({ onAddComponent }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    condition: '',
    location: '',
    category: ''
  });
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Local image preview
  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const urls = Array.from(e.target.files).map(file => URL.createObjectURL(file));
    setUploadedImages(urls);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const newComponent = {
      id: 'l' + Date.now(),
      title: formData.title,
      description: formData.description,
      condition: formData.condition,
      location: formData.location,
      category: formData.category,
      images: uploadedImages.length > 0 ? uploadedImages : ['/placeholder.svg'],
      aiCategory: 'Pending AI Analysis',
      uploadDate: new Date().toISOString().split('T')[0],
      views: 0,
      status: 'Active',
      consumerId: 'c123', 
      consumerName: 'Aarav Mehta',
    };

    onAddComponent(newComponent);

    setTimeout(() => {
      toast({
        title: "Component uploaded successfully!",
        description: "Your component is now live on the marketplace.",
      });
      navigate('/consumer/listings');
    }, 500);
  };

  const conditions = ['Excellent', 'Good', 'Fair', 'Poor'];
  const categories = ['Motherboard', 'Memory', 'Logic Board', 'Power Supply', 'Hard Drive', 'Graphics Card', 'Processor', 'Other'];

  return (
    <div className="container mx-auto p-6 max-w-2xl">
      <h1 className="text-3xl font-bold mb-2">Upload Component</h1>
      <p className="text-muted-foreground mb-6">List your electronic component for reuse</p>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Upload Photos */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Camera className="w-5 h-5" /> Component Photos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
              <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-lg font-medium mb-2">Upload Photos</p>
              <Button
                type="button"
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
              >
                Choose Files
              </Button>
              <input
                type="file"
                accept="image/*"
                multiple
                ref={fileInputRef}
                onChange={handleFiles}
                className="hidden"
              />
              <div className="flex flex-wrap mt-4 gap-2 justify-center">
                {uploadedImages.map((url, i) => (
                  <img key={i} src={url} alt="preview" className="w-20 h-20 object-cover rounded" />
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Component Details */}
        <Card>
          <CardHeader><CardTitle>Component Details</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                placeholder="e.g., MacBook Pro 2019 Motherboard"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                placeholder="Describe condition, issues, reason for disposal"
                rows={4}
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                  <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
                  <SelectContent>
                    {categories.map(cat => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="condition">Condition *</Label>
                <Select value={formData.condition} onValueChange={(value) => handleInputChange('condition', value)}>
                  <SelectTrigger><SelectValue placeholder="Select condition" /></SelectTrigger>
                  <SelectContent>
                    {conditions.map(cond => <SelectItem key={cond} value={cond}>{cond}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location *</Label>
              <Input
                id="location"
                placeholder="e.g., New York, NY"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                required
              />
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex gap-4">
          <Button type="button" variant="outline" className="flex-1" onClick={() => navigate('/consumer/dashboard')}>Cancel</Button>
          <Button
            type="submit"
            className="flex-1"
            disabled={loading || !formData.title || !formData.description || !formData.condition || !formData.location || !formData.category}
          >
            {loading ? 'Uploading...' : 'Upload Component'}
          </Button>
        </div>
      </form>
    </div>
  );
};
