
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { Switch } from '@/components/ui/switch';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface EmailNotificationProps {
  studentId: string;
}

export const EmailNotificationSettings = ({ studentId }: EmailNotificationProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: notification } = useQuery({
    queryKey: ['email-notification', studentId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('email_notifications')
        .select('*')
        .eq('student_id', studentId)
        .maybeSingle();

      if (error) throw error;
      return data;
    },
  });

  const updateNotification = useMutation({
    mutationFn: async ({ email, notify_on_absent }: { email: string; notify_on_absent: boolean }) => {
      if (notification) {
        const { error } = await supabase
          .from('email_notifications')
          .update({ email, notify_on_absent })
          .eq('id', notification.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('email_notifications')
          .insert([{ student_id: studentId, email, notify_on_absent }]);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['email-notification', studentId] });
      setIsOpen(false);
      toast({
        title: 'Success',
        description: 'Email notification settings updated successfully',
      });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    updateNotification.mutate({
      email: formData.get('email') as string,
      notify_on_absent: formData.get('notify_on_absent') === 'on',
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Email Settings</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Email Notification Settings</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email">Notification Email</label>
            <Input
              id="email"
              name="email"
              type="email"
              defaultValue={notification?.email || ''}
              required
            />
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="notify_on_absent"
              name="notify_on_absent"
              defaultChecked={notification?.notify_on_absent ?? true}
            />
            <label htmlFor="notify_on_absent">
              Notify when marked as absent
            </label>
          </div>
          <Button type="submit" className="w-full">
            Save Settings
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
