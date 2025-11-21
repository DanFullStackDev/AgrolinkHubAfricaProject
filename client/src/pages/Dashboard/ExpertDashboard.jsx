import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PlusCircle, PenTool, Edit, Trash2, Loader2, FileText } from 'lucide-react';
import { toast } from 'sonner';

export function ExpertDashboard() {
  const { user } = useAuth();
  const [myBlogs, setMyBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMyBlogs = async () => {
    try {
      // Ideally, create a backend endpoint: GET /api/blogs/my-blogs
      // For MVP, we filter client-side like we did for Farmers
      const { data } = await api.get('/api/blogs');
      const userBlogs = data.filter(blog => 
        blog.authorId === user._id || blog.authorId._id === user._id
      );
      setMyBlogs(userBlogs);
    } catch (error) {
      console.error("Error fetching blogs:", error);
      toast.error("Failed to load articles");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyBlogs();
  }, [user]);

  const handleDelete = async (id) => {
    if(!window.confirm("Are you sure you want to delete this article?")) return;
    try {
      await api.delete(`/api/blogs/${id}`);
      toast.success("Article deleted");
      fetchMyBlogs();
    } catch (error) {
      toast.error("Failed to delete article");
    }
  };

  if (loading) return <div className="flex justify-center py-10"><Loader2 className="animate-spin" /></div>;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Expert Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, {user.name}</p>
        </div>
        <Button asChild>
          <Link to="/blog/new"><PenTool className="mr-2 size-4" /> Write Article</Link>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Published Articles</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{myBlogs.length}</div>
          </CardContent>
        </Card>
        {/* Add more stats like "Total Views" or "Comments" later */}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>My Articles</CardTitle>
        </CardHeader>
        <CardContent>
          {myBlogs.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">You haven't written any articles yet.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Categories</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {myBlogs.map((blog) => (
                  <TableRow key={blog._id}>
                    <TableCell className="font-medium">{blog.title}</TableCell>
                    <TableCell>{new Date(blog.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell>
                      {blog.categories?.map(c => c.name).join(', ')}
                    </TableCell>
                    <TableCell className="flex gap-2">
                      {/* Add Edit Blog Page later if needed */}
                      <Button variant="ghost" size="icon" className="text-blue-600 hover:bg-blue-50" asChild>
  <Link to={`/blog/edit/${blog._id}`}>
    <Edit className="size-4" />
  </Link>
</Button>
                      <Button variant="ghost" size="icon" className="text-red-600" onClick={() => handleDelete(blog._id)}>
                        <Trash2 className="size-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}