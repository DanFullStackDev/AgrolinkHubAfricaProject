import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import api from '../../services/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

const formSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  category: z.string().min(1),
  price: z.any(), // Handle number/string conversion
  quantity: z.any(),
  unit: z.string().min(1),
  location: z.string().min(3),
});

export function EditProducePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '', description: '', category: '', price: '', quantity: '', unit: '', location: ''
    },
  });

  // 1. Fetch existing data
  useEffect(() => {
    const fetchProduce = async () => {
      try {
        const { data } = await api.get(`/api/produce/${id}`);
        // Reset form with fetched data
        form.reset({
          title: data.title,
          description: data.description,
          category: data.category,
          price: data.price.toString(),
          quantity: data.quantity.toString(),
          unit: data.unit,
          location: data.location,
        });
      } catch (error) {
        toast.error("Failed to fetch produce details");
        navigate('/dashboard');
      } finally {
        setLoading(false);
      }
    };
    fetchProduce();
  }, [id, form, navigate]);

  // 2. Handle Update
  const onSubmit = async (values) => {
    try {
      setIsSubmitting(true);
      // We send JSON here because we aren't updating images in this simple version
      await api.put(`/api/produce/${id}`, values);
      toast.success('Produce updated successfully!');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Update failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <div className="flex justify-center py-10"><Loader2 className="animate-spin" /></div>;

  return (
    <div className="max-w-2xl mx-auto py-8">
      <Card>
        <CardHeader><CardTitle>Edit Produce</CardTitle></CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Reuse your form fields from CreateProducePage here... */}
              {/* Example Title Field */}
              <FormField control={form.control} name="title" render={({ field }) => (
                <FormItem><FormLabel>Title</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              
              {/* Add the rest of the fields: Category, Price, Quantity, Unit, Location, Description */}
              {/* ... (Copy fields from CreateProducePage) ... */}

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? 'Updating...' : 'Update Produce'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}