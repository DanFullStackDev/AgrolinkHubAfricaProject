import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, User, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

export function BlogDetailsPage() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await api.get(`/api/blogs/${id}`);
        setBlog(response.data);
      } catch (error) {
        console.error('Error fetching blog:', error);
        toast.error('Could not load article');
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto py-20 text-center">
        <p className="text-lg text-muted-foreground">Loading article...</p>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="container mx-auto py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Article not found</h2>
        <Button asChild>
          <Link to="/blog">Back to Blog</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 px-4 max-w-4xl">
      <Button variant="ghost" asChild className="mb-8 pl-0 hover:pl-2">
        <Link to="/blog">
          <ArrowLeft className="mr-2 size-4" /> Back to Articles
        </Link>
      </Button>

      <article className="space-y-8">
        {/* Header */}
        <div className="space-y-4 text-center">
          <div className="flex justify-center gap-2">
            {blog.categories && blog.categories.map((cat) => (
              <Badge key={cat._id}>{cat.name}</Badge>
            ))}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
            {blog.title}
          </h1>
          <div className="flex items-center justify-center gap-6 text-muted-foreground">
            <div className="flex items-center gap-2">
              <User className="size-4" />
              <span>{blog.authorName}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="size-4" />
              <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        {/* Featured Image */}
        {blog.images && blog.images.length > 0 && (
          <div className="aspect-video w-full overflow-hidden rounded-xl bg-muted">
            <img 
              src={blog.images[0]} 
              alt={blog.title} 
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Content */}
        <div className="prose prose-lg dark:prose-invert max-w-none">
          {/* Ideally use a markdown parser here, but for MVP simple text is fine */}
          <p className="whitespace-pre-wrap leading-relaxed text-gray-700 dark:text-gray-300">
            {blog.content}
          </p>
        </div>
      </article>
    </div>
  );
}