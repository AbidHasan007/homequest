'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Search, 
  Edit, 
  Trash2, 
  Users, 
  User, 
  Mail, 
  Phone, 
  Calendar,
  Shield,
  Building2,
  Home,
  AlertTriangle,
  MoreHorizontal,
  Filter,
  Download
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetAllUsersQuery, useUpdateUserMutation, useDeleteUserMutation } from '@/state/api';

interface User {
  id: number;
  cognitoId: string;
  name: string;
  email: string;
  phoneNumber: string;
  userType: 'tenant' | 'landlord' | 'admin';
  createdAt: string;
  isActive: boolean;
  lastLogin?: string;
  verificationStatus?: string;
  propertyCount?: number;
  applicationCount?: number;
  nidStatus?: 'PENDING' | 'VERIFIED' | 'REJECTED';
  verifiedAt?: string;
  rejectedAt?: string;
}

const UserManagementPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUserType, setSelectedUserType] = useState<string>('all');
  const [selectedVerificationStatus, setSelectedVerificationStatus] = useState<string>('all');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [editForm, setEditForm] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    userType: '' as 'tenant' | 'landlord' | 'admin',
    isActive: true,
    nidStatus: 'PENDING' as 'PENDING' | 'VERIFIED' | 'REJECTED'
  });

  // RTK Query hooks
  const { 
    data: users = [], 
    isLoading, 
    error, 
    refetch 
  } = useGetAllUsersQuery();
  
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();
  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();

  // Filter users based on search and type
  const filteredUsers = users.filter((user: User) => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.phoneNumber.includes(searchTerm);
    const matchesType = selectedUserType === 'all' || user.userType === selectedUserType;
    
    // Verification status filter (only for landlords)
    const matchesVerification = selectedVerificationStatus === 'all' || 
                               (user.userType === 'landlord' && 
                                (user.nidStatus || 'PENDING') === selectedVerificationStatus) ||
                               (user.userType !== 'landlord' && selectedVerificationStatus === 'all');
    
    return matchesSearch && matchesType && matchesVerification;
  });

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setEditForm({
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber,
      userType: user.userType,
      isActive: user.isActive,
      nidStatus: user.nidStatus || 'PENDING'
    });
    setIsEditModalOpen(true);
  };

  const handleDeleteUser = (user: User) => {
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
  };

  const handleUpdateSubmit = async () => {
    if (!selectedUser) return;

    const updateData = {
      cognitoId: selectedUser.cognitoId,
      ...editForm
    };
    
    console.log('Sending update request:', updateData);

    try {
      await updateUser(updateData).unwrap();
      setIsEditModalOpen(false);
      setSelectedUser(null);
      refetch();
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!selectedUser) return;

    try {
      await deleteUser(selectedUser.cognitoId).unwrap();
      setIsDeleteModalOpen(false);
      setSelectedUser(null);
      refetch();
    } catch (error: any) {
      console.error('Error deleting user:', error);
      
      // Show user-friendly error message
      let errorMessage = 'Failed to delete user. Please try again.';
      
      if (error?.data?.message) {
        errorMessage = error.data.message;
      } else if (error?.message) {
        errorMessage = error.message;
      }
      
      // You can replace this with a proper toast/notification system
      alert(`Error: ${errorMessage}`);
    }
  };

  const getUserTypeIcon = (userType: string) => {
    switch (userType) {
      case 'admin': return <Shield className="w-4 h-4" />;
      case 'landlord': return <Building2 className="w-4 h-4" />;
      case 'tenant': return <Home className="w-4 h-4" />;
      default: return <User className="w-4 h-4" />;
    }
  };

  const getUserTypeBadge = (userType: string) => {
    const colors = {
      admin: 'bg-red-100 text-red-800',
      landlord: 'bg-blue-100 text-blue-800',
      tenant: 'bg-green-100 text-green-800'
    };
    return colors[userType as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading users...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <Alert className="border-red-200 bg-red-50">
          <AlertTriangle className="w-4 h-4 text-red-600" />
          <AlertDescription className="text-red-800">
            Error loading users. Please try refreshing the page.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">User Management</h1>
        <p className="text-gray-600">
          Manage all platform users including tenants, landlords, and administrators.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-2xl font-bold text-gray-900">{users.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg">
                <Home className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Tenants</p>
                <p className="text-2xl font-bold text-gray-900">
                  {users.filter((u: User) => u.userType === 'tenant').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg">
                <Building2 className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Landlords</p>
                <p className="text-2xl font-bold text-gray-900">
                  {users.filter((u: User) => u.userType === 'landlord').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="flex items-center justify-center w-12 h-12 bg-red-100 rounded-lg">
                <Shield className="w-6 h-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Admins</p>
                <p className="text-2xl font-bold text-gray-900">
                  {users.filter((u: User) => u.userType === 'admin').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by name, email, or phone..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={selectedUserType} onValueChange={setSelectedUserType}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Users</SelectItem>
                <SelectItem value="tenant">Tenants</SelectItem>
                <SelectItem value="landlord">Landlords</SelectItem>
                <SelectItem value="admin">Admins</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedVerificationStatus} onValueChange={setSelectedVerificationStatus}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by verification" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Verification</SelectItem>
                <SelectItem value="PENDING">Pending</SelectItem>
                <SelectItem value="VERIFIED">Verified</SelectItem>
                <SelectItem value="REJECTED">Rejected</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="w-full md:w-auto">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>Users ({filteredUsers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Verification</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead>Last Login</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user: User) => (
                  <TableRow key={user.cognitoId}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full">
                          {getUserTypeIcon(user.userType)}
                        </div>
                        <div>
                          <div className="font-medium">{user.name}</div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getUserTypeBadge(user.userType)}>
                        {user.userType.charAt(0).toUpperCase() + user.userType.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center text-sm">
                          <Mail className="w-3 h-3 mr-1 text-gray-400" />
                          {user.email}
                        </div>
                        <div className="flex items-center text-sm">
                          <Phone className="w-3 h-3 mr-1 text-gray-400" />
                          {user.phoneNumber}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={user.isActive ? "default" : "secondary"}>
                        {user.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {user.userType === 'landlord' ? (
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${
                            user.nidStatus === 'VERIFIED' ? 'bg-green-500' :
                            user.nidStatus === 'REJECTED' ? 'bg-red-500' :
                            'bg-yellow-500'
                          }`}></div>
                          <span className="text-sm">
                            {user.nidStatus === 'VERIFIED' ? 'Verified' :
                             user.nidStatus === 'REJECTED' ? 'Rejected' :
                             'Pending'}
                          </span>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-400">N/A</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center text-sm">
                        <Calendar className="w-3 h-3 mr-1 text-gray-400" />
                        {new Date(user.createdAt).toLocaleDateString()}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm text-gray-500">
                        {user.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : 'Never'}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleEditUser(user)}>
                            <Edit className="w-4 h-4 mr-2" />
                            Edit User
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => handleDeleteUser(user)}
                            className="text-red-600"
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete User
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredUsers.length === 0 && (
            <div className="text-center py-12">
              <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No users found</h3>
              <p className="text-gray-500">
                {searchTerm || selectedUserType !== 'all' || selectedVerificationStatus !== 'all'
                  ? 'Try adjusting your search criteria.' 
                  : 'No users have been registered yet.'}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Edit User Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>
              Update user information. Changes will be reflected immediately.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={editForm.name}
                onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={editForm.email}
                onChange={(e) => setEditForm(prev => ({ ...prev, email: e.target.value }))}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={editForm.phoneNumber}
                onChange={(e) => setEditForm(prev => ({ ...prev, phoneNumber: e.target.value }))}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="userType">User Type</Label>
              <Select 
                value={editForm.userType} 
                onValueChange={(value: 'tenant' | 'landlord' | 'admin') => 
                  setEditForm(prev => ({ ...prev, userType: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tenant">Tenant</SelectItem>
                  <SelectItem value="landlord">Landlord</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {editForm.userType === 'landlord' && (
              <div className="grid gap-2">
                <Label htmlFor="nidStatus">NID Verification Status</Label>
                <Select 
                  value={editForm.nidStatus} 
                  onValueChange={(value: 'PENDING' | 'VERIFIED' | 'REJECTED') => 
                    setEditForm(prev => ({ ...prev, nidStatus: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select verification status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PENDING">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                        Pending
                      </div>
                    </SelectItem>
                    <SelectItem value="VERIFIED">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                        Verified
                      </div>
                    </SelectItem>
                    <SelectItem value="REJECTED">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-red-500"></div>
                        Rejected
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="isActive"
                checked={editForm.isActive}
                onChange={(e) => setEditForm(prev => ({ ...prev, isActive: e.target.checked }))}
                className="rounded"
              />
              <Label htmlFor="isActive">Active Account</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateSubmit} disabled={isUpdating}>
              {isUpdating ? 'Updating...' : 'Update User'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete User Modal */}
      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Delete User</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete <strong>{selectedUser?.name}</strong>? 
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Alert className="border-red-200 bg-red-50">
              <AlertTriangle className="w-4 h-4 text-red-600" />
              <AlertDescription className="text-red-800">
                <strong>Warning:</strong> This action cannot be undone and will permanently delete:
                <ul className="mt-2 ml-4 list-disc text-sm">
                  {selectedUser?.userType === 'landlord' && (
                    <>
                      <li>All properties owned by this landlord</li>
                      <li>All applications for their properties</li>
                      <li>All leases and rental agreements</li>
                      <li>All reviews and ratings</li>
                    </>
                  )}
                  {selectedUser?.userType === 'tenant' && (
                    <>
                      <li>All rental applications</li>
                      <li>All active and past leases</li>
                      <li>All reviews and ratings</li>
                      <li>All favorite properties</li>
                    </>
                  )}
                  {selectedUser?.userType === 'admin' && (
                    <li>Admin account and permissions</li>
                  )}
                </ul>
              </AlertDescription>
            </Alert>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)}>
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleDeleteConfirm} 
              disabled={isDeleting}
            >
              {isDeleting ? 'Deleting...' : 'Delete User'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserManagementPage;