import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Eye, Edit, Trash2, Plus, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ConsumerListingsProps {
  components: any[];
  userId?: string; 
}

export const ConsumerListings: React.FC<ConsumerListingsProps> = ({ components, userId = 'c123' }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const { toast } = useToast();

  const userComponents = components.filter(c => c.consumerId === userId);

  const filteredComponents = userComponents.filter(c => {
    const matchesSearch = c.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleEdit = (id: string) => toast({ title: "Edit", description: "Edit not implemented." });
  const handleDelete = (id: string) => toast({ title: "Deleted", description: "Component removed." });

  const getStatusColor = (status: string) => {
    switch(status){
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Reserved': return 'bg-yellow-100 text-yellow-800';
      case 'Sold': return 'bg-gray-200 text-gray-700';
      default: return 'bg-gray-200 text-gray-700';
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-10">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">My Listings</h1>
          <p className="text-muted-foreground">Manage your uploaded components.</p>
        </div>
        <Link to="/consumer/upload">
          <Button className="flex items-center gap-2"><Plus className="w-4 h-4" /> Upload Component</Button>
        </Link>
      </div>

      {/* Search & Filter */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg"><Search className="w-5 h-5"/> Search & Filter</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col md:flex-row gap-4">
          <Input placeholder="Search components..." value={searchTerm} onChange={e=>setSearchTerm(e.target.value)} className="md:flex-1"/>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full md:w-48"><SelectValue placeholder="Filter by status"/></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Reserved">Reserved</SelectItem>
              <SelectItem value="Sold">Sold</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {filteredComponents.length === 0 ? (
        <Card className="shadow-sm text-center py-16">
          <CardContent>
            <Plus className="w-12 h-12 text-muted-foreground mx-auto mb-4"/>
            <h3 className="text-lg font-medium mb-2">No components found</h3>
            <p className="text-muted-foreground mb-4">{userComponents.length === 0 ? "No uploads yet." : "No matches."}</p>
            <Link to="/consumer/upload"><Button>Upload Your First Component</Button></Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredComponents.map(c => (
            <Card key={c.id} className="hover:shadow-md border rounded-xl">
              {c.images && c.images.length > 0 && (
              <img
                src={c.images[0]} // show first image
                alt={c.title}
                className="w-full h-40 object-cover rounded-t-xl"
              />
            )}
              <CardContent className="p-6 flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold line-clamp-1">{c.title}</h3>
                    <Badge className={getStatusColor(c.status)}>{c.status}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{c.description}</p>
                  <div className="space-y-1 text-sm text-muted-foreground mb-4">
                    <p>Category: {c.category}</p>
                    <p>Condition: {c.condition}</p>
                    <p>Location: {c.location}</p>
                    <p className="flex items-center gap-1"><Eye className="w-4 h-4"/> {c.views} views</p>
                  </div>
                  <div className="bg-accent/10 p-3 rounded-lg">
                    <p className="text-sm font-medium text-accent">AI Analysis</p>
                    <p className="text-sm text-muted-foreground">{c.aiCategory}</p>
                  </div>
                </div>
                <div className="mt-6 flex gap-2">
                  <Button variant="outline" size="sm" onClick={()=>handleEdit(c.id)} className="flex items-center gap-1"><Edit className="w-4 h-4"/> Edit</Button>
                  <Button variant="outline" size="sm" onClick={()=>handleDelete(c.id)} className="flex items-center gap-1 text-destructive hover:text-destructive"><Trash2 className="w-4 h-4"/> Delete</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
