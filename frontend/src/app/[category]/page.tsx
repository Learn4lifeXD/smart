export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const resolvedParams = await params;
  const title = resolvedParams.category.charAt(0).toUpperCase() + resolvedParams.category.slice(1);
  return (
    <div className="p-8">
      <h2 className="font-headline-lg text-headline-lg text-on-surface mb-4">{title}</h2>
      <p className="text-on-surface-variant font-body-md">
        This is a placeholder page for the {title} module.
      </p>
    </div>
  );
}
