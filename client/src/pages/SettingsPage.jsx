import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

export function SettingsPage() {
  const { user } = useAuth(); // We will need to update context if we want live updates
  const [loading, setLoading] = useState(false);

  const form = useForm({
    defaultValues: {
      name: '',
      email: '',
      location: '',
      password: '',
      confirmPassword: '',
    }
  });

  // Pre-fill form
  useEffect(() => {
    if (user) {
      form.reset({
        name: user.name,
        email: user.email,
        location: user.location || '',
      });
    }
  }, [user, form]);

  const [selectedFile, setSelectedFile] = useState(null);

  const onSubmit = async (values) => {
    if (values.password && values.password !== values.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('name', values.name);
      formData.append('email', values.email);
      formData.append('location', values.location);
      if (values.password) formData.append('password', values.password);
      if (selectedFile) formData.append('profileImage', selectedFile);

      const { data } = await api.put('/api/auth/profile', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      // Update local storage so the navbar updates immediately
      localStorage.setItem('user', JSON.stringify(data));
      toast.success("Profile updated successfully");
      // Optional: window.location.reload() to refresh context
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-10">
      <Card>
        <CardHeader><CardTitle>Profile Settings</CardTitle></CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField control={form.control} name="name" render={({ field }) => (
                <FormItem><FormLabel>Name</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>
              )} />
              
              <FormField control={form.control} name="email" render={({ field }) => (
                <FormItem><FormLabel>Email</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>
              )} />

              <FormField control={form.control} name="location" render={({ field }) => (
                <FormItem><FormLabel>Location</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>
              )} />

              <FormItem>
                <FormLabel>Profile Picture</FormLabel>
                <FormControl>
                   <Input type="file" onChange={(e) => setSelectedFile(e.target.files[0])} />
                </FormControl>
              </FormItem>

              <div className="grid grid-cols-2 gap-4">
                <FormField control={form.control} name="password" render={({ field }) => (
                  <FormItem><FormLabel>New Password (Optional)</FormLabel><FormControl><Input type="password" {...field} /></FormControl></FormItem>
                )} />
                <FormField control={form.control} name="confirmPassword" render={({ field }) => (
                  <FormItem><FormLabel>Confirm Password</FormLabel><FormControl><Input type="password" {...field} /></FormControl></FormItem>
                )} />
              </div>

              <Button type="submit" disabled={loading} className="w-full">
                {loading ? <Loader2 className="animate-spin" /> : 'Update Profile'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}