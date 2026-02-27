import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical } from "lucide-react";

type DropdownMenuType = {
  id: string;
  func: any;
};

export function DropdownMenuDemo({ id, func }: DropdownMenuType) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <EllipsisVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-10" align="center">
        <DropdownMenuGroup>
          <Button variant="outline" className="w-full">
            <DropdownMenuLabel onClick={() => func(id)}>Usuń</DropdownMenuLabel>
          </Button>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
