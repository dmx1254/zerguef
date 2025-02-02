import { Card, CardContent } from "@/components/ui/card";

const ProductSkeleton = () => (
  <Card className="group overflow-hidden bg-white animate-pulse">
    <div className="p-0 relative">
      <div className="aspect-[3/4] relative overflow-hidden bg-gray-200" />
    </div>
    <CardContent className="p-6">
      <div className="h-6 bg-gray-200 rounded mb-4" />
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-4" />
      <div className="flex items-end justify-between">
        <div className="h-8 bg-gray-200 rounded w-24" />
        <div className="h-10 w-10 bg-gray-200 rounded-full" />
      </div>
    </CardContent>
  </Card>
);

const CategorySkeleton = () => (
  <div className="group relative overflow-hidden rounded-2xl aspect-[4/5] animate-pulse bg-gray-200">
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-8">
      <div className="h-8 bg-gray-300 rounded mb-3 w-3/4" />
      <div className="h-4 bg-gray-300 rounded w-full mb-6" />
      <div className="h-12 bg-gray-300 rounded w-48" />
    </div>
  </div>
);

// Grids de squelettes
export const ProductSkeletonGrid = () => (
  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
    {[...Array(10)].map((_, index) => (
      <ProductSkeleton key={index} />
    ))}
  </div>
);

export const CategorySkeletonGrid = () => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
    {[...Array(3)].map((_, index) => (
      <CategorySkeleton key={index} />
    ))}
  </div>
);
