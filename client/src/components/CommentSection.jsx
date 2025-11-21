import { useState } from 'react';
import api from '../services/api';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from 'sonner';
import { useAuth } from '../contexts/AuthContext';

export function CommentSection({ blogId, comments, onCommentAdded }) {
  const { user } = useAuth();
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    setSubmitting(true);
    try {
      await api.post(`/api/blogs/${blogId}/comments`, { comment });
      toast.success('Comment posted!');
      setComment('');
      if (onCommentAdded) onCommentAdded(); // Refresh parent
    } catch (error) {
      toast.error('Failed to post comment');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mt-12 space-y-8">
      <h3 className="text-2xl font-bold">Comments ({comments.length})</h3>

      {/* Comment Form */}
      {user ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <Textarea
            placeholder="Share your thoughts..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <Button type="submit" disabled={submitting}>
            {submitting ? 'Posting...' : 'Post Comment'}
          </Button>
        </form>
      ) : (
        <div className="bg-muted/50 p-4 rounded-lg text-center">
          <p>Please login to post a comment.</p>
        </div>
      )}

      {/* Comment List */}
      <div className="space-y-6">
        {comments.map((c, index) => (
          <div key={index} className="flex gap-4 p-4 bg-card rounded-lg border">
            <Avatar>
              <AvatarFallback>{c.name?.[0]}</AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold">{c.name}</span>
                <span className="text-xs text-muted-foreground">
                  {new Date(c.createdAt || Date.now()).toLocaleDateString()}
                </span>
              </div>
              <p className="text-sm">{c.comment}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}