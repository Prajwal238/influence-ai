
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
      <DialogContent className="max-w-4xl h-[600px] p-0">
        <DialogHeader className="p-6 pb-4 border-b">
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-xl font-semibold">Manage Users</DialogTitle>
              <p className="text-sm text-gray-600 mt-1">
                Invite Users to {campaignName} and Manage their permissions
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search Users"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
            </div>
          </div>
        </DialogHeader>

        <div className="flex-1 p-6">
          <Tabs defaultValue="users" className="h-full">
            <TabsList className="mb-6">
              <TabsTrigger value="users" className="flex items-center gap-2">
                Users
                <Badge variant="secondary" className="ml-1">
                  {users.length}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="groups" className="flex items-center gap-2">
                Groups
                <Badge variant="secondary" className="ml-1">
                  0
                </Badge>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="users" className="space-y-4">
              {/* Invite Section */}
              <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                <Input
                  placeholder="Enter email address to invite"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  className="flex-1"
                  type="email"
                />
                <Select value={selectedRole} onValueChange={setSelectedRole}>
                  <SelectTrigger className="w-32">
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
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Send Invite
                </Button>
              </div>

              {/* Users Table Header */}
              <div className="grid grid-cols-12 gap-4 px-4 py-2 text-sm font-medium text-gray-500 border-b">
                <div className="col-span-8">Members</div>
                <div className="col-span-4">Role</div>
              </div>

              {/* Users List */}
              <div className="space-y-2">
                {filteredUsers.map((user) => (
                  <div key={user.id} className="grid grid-cols-12 gap-4 px-4 py-3 hover:bg-gray-50 rounded-lg items-center">
                    <div className="col-span-8 flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                        {user.initials}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </div>
                    <div className="col-span-4">
                      <Badge variant={user.role === 'Admin' ? 'default' : 'secondary'}>
                        {user.role}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="groups">
              <div className="text-center py-12 text-gray-500">
                No groups created yet
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ManageUsersModal;
