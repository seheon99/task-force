import { Mission } from "@/components/feature";

export default async function MissionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <Mission id={id} />;
}
