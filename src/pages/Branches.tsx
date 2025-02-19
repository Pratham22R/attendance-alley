
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
import { GitBranch, Plus } from "lucide-react";

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
      <div className="p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Branches</h1>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Add Branch
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle className="text-xl font-semibold">Add a new branch</DialogTitle>
              </DialogHeader>
              <div className="mt-6 space-y-6 bg-white rounded-lg">
                <div className="space-y-3">
                  <Label 
                    htmlFor="branch-name" 
                    className="text-sm font-medium flex items-center gap-2 text-neutral-800"
                  >
                    <GitBranch className="w-4 h-4 text-primary" />
                    Branch Name
                  </Label>
                  <Input 
                    id="branch-name" 
                    className="bg-white border-input hover:bg-gray-50 transition-colors h-11" 
                    placeholder="Enter branch name"
                  />
                </div>
                <div className="flex gap-3 pt-4">
                  <Button
                    variant="outline"
                    className="flex-1 h-11"
                    onClick={() => {
                      const input = document.getElementById("branch-name") as HTMLInputElement;
                      if (input) input.value = "";
                      setOpen(false);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="flex-1 bg-primary hover:bg-primary/90 h-11"
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
            </DialogContent>
          </Dialog>
        </div>

        <div className="bg-white rounded-lg border shadow-sm">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-semibold">Name</TableHead>
                <TableHead className="font-semibold">Created At</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {branches?.map((branch) => (
                <TableRow key={branch.id}>
                  <TableCell>{branch.name}</TableCell>
                  <TableCell>
                    {new Date(branch.created_at).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </Layout>
  );
}
