
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Layout } from "@/components/Layout";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";
import { GitBranch } from "lucide-react";

interface Branch {
  id: string;
  name: string;
  created_at: string;
}

export default function Branches() {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: branches, isLoading } = useQuery({
    queryKey: ["branches"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("branches")
        .select("*")
        .order("name");
      if (error) throw error;
      return data as Branch[];
    },
  });

  const addBranch = useMutation({
    mutationFn: async (name: string) => {
      const { error } = await supabase.from("branches").insert([{ name }]);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["branches"] });
      setOpen(false);
      toast({
        title: "Success",
        description: "Branch added successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <Layout>
      <div className="p-8 bg-white min-h-screen">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Branches</h1>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-primary/90">Add Branch</Button>
            </DialogTrigger>
            <DialogContent className="bg-white p-0">
              <DialogHeader className="px-6 pt-6 pb-2">
                <DialogTitle className="text-xl font-semibold text-gray-800">Add a new branch</DialogTitle>
              </DialogHeader>
              <div className="px-6 pb-6">
                <div className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <Label htmlFor="branch-name" className="text-sm font-medium flex items-center gap-2 text-gray-700">
                      <GitBranch className="w-4 h-4 text-primary" />
                      Branch Name
                    </Label>
                    <Input 
                      id="branch-name" 
                      className="bg-white border-gray-200 focus:border-primary focus:ring-primary h-10" 
                      placeholder="Enter branch name"
                    />
                  </div>
                  <div className="flex gap-3 pt-4">
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => setOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      className="flex-1 bg-primary hover:bg-primary/90"
                      onClick={() => {
                        const name = (
                          document.getElementById("branch-name") as HTMLInputElement
                        ).value;
                        if (!name.trim()) {
                          toast({
                            title: "Error",
                            description: "Please enter a branch name",
                            variant: "destructive",
                          });
                          return;
                        }
                        addBranch.mutate(name);
                      }}
                    >
                      Add Branch
                    </Button>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="font-semibold text-gray-700">Name</TableHead>
                <TableHead className="font-semibold text-gray-700">Created At</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {branches?.map((branch) => (
                <TableRow key={branch.id} className="hover:bg-gray-50">
                  <TableCell className="font-medium text-gray-900">{branch.name}</TableCell>
                  <TableCell className="text-gray-600">
                    {new Date(branch.created_at).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))}
              {branches?.length === 0 && (
                <TableRow>
                  <TableCell colSpan={2} className="text-center py-8 text-gray-500">
                    No branches found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </Layout>
  );
}
