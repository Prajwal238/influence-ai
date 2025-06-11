
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, UserPlus } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ManageUsersModalProps {
  isOpen: boolean;
  onClose: () => void;
  campaignName: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  initials: string;
}

const ManageUsersModal = ({ isOpen, onClose, campaignName }: ManageUsersModalProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [inviteEmail, setInviteEmail] = useState("");
  const [selectedRole, setSelectedRole] = useState("Member");
  
  // Mock current user data
  const currentUser: User = {
    id: "current",
    name: "You",
    email: "you@company.com",
    role: "Admin",
    initials: "YO"
  };

  const [users, setUsers] = useState<User[]>([currentUser]);

  const handleInviteUser = () => {
    if (inviteEmail.trim()) {
      const newUser: User = {
        id: Date.now().toString(),
        name: inviteEmail.split('@')[0],
        email: inviteEmail,
        role: selectedRole,
        initials: inviteEmail.substring(0, 2).toUpperCase()
      };
      setUsers([...users, newUser]);
      setInviteEmail("");
      setSelectedRole("Member");
    }
  };

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] p-0 gap-0">
        {/* Header with improved spacing */}
        <DialogHeader className="px-6 py-5 border-b border-border bg-muted/20">
          <div className="flex items-center justify-between gap-4">
            <div className="min-w-0 flex-1">
              <DialogTitle className="text-xl font-semibold text-foreground">Manage Users</DialogTitle>
              <p className="text-sm text-muted-foreground mt-1 truncate">
                Invite Users to {campaignName} and Manage their permissions
              </p>
            </div>
            <div className="flex-shrink-0">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search Users"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64 h-9"
                />
              </div>
            </div>
          </div>
        </DialogHeader>

        {/* Content with improved spacing */}
        <div className="flex-1 overflow-hidden">
          <Tabs defaultValue="users" className="h-full flex flex-col">
            {/* Tabs with better spacing */}
            <div className="px-6 pt-4 pb-2 border-b border-border">
              <TabsList className="bg-muted">
                <TabsTrigger value="users" className="flex items-center gap-2 px-4">
                  Users
                  <Badge variant="secondary" className="text-xs px-1.5 py-0.5">
                    {users.length}
                  </Badge>
                </TabsTrigger>
                <TabsTrigger value="groups" className="flex items-center gap-2 px-4">
                  Groups
                  <Badge variant="secondary" className="text-xs px-1.5 py-0.5">
                    0
                  </Badge>
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="users" className="flex-1 overflow-hidden m-0 p-6 space-y-6">
              {/* Invite Section with improved design */}
              <div className="bg-muted/30 rounded-lg p-4 border border-border">
                <div className="flex items-center gap-3">
                  <div className="flex-1">
                    <Input
                      placeholder="Enter email address to invite"
                      value={inviteEmail}
                      onChange={(e) => setInviteEmail(e.target.value)}
                      className="h-10"
                      type="email"
                    />
                  </div>
                  <Select value={selectedRole} onValueChange={setSelectedRole}>
                    <SelectTrigger className="w-32 h-10">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Admin">Admin</SelectItem>
                      <SelectItem value="Manager">Manager</SelectItem>
                      <SelectItem value="Member">Member</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button 
                    onClick={handleInviteUser}
                    disabled={!inviteEmail.trim()}
                    className="h-10 px-4"
                  >
                    <UserPlus className="h-4 w-4 mr-2" />
                    Send Invite
                  </Button>
                </div>
              </div>

              {/* Users Section with improved layout */}
              <div className="space-y-4">
                {/* Header with better typography */}
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-muted-foreground">Members ({filteredUsers.length})</h3>
                </div>

                {/* Users List with improved spacing */}
                <div className="space-y-2">
                  {filteredUsers.map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-3 hover:bg-muted/50 rounded-lg border border-transparent hover:border-border transition-all duration-200">
                      <div className="flex items-center gap-3 min-w-0 flex-1">
                        <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-medium flex-shrink-0">
                          {user.initials}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="font-medium text-foreground truncate">{user.name}</div>
                          <div className="text-sm text-muted-foreground truncate">{user.email}</div>
                        </div>
                      </div>
                      <div className="flex-shrink-0">
                        <Badge variant={user.role === 'Admin' ? 'default' : 'secondary'} className="text-xs">
                          {user.role}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Empty state */}
                {filteredUsers.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <p>No users found matching your search.</p>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="groups" className="flex-1 m-0 p-6">
              <div className="text-center py-12 text-muted-foreground">
                <p className="text-sm">No groups created yet</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ManageUsersModal;
