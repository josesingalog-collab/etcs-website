import { requireAdmin, adminUserId } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { AdminSidebar } from "@/components/admin/sidebar";

export const instant = false;

export default async function AdminLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  await requireAdmin();
  const userId = await adminUserId();
  const user = userId ? await prisma.user.findUnique({ where: { id: userId } }) : null;
  const adminName = user?.name || user?.email?.split("@")[0] || "Admin";
  return (
    <div className="min-h-screen bg-mist text-anthracite lg:flex">
      <AdminSidebar adminName={adminName} />
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}
