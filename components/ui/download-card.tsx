import { Card } from 'fumadocs-ui/components/card';
import { Download } from 'lucide-react';

interface DownloadCardProps {
  icon: React.ReactNode;
  title: string;
  description: React.ReactNode;
  href: string;
}

export default function DownloadCard({ icon, title, description, href }: DownloadCardProps) {
  return (
    <Card 
      icon={icon} 
      title={title} 
      href={href}
      className="relative"
    >
      {description}
      <Download className="absolute top-4 right-4 w-4 h-4 text-fd-muted-foreground/50" />
    </Card>
  );
}
