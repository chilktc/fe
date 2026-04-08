import { CSSProperties, ImgHTMLAttributes, forwardRef } from "react";

type AppImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, "src"> & {
  src: string;
  alt: string;
  fill?: boolean;
  priority?: boolean;
};

export const Image = forwardRef<HTMLImageElement, AppImageProps>(function Image(
  { fill = false, style, className, priority = false, loading, ...props },
  ref,
) {
  const imageStyle: CSSProperties = fill
    ? {
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        ...style,
      }
    : style ?? {};

  return (
    <img
      ref={ref}
      className={className}
      style={imageStyle}
      loading={priority ? "eager" : loading}
      fetchPriority={priority ? "high" : undefined}
      {...props}
    />
  );
});

export default Image;
