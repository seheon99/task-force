import { OrganizationSettings } from "@/components/feature";

export default async function OrganizationSettingsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <OrganizationSettings id={id} />;
}
