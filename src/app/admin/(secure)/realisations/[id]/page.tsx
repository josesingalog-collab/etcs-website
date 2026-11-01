import { notFound } from "next/navigation";
import { ProjectForm } from "@/components/admin/project-form";
import { prisma } from "@/lib/prisma";
export default async function EditProject({ params }: { params: Promise<{ id: string }> }) { const { id } = await params; const project = await prisma.project.findUnique({ where: { id }, include: { images: { orderBy: { position: "asc" } } } }); if (!project) notFound(); return <ProjectForm project={project}/>; }
