import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

export function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await api.get('/api/blogs');
        setBlogs(response.data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
        toast.error('Failed to load blog posts');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto py-20 text-center">
        <p className="text-lg text-muted-foreground">Loading articles...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 px-4 max-w-6xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Agri-Knowledge Hub</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Expert advice, farming tips, and market trends to help you grow better.
        </p>
      </div>

      {blogs.length === 0 ? (
        <div className="text-center py-20 bg-muted/30 rounded-xl">
          <p className="text-xl text-muted-foreground">No articles published yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <Card key={blog._id} className="flex flex-col h-full hover:shadow-lg transition-shadow">
              {/* Image (Placeholder if none) */}
              <div className="h-48 bg-muted w-full overflow-hidden rounded-t-xl">
                {blog.images && blog.images.length > 0 ? (
                  <img 
                    src={blog.images[0]} 
                    alt={blog.title} 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground bg-secondary">
                    No Image
                  </div>
                )}
              </div>

              <CardHeader>
                <div className="flex gap-2 mb-2">
                  {blog.categories && blog.categories.map((cat) => (
                    <Badge key={cat._id} variant="secondary" className="text-xs">
                      {cat.name}
                    </Badge>
                  ))}
                </div>
                <CardTitle className="line-clamp-2 text-xl">
                  <Link to={`/blog/${blog._id}`} className="hover:text-primary transition-colors">
                    {blog.title}
                  </Link>
                </CardTitle>
              </CardHeader>

              <CardContent className="flex-grow">
                <p className="text-muted-foreground line-clamp-3 text-sm">
                  {blog.content}
                </p>
              </CardContent>

              <CardFooter className="border-t pt-4 mt-auto flex justify-between items-center text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <User className="size-3" />
                  <span>{blog.authorName}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="size-3" />
                  <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}