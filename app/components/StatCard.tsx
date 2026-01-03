type Props = {
  label: string;
  value: string;
};

export default function StatCard({ label, value }: Props) {
  return (
    <div className="bg-coral rounded-xl p-4 flex flex-col gap-1">
      <span className="text-sm text-gray-600">{label}</span>
      <span className="font-bold text-lg">{value}</span>
    </div>
  );
}
