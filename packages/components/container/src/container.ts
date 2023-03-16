import { ExtractPropTypes } from 'vue';

export const containerProps = {
  collapse: {
    type: Boolean,
    default: false
  }
} as const

export type ContainerProps = ExtractPropTypes<typeof containerProps>
