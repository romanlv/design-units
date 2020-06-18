// @ts-ignore
import du from 'design-units';
import theme from './theme';

export type Color = keyof (typeof theme.colors);
export type FontFamily = keyof (typeof theme.fonts)

type FontSize = keyof (typeof theme.fontSizes)
type FontWeight = keyof (typeof theme.fontWeights)

// any css value
type CssObject = {
  [key: string]: string | number | CssObject
}

type CssUnits =  CssObject & {
  backgroundColor?: Color;
  color?: Color;
  borderColor?: Color;
  fill?: Color;
  stroke?: Color;
  outlineColor?: Color;
  fontFamily?: FontFamily;
  fontSize?: FontSize | FontSize[];
  fontWeight?: FontWeight | FontWeight[];
  '&:hover'?: CssUnits;
}

type TypedUnits = (css: CssUnits) => (props: any) => CssObject

export default du as TypedUnits;

export const dx = (css: CssUnits) => (props: any) => {
  // this way it can be applied to emotion css prop
  const theme = props.theme ?? props;
  return du(css)({ theme }) as CssObject;
}
