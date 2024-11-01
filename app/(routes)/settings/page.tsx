import { MainLayout } from "@/components/layouts/main-layout";
import { ThemeSettings } from "@/components/settings/theme-settings";

export default function SettingsPage() {
  return (
    <MainLayout>
      <main className="flex-1 w-full border-x border-border/40 lg:max-w-5xl">
        <div className="px-4 py-6">
          <h1 className="text-2xl font-bold mb-6">Configurações</h1>
          
          <div className="space-y-8">
            <section>
              <ThemeSettings />
            </section>
            
            {/* Outras seções de configurações podem ser adicionadas aqui */}
            <section>
              <h2 className="text-lg font-semibold mb-4">Preferências</h2>
              {/* Adicione mais configurações aqui */}
            </section>
          </div>
        </div>
      </main>
    </MainLayout>
  );
}
