import { Button } from "@/components/Button";
export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-950 to-slate-950 p-8 text-gray-100">
      <div className="mx-auto max-w-5xl space-y-10">
        <header className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">
            Dark Theme Buttons
          </h1>
          <p className="text-gray-400">
            Sleek, responsive, and accessible button components for dark UIs.
          </p>
        </header>

        {/* Variants */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Variants</h2>
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="success">Success</Button>
            <Button variant="warning">Warning</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="link">Learn more</Button>
          </div>
        </section>

        {/* Sizes & Block */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Sizes & Block</h2>
          <div className="flex flex-wrap items-center gap-3">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
            <Button size="xl">Extra Large</Button>
            <Button size="md" block className="sm:w-auto">
              Block on mobile
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
