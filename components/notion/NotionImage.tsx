interface NotionImageProps {
  src: string;
  alt: string;
}

export function NotionImage({ src, alt }: NotionImageProps) {
  return (
    <div className="relative overflow-hidden pb-[66.666667%] mb-8">
      <img
        src={src}
        alt={alt}
        className="absolute h-full w-full object-cover"
      />
    </div>
  );
}
