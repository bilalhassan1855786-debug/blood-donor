"use client";

type Props = {
  t: any;
  summary: {
    total: number;
    imported: number;
    usersCreated?: number;
    existingUsers?: number;
    donorsWithoutAccount?: number;
    duplicates?: number;
    invalid?: number;
    failed?: number;
  };
  onImportAnother: () => void;
};

export default function ImportSummary({
  t,
  summary,
  onImportAnother,
}: Props) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">

      <h2 className="text-2xl font-bold text-center text-[#C81E3A] mb-8">
        Import Completed
      </h2>

      <div className="grid md:grid-cols-2 gap-5">

        <Card
          title="Total Rows"
          value={summary.total}
        />

        <Card
          title="Imported Donors"
          value={summary.imported}
        />

        <Card
          title="Users Created"
          value={
            summary.usersCreated || 0
          }
        />

        <Card
          title="Existing Users"
          value={
            summary.existingUsers || 0
          }
        />

        <Card
          title="Without Account"
          value={
            summary.donorsWithoutAccount ||
            0
          }
        />

        <Card
          title="Duplicates"
          value={
            summary.duplicates || 0
          }
        />

        <Card
          title="Invalid"
          value={
            summary.invalid || 0
          }
        />

        <Card
          title="Failed"
          value={
            summary.failed || 0
          }
        />

      </div>

      <div className="mt-8 text-center">

        <button
          onClick={onImportAnother}
          className="bg-[#C81E3A] hover:bg-[#a5152c] text-white px-8 py-3 rounded-xl font-semibold"
        >
          Import Another File
        </button>

      </div>

    </div>
  );
}

function Card({
  title,
  value,
}: {
  title: string;
  value: number;
}) {
  return (
    <div className="border rounded-xl p-5">

      <p className="text-gray-500 text-sm">
        {title}
      </p>

      <h3 className="text-3xl font-bold mt-2 text-[#C81E3A]">
        {value}
      </h3>

    </div>
  );
}