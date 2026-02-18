import { useState, useCallback } from 'react';
import ConfigPanel from '@/components/ConfigPanel';
import ProfileDisplay from '@/components/ProfileDisplay';
import { generateProfile, profileToJSON, profileToCSV } from '@/utils/profileGenerator';
import type { Country, Gender, AgeRange, AvatarStyle, GeneratedProfile } from '@/utils/profileGenerator';
import { Download, FileJson, AlertTriangle, Globe, CreditCard, Users, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';

const FeatureCard = ({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) => (
  <div className="rounded-xl border border-border bg-card p-4 text-center space-y-2">
    <div className="flex justify-center text-primary">{icon}</div>
    <h3 className="text-sm font-bold text-foreground">{title}</h3>
    <p className="text-xs text-muted-foreground">{desc}</p>
  </div>
);

const Index = () => {
  const [profile, setProfile] = useState<GeneratedProfile | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = useCallback((country: Country, gender: Gender, ageRange: AgeRange, avatarStyle: AvatarStyle) => {
    setIsLoading(true);
    setTimeout(() => {
      setProfile(generateProfile(country, gender, ageRange, avatarStyle));
      setIsLoading(false);
    }, 400);
  }, []);

  const downloadFile = (content: string, filename: string, type: string) => {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border py-6 px-4">
        <div className="container mx-auto max-w-5xl flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">⚡</span>
          </div>
          <h1 className="text-xl font-bold text-foreground tracking-tight">ProfileGen</h1>
        </div>
      </header>

      {/* Main */}
      <main className="container mx-auto px-4 py-6 max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6">
          <aside className="space-y-4">
            <ConfigPanel onGenerate={handleGenerate} isLoading={isLoading} />
            
            {/* Export */}
            {profile && (
              <div className="rounded-xl border border-border bg-card p-4 space-y-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start border-border text-foreground"
                  onClick={() => downloadFile(profileToJSON(profile), 'profil.json', 'application/json')}
                >
                  <FileJson className="mr-2 h-4 w-4 text-primary" />
                  Exporter en JSON
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start border-border text-foreground"
                  onClick={() => downloadFile(profileToCSV(profile), 'profil.csv', 'text/csv')}
                >
                  <Download className="mr-2 h-4 w-4 text-primary" />
                  Exporter en CSV
                </Button>
              </div>
            )}
          </aside>

          <section>
            <ProfileDisplay profile={profile} />
          </section>
        </div>

        {/* Disclaimer */}
        <div className="mt-10 rounded-xl border border-warning-border bg-warning p-5">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-warning-foreground shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-warning-foreground text-sm mb-1">Disclaimer</h3>
              <p className="text-xs text-warning-foreground/80 leading-relaxed">
                This tool generates synthetic/fake data solely for testing, development, and educational purposes only. All generated information, including names, addresses, phone numbers, national IDs, and credit card numbers, are completely fictitious. Credit card numbers pass the Luhn algorithm check but are not real. Do not use this data for any illegal, fraudulent, or malicious activities. We are not responsible for any misuse of this tool.
              </p>
            </div>
          </div>
        </div>

        {/* Why Section */}
        <div className="mt-10 text-center mb-4">
          <h2 className="text-lg font-bold text-foreground mb-1">Why ProfileGen?</h2>
          <p className="text-sm text-muted-foreground mb-6">Built for developers and testers who need realistic test data</p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
          <FeatureCard
            icon={<Users className="h-6 w-6" />}
            title="Cultural Names"
            desc="Names match country's culture with proper formats"
          />
          <FeatureCard
            icon={<CreditCard className="h-6 w-6" />}
            title="Luhn-Valid Cards"
            desc="Credit cards pass Luhn validation for testing"
          />
          <FeatureCard
            icon={<Globe className="h-6 w-6" />}
            title="100+ Countries"
            desc="Localized addresses and phone formats"
          />
          <FeatureCard
            icon={<Shield className="h-6 w-6" />}
            title="100% Synthetic"
            desc="Completely fictional. No real data."
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-4">
        <div className="container mx-auto px-4 max-w-5xl text-center">
          <p className="text-xs text-muted-foreground">Built for developers and testers. All data is fictitious. ⚡ ProfileGen</p>
          <p className="text-[10px] text-muted-foreground/60 mt-1">Généré avec ❤️ par Israël Dev</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
