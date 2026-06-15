import React from 'react';
import { cn } from '@/lib/utils';

type FeatureType = {
  title: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  description: string;
  meta?: string;
};

type FeatureCardProps = React.ComponentProps<'div'> & {
  feature: FeatureType;
};

export function FeatureCard({ feature, className, ...props }: FeatureCardProps) {
  const pattern = getStablePattern(feature.title);
  const patternId = getPatternId(feature.title);

  return (
    <div className={cn('relative overflow-hidden p-6', className)} {...props}>
      <div className="pointer-events-none absolute top-0 left-1/2 -mt-2 -ml-20 h-full w-full [mask-image:linear-gradient(white,transparent)]">
        <div className="absolute inset-0 bg-gradient-to-r from-fd-foreground/5 to-fd-foreground/0 [mask-image:radial-gradient(farthest-side_at_top,white,transparent)] opacity-100">
          <GridPattern
            width={20}
            height={20}
            x="-12"
            y="4"
            squares={pattern}
            patternId={patternId}
            className="absolute inset-0 h-full w-full fill-fd-foreground/5 stroke-fd-foreground/25 mix-blend-overlay"
          />
        </div>
      </div>

      <feature.icon className="size-6 text-fd-foreground/75" strokeWidth={1} aria-hidden />
      <h3 className="relative z-10 mt-10 text-sm font-medium md:text-base">{feature.title}</h3>
      {feature.meta && (
        <p className="relative z-10 mt-2 truncate font-mono text-xs text-fd-muted-foreground">
          {feature.meta}
        </p>
      )}
      <p className="relative z-10 mt-3 text-xs font-light leading-relaxed text-fd-muted-foreground line-clamp-2">
        {feature.description}
      </p>
    </div>
  );
}

function GridPattern({
  width,
  height,
  x,
  y,
  squares,
  patternId,
  ...props
}: React.ComponentProps<'svg'> & {
  width: number;
  height: number;
  x: string;
  y: string;
  squares?: number[][];
  patternId: string;
}) {
  return (
    <svg aria-hidden="true" {...props}>
      <defs>
        <pattern id={patternId} width={width} height={height} patternUnits="userSpaceOnUse" x={x} y={y}>
          <path d={`M.5 ${height}V.5H${width}`} fill="none" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" strokeWidth={0} fill={`url(#${patternId})`} />
      {squares && (
        <svg x={x} y={y} className="overflow-visible">
          {squares.map(([squareX, squareY], index) => (
            <rect
              key={index}
              strokeWidth="0"
              width={width + 1}
              height={height + 1}
              x={squareX * width}
              y={squareY * height}
            />
          ))}
        </svg>
      )}
    </svg>
  );
}

function getStablePattern(seed: string, length = 5): number[][] {
  const hash = getSeedHash(seed);

  return Array.from({ length }, (_, index) => [
    7 + ((hash + index * 3) % 4),
    1 + ((hash >> (index + 1)) % 6),
  ]);
}

function getPatternId(seed: string) {
  return `grid-feature-${getSeedHash(seed).toString(36)}`;
}

function getSeedHash(seed: string) {
  let hash = 0;

  for (let index = 0; index < seed.length; index += 1) {
    hash = (hash * 31 + seed.charCodeAt(index)) >>> 0;
  }

  return hash;
}
