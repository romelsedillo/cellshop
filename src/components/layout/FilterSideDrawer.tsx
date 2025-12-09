import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

type FilterOption = {
  id: string;
  label: string;
  value: string;
};

type FilterSideDrawerProps = {
  brand: FilterOption[];
  categories: FilterOption[];

  selectedBrand: string;
  setSelectedBrand: (value: string) => void;

  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
};

const FilterSideDrawer = ({
  brand,
  selectedBrand,
  setSelectedBrand,
  categories,
  selectedCategory,
  setSelectedCategory,
}: FilterSideDrawerProps) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="rounded-none w-full">
          Filter
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-xs flex gap-0">
        <SheetHeader className="">
          <SheetTitle className="text-3xl">Filters</SheetTitle>
        </SheetHeader>
        <Separator className="" />
        <ScrollArea
          className="w-full h-[80%]
         flex flex-col px-4 gap-2"
        >
          <div className="mb-4">
            <SheetTitle className="text-lg font-semibold mb-2">
              Brands
            </SheetTitle>
            <RadioGroup value={selectedBrand} onValueChange={setSelectedBrand}>
              {brand.map((b) => (
                <div key={b.id} className="flex items-center space-x-2">
                  <RadioGroupItem
                    value={b.value}
                    id={b.id}
                    className="cursor-pointer"
                  />
                  <Label
                    htmlFor={b.id}
                    className="group cursor-pointer text-xs"
                  >
                    {b.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
          <div>
            <SheetTitle className="text-lg font-semibold mb-2">
              Categories
            </SheetTitle>
            <RadioGroup
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              {categories.map((cate) => (
                <div key={cate.id} className="flex items-center space-x-2">
                  <RadioGroupItem
                    value={cate.value}
                    id={cate.id}
                    className="cursor-pointer"
                  />
                  <Label
                    htmlFor={cate.id}
                    className="group cursor-pointer text-xs"
                  >
                    {cate.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

export default FilterSideDrawer;
