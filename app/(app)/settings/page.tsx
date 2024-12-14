import { ThemeSettings } from "./_components/theme-settings";

export default async function SettingsPage() {
  return (
    <div className="px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">Configurações</h1>

      <div className="space-y-8">
        <section>
          <ThemeSettings />
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-4">Preferências</h2>
        </section>
      </div>
    </div>
  );
}
