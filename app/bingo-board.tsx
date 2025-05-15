import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

const items = [
  "Se noen ta selfie m/ flagg",
  "Se noen justere bunaden sin",
  "Spise is",
  "Se noen ta bile av maten",
  "Gi noen et kompliment",
  "Hørt nasjonalsangen",
  "Hilst på noen ute",
  "Hørt noen snakke om været",
  "Sett toget",
  "Deltatt på quiz",
  "Drikke noe med bobler",
  "Ta en selfie med noen",
  "Sett en russ",
  "Sette i gang en lek",
  "Ta bilde av noen på frokosten",
  "Spise kake",
  "Sett på en sang",
  "Se noen som har drukket for mye",
  "Ser en hund med sløyfe/flagg",
  "Høre en russelåt",
  "Høre noen snakke om bunad",
  "Høre noen snakke om Eurovision",
  "Se noen med solbriller og bunad",
  "Høre noen si de har drukket for mye",
  "Vært med på en drikkelek",
  "Sunget en sang med 17. mai tema",
];

export function BingoBoard() {
  const bingo = useQuery(api.bingo.getBingo, {});
  const createBingo = useMutation(api.bingo.createBingo);
  const addItem = useMutation(api.bingo.addItem);
  const updateItem = useMutation(api.bingo.updateItem);

  if (bingo === undefined) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-3 gap-2 max-w-md mx-auto">
          {Array.from({ length: 9 }, (_, i) => i + 1).map((_, index) => (
            <Skeleton
              key={index}
              className={cn(
                "aspect-square rounded-lg border-2 p-2 flex items-center justify-center",
              )}
            />
          ))}
        </div>
      </div>
    );
  }

  if (!bingo) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600 mb-4">Du har ikke noen bingo ennå.</p>
        <Button
          variant="outline"
          className="bg-red-50 hover:bg-red-100 text-red-600 border-red-200"
          onClick={() => {
            void createBingo();
          }}
        >
          Opprett ny bingo
        </Button>

        <Button
          variant="outline"
          className="bg-red-50 hover:bg-red-100 text-red-600 border-red-200"
          onClick={() => {
            items.forEach((item) => {
              void addItem({ item });
            });
          }}
        >
          Add item
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-2 max-w-md mx-auto">
        {bingo.items.map((item, index) => (
          <div
            key={index}
            className={cn(
              "aspect-square rounded-lg border-2 p-2 flex items-center justify-center text-center transition-all duration-200 cursor-pointer",
              item.status
                ? "bg-red-50 border-red-200 text-red-600"
                : "bg-white border-gray-200 text-gray-600 hover:border-red-200 hover:bg-red-50/50",
            )}
            onClick={() => {
              if (bingo) {
                void updateItem({
                  bingoId: bingo._id,
                  itemId: item.item,
                  status: !item.status,
                });
              }
            }}
          >
            <span className="text-sm font-medium">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
