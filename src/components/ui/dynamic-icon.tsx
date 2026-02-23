'use client';

import {
  Plane,
  Compass,
  MapPin,
  Globe,
  Sailboat,
  Mountain,
  MountainSnow,
  Waves,
  TreePine,
  TreePalm,
  Sun,
  CloudSun,
  Moon,
  Flame,
  Leaf,
  Sprout,
  Flower2,
  User,
  Users,
  Heart,
  Camera,
  Palette,
  Wine,
  UtensilsCrossed,
  Scroll,
  Landmark,
  Building2,
  Home,
  Hotel,
  Crown,
  Gem,
  Wallet,
  ShoppingBag,
  Coffee,
  Scale,
  Zap,
  Sparkles,
  Footprints,
  PartyPopper,
  Binoculars,
  FileCheck,
  Umbrella,
  type LucideIcon,
} from 'lucide-react';

const ICON_REGISTRY: Record<string, LucideIcon> = {
  // Travel & Transport
  'plane': Plane,
  'compass': Compass,
  'map-pin': MapPin,
  'globe': Globe,
  'sailboat': Sailboat,

  // Nature & Geography
  'mountain': Mountain,
  'mountain-snow': MountainSnow,
  'waves': Waves,
  'tree-pine': TreePine,
  'palm-tree': TreePalm,
  'sun': Sun,
  'cloud-sun': CloudSun,
  'moon': Moon,
  'flame': Flame,
  'leaf': Leaf,
  'sprout': Sprout,
  'flower': Flower2,

  // People
  'user': User,
  'users': Users,
  'heart': Heart,

  // Activities & Culture
  'camera': Camera,
  'palette': Palette,
  'wine': Wine,
  'utensils': UtensilsCrossed,
  'scroll': Scroll,
  'landmark': Landmark,
  'building': Building2,
  'home': Home,
  'hotel': Hotel,

  // Commerce & Status
  'crown': Crown,
  'gem': Gem,
  'wallet': Wallet,
  'shopping-bag': ShoppingBag,

  // Misc
  'coffee': Coffee,
  'scale': Scale,
  'zap': Zap,
  'sparkles': Sparkles,
  'footprints': Footprints,
  'party-popper': PartyPopper,
  'binoculars': Binoculars,
  'file-check': FileCheck,
  'umbrella': Umbrella,
};

interface DynamicIconProps {
  name: string;
  className?: string;
  size?: number;
  strokeWidth?: number;
}

export function DynamicIcon({ name, className, size, strokeWidth = 1.5 }: DynamicIconProps) {
  const Icon = ICON_REGISTRY[name];
  if (!Icon) return null;
  return <Icon className={className} size={size} strokeWidth={strokeWidth} />;
}

export function getIconComponent(name: string): LucideIcon | null {
  return ICON_REGISTRY[name] ?? null;
}
