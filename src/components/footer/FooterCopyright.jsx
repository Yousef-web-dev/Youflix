export default function FooterCopyright() {
  const year = new Date().getFullYear();

  return (
    <p className="text-xs text-gray-500">
      © {year} Youflix. All rights reserved.
    </p>
  );
}
