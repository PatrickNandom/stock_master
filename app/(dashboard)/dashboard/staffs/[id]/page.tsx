"use client";

import { use, useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
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

interface StaffMember {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: "ADMIN" | "STAFF" | "OWNER";
  createdAt: string;
  updatedAt: string;
}

type StaffDetailPageProps = {
  params: Promise<{ id: string }>;
};

const StaffDetailPage = ({ params }: StaffDetailPageProps) => {
  const { id } = use(params);
  const router = useRouter();

  const [staff, setStaff] = useState<StaffMember | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStaffDetails = async () => {
      try {
        const response = await fetch(`/api/staff/${id}`);
        if (!response.ok) throw new Error("Failed to fetch staff details");

        const data = await response.json();
        setStaff(data.staff);
      } catch (err) {
        setError("Failed to load staff details" + err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStaffDetails();
  }, [id]);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const response = await fetch(`/api/staff/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete staff");

      router.push("/dashboard/staffs");
    } catch (err) {
      console.error("Error deleting staff:", err);
      setError("Failed to delete staff member");
      setIsDeleting(false);
      setShowDeleteDialog(false);
    }
  };

  const handleEdit = () => {
    router.push(`/dashboard/staffs/${id}/edit`);
  };

  if (isLoading) {
    return (
      <section className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#E85C33]" />
      </section>
    );
  }

  if (error || !staff) {
    return (
      <section className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-red-600 mb-4">{error || "Staff not found"}</p>
        <button
          onClick={() => router.back()}
          className="text-[#E85C33] underline"
        >
          Go Back
        </button>
      </section>
    );
  }

  return (
    <section className="flex flex-col p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Image
            src="/auth_left-arrow.svg"
            alt="Back"
            width={24}
            height={24}
            priority
            className="cursor-pointer"
            onClick={() => router.back()}
          />
          <h1 className="text-2xl font-bold text-gray-900">Staff Details</h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleEdit}
            className="px-6 py-1.5 bg-[#E85C33] text-white rounded-3xl hover:bg-[#d14a26] transition-colors font-medium cursor-pointer"
          >
            Edit
          </button>
          <button
            onClick={() => setShowDeleteDialog(true)}
            className="px-6 py-1.5 bg-red-600 text-white rounded-3xl hover:bg-red-700 transition-colors font-medium cursor-pointer"
          >
            Delete
          </button>
        </div>
      </div>

      {/* Profile Section */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-8 mb-6">
        <div className="flex items-start gap-6">
          {/* Avatar */}
          <div className="w-16 h-16 rounded-full bg-[#E85C33] flex items-center justify-center text-white text-2xl font-bold">
            {staff.name.charAt(0).toUpperCase()}
          </div>

          {/* Basic Info */}
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-2xl font-bold text-gray-900">{staff.name}</h2>
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  staff.role === "ADMIN"
                    ? "bg-purple-100 text-purple-800"
                    : "bg-blue-100 text-blue-800"
                }`}
              >
                {staff.role}
              </span>
            </div>
            <p className="text-gray-600 mb-1">{staff.email}</p>
            {staff.phone && <p className="text-gray-600">{staff.phone}</p>}
          </div>
        </div>
      </div>

      {/* Detailed Information */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-8">
        <h3 className="text-xl font-bold text-gray-900 mb-6">
          Account Information
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Info label="Staff ID" value={staff.id} />
          <Info label="Email Address" value={staff.email} />
          <Info label="Phone Number" value={staff.phone || "Not provided"} />
          <Info label="Role" value={staff.role} />

          <Info
            label="Created On"
            value={new Date(staff.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          />

          <Info
            label="Last Updated"
            value={new Date(staff.updatedAt).toLocaleString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          />
        </div>
      </div>

      {/* Delete Confirmation */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Staff Member</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete {staff.name}? This action cannot
              be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </section>
  );
};

const Info = ({ label, value }: { label: string; value: string }) => (
  <div className="bg-[#FCDED6] rounded-3xl p-5">
    <label className="text-sm font-medium text-gray-700 block mb-2">
      {label}
    </label>
    <p className="text-gray-900 font-medium break-all">{value}</p>
  </div>
);

export default StaffDetailPage;
