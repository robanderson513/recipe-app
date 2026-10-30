import type { SVGProps } from 'react';

export enum IconName {
  Home = 'home',
  Recipes = 'recipes',
  Menu = 'menu',
  Close = 'close'
}

export type IconSize = 'small' | 'medium' | 'large';

const ICON_SIZE_PIXELS: Record<IconSize, number> = {
  small: 20,
  medium: 24,
  large: 32
};

export const ICON_PATHS: Record<IconName, readonly string[]> = {
  [IconName.Home]: ['m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z'],
  [IconName.Recipes]: ['M5 4h12a2 2 0 0 1 2 2v14H7a2 2 0 0 1-2-2z', 'M7 4v14a2 2 0 0 0 2 2M9 8h7M9 12h7'],
  [IconName.Menu]: ['M4 6h16M4 12h16M4 18h16'],
  [IconName.Close]: ['m6 6 12 12M18 6 6 18']
} as const;

type IconProps = Omit<SVGProps<SVGSVGElement>, 'height' | 'width' | 'strokeWidth'> & {
  name: IconName;
  size?: IconSize;
  strokeWidth?: number;
};

function Icon({ name, size = 'medium', strokeWidth = 1.8, ...props }: IconProps) {
  const sizeInPixels = ICON_SIZE_PIXELS[size];

  return (
    <svg
      viewBox="0 0 24 24"
      width={sizeInPixels}
      height={sizeInPixels}
      strokeWidth={strokeWidth}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {ICON_PATHS[name].map((path) => (
        <path d={path} key={path} />
      ))}
    </svg>
  );
}

export default Icon;
