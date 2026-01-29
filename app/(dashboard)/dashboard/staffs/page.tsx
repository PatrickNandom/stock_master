"use client";

import { useState, useEffect } from "react";
import { User } from "@/app/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
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
  DropdownMenuLabel,
  DropdownMenuSeparator,
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, Shield, UserCog, Eye, Trash2 } from "lucide-react";
import Link from "next/link";

interface StaffResponse {
  staff: User[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

const StaffsPage = () => {
  const [staffs, setStaffs] = useState<User[]>([]);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [selectedStaff, setSelectedStaff] = useState<User | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [actionType, setActionType] = useState<"promote" | "demote" | null>(
    null,
  );
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    fetchStaffs();
  }, []);

  const fetchStaffs = async (page: number = 1) => {
    try {
      setIsLoading(true);
      setError("");

      const response = await fetch(`/api/staff?page=${page}&limit=10`);

      if (!response.ok) {
        const text = await response.text();
        console.error("API error response:", response.status, text);
        throw new Error("Failed to fetch staff");
      }

      const data: StaffResponse = await response.json();

      setStaffs(data.staff || []);
      setPagination(data.pagination);
    } catch (error) {
      console.error("Error fetching staffs:", error);
      setError(
        error instanceof Error ? error.message : "Failed to load staff members",
      );
      setStaffs([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRoleChange = (staff: User, newRole: "ADMIN" | "STAFF") => {
    setSelectedStaff(staff);
    setActionType(newRole === "ADMIN" ? "promote" : "demote");
    setDialogOpen(true);
  };

  const confirmRoleChange = async () => {
    if (!selectedStaff || !actionType) return;

    const newRole = actionType === "promote" ? "ADMIN" : "STAFF";
    setIsUpdating(true);

    try {
      const response = await fetch(`/api/staff/${selectedStaff.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: newRole }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update role");
      }

      // Update local state
      setStaffs(
        staffs.map((staff) =>
          staff.id === selectedStaff.id ? { ...staff, role: newRole } : staff,
        ),
      );

      setDialogOpen(false);
      setSelectedStaff(null);
      setActionType(null);
    } catch (error) {
      console.error("Error updating role:", error);
      setError(
        error instanceof Error ? error.message : "Failed to update staff role",
      );
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDeleteClick = (staff: User) => {
    setSelectedStaff(staff);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedStaff) return;

    setIsDeleting(true);

    try {
      const response = await fetch(`/api/staff/${selectedStaff.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to delete staff");
      }

      // Remove from local state
      setStaffs(staffs.filter((staff) => staff.id !== selectedStaff.id));

      // Update pagination total
      setPagination((prev) => ({
        ...prev,
        total: prev.total - 1,
        totalPages: Math.ceil((prev.total - 1) / prev.limit),
      }));

      setDeleteDialogOpen(false);
      setSelectedStaff(null);
    } catch (error) {
      console.error("Error deleting staff:", error);
      setError(
        error instanceof Error
          ? error.message
          : "Failed to delete staff member",
      );
      setDeleteDialogOpen(false);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleViewDetails = (staffId: string) => {
    router.push(`/dashboard/staffs/${staffId}`);
  };

  const handlePageChange = (newPage: number) => {
    fetchStaffs(newPage);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-4">
        <div className="flex items-center justify-center min-h-100">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#E85C33]"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-4">
      <div className="flex items-baseline justify-between gap-10 mb-4">
        <Image
          src="/auth_left-arrow.svg"
          className="hidden sm:block cursor-pointer self-start"
          alt="Back"
          width={20}
          height={20}
          priority
          onClick={() => router.back()}
        />
        <Link
          href="/dashboard/staffs/add-staff"
          className="text-xl text-[#E67E5D] font-bold flex items-center"
        >
          <span className="bg-[#E67E5D] flex items-center justify-center rounded-full mr-2 w-6 h-6">
            <Image
              src="/dashboard_add_icon.svg"
              alt="add-icon"
              height={20}
              width={20}
            />
          </span>
          Add Staff
        </Link>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 flex justify-between items-center">
          <span>{error}</span>
          <button
            onClick={() => setError("")}
            className="text-red-700 hover:text-red-900 font-bold"
          >
            ✕
          </button>
        </div>
      )}

      <div className="rounded-md border">
        <Table>
          <TableHeader className="bg-linear-to-r from-[#F7AB97] to-[#071548]">
            <TableRow>
              <TableHead className="text-white">Name</TableHead>
              <TableHead className="text-white">Email</TableHead>
              <TableHead className="text-white">Role</TableHead>
              <TableHead className="text-right text-white">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {staffs.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8">
                  No staff members found
                </TableCell>
              </TableRow>
            ) : (
              staffs.map((staff) => {
                const { id, name, email, role } = staff;

                return (
                  <TableRow key={id}>
                    <TableCell className="font-medium">
                      {name || "No name"}
                    </TableCell>
                    <TableCell>{email}</TableCell>
                    <TableCell>
                      <Badge
                        variant={role === "ADMIN" ? "default" : "secondary"}
                      >
                        {role}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => handleViewDetails(id)}
                          >
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          {role === "STAFF" ? (
                            <DropdownMenuItem
                              onClick={() => handleRoleChange(staff, "ADMIN")}
                            >
                              <Shield className="mr-2 h-4 w-4" />
                              Promote to Admin
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem
                              onClick={() => handleRoleChange(staff, "STAFF")}
                            >
                              <UserCog className="mr-2 h-4 w-4" />
                              Demote to Staff
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => handleDeleteClick(staff)}
                            className="text-red-600"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="flex items-center justify-between mt-4">
          <div className="text-sm text-gray-600">
            Showing {staffs.length} of {pagination.total} staff members
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(pagination.page - 1)}
              disabled={pagination.page === 1}
            >
              Previous
            </Button>
            <span className="text-sm">
              Page {pagination.page} of {pagination.totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(pagination.page + 1)}
              disabled={pagination.page === pagination.totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      )}

      {/* Role Change Confirmation Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-[#F7AB97]">
              {actionType === "promote"
                ? "Promote to Admin"
                : "Demote to Staff"}
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to change{" "}
              {selectedStaff?.name || selectedStaff?.email}&apos;s role to{" "}
              {actionType === "promote" ? "ADMIN" : "STAFF"}?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDialogOpen(false)}
              disabled={isUpdating}
            >
              Cancel
            </Button>
            <Button
              onClick={confirmRoleChange}
              disabled={isUpdating}
              className="bg-linear-to-r from-[#F7AB97] to-[#071548]"
            >
              {isUpdating ? "Updating..." : "Confirm"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Staff Member</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete{" "}
              {selectedStaff?.name || selectedStaff?.email}? This action cannot
              be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default StaffsPage;
