import { VariantProps as CVAVariantProps } from 'class-variance-authority';

export type VariantProps<T extends (...args: any) => any> = CVAVariantProps<T>;

export { cva } from 'class-variance-authority';